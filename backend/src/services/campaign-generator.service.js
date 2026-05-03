const Groq = require('groq-sdk')
const { loadPrompt } = require('../utils/prompt-loader')

function extractJson(text) {
  const match = text.match(/```json\s*([\s\S]*?)```/) || text.match(/({[\s\S]*})/)
  return match ? match[1].trim() : text.trim()
}

async function generateCampaign(productAttributes, userContext, apiKey) {
  const client = new Groq({ apiKey })
  const systemPrompt = loadPrompt('campaign-generator.md')

  const userMessage = JSON.stringify(
    { product_attributes: productAttributes, user_context: userContext },
    null,
    2
  )

  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    temperature: parseFloat(process.env.CAMPAIGN_GENERATOR_TEMPERATURE || '0.7'),
    max_tokens: 4096,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
  })

  const raw = extractJson(response.choices[0].message.content)

  try {
    return JSON.parse(raw)
  } catch {
    throw new Error('Campaign Generator returned invalid JSON: ' + raw)
  }
}

module.exports = { generateCampaign }

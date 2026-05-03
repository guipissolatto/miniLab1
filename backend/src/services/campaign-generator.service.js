const Anthropic = require('@anthropic-ai/sdk')
const { loadPrompt } = require('../utils/prompt-loader')

async function generateCampaign(productAttributes, userContext, apiKey) {
  const client = new Anthropic({ apiKey: apiKey || process.env.ANTHROPIC_API_KEY })
  const systemPrompt = loadPrompt('campaign-generator.md')

  const userMessage = JSON.stringify({ product_attributes: productAttributes, user_context: userContext }, null, 2)

  const response = await client.messages.create({
    model: process.env.CAMPAIGN_GENERATOR_MODEL || 'claude-sonnet-4-6',
    max_tokens: 4096,
    temperature: parseFloat(process.env.CAMPAIGN_GENERATOR_TEMPERATURE || '0.7'),
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: userMessage,
      },
    ],
  })

  const raw = response.content[0].text.trim()

  try {
    return JSON.parse(raw)
  } catch {
    throw new Error('Campaign Generator returned invalid JSON: ' + raw)
  }
}

module.exports = { generateCampaign }

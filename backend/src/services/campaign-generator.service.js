const { GoogleGenerativeAI } = require('@google/generative-ai')
const { loadPrompt } = require('../utils/prompt-loader')

function extractJson(text) {
  const match = text.match(/```json\s*([\s\S]*?)```/) || text.match(/({[\s\S]*})/)
  return match ? match[1].trim() : text.trim()
}

async function generateCampaign(productAttributes, userContext, apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey)
  const systemPrompt = loadPrompt('campaign-generator.md')

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: systemPrompt,
    generationConfig: {
      temperature: parseFloat(process.env.CAMPAIGN_GENERATOR_TEMPERATURE || '0.7'),
      maxOutputTokens: 4096,
    },
  })

  const userMessage = JSON.stringify(
    { product_attributes: productAttributes, user_context: userContext },
    null,
    2
  )

  const result = await model.generateContent(userMessage)
  const raw = extractJson(result.response.text())

  try {
    return JSON.parse(raw)
  } catch {
    throw new Error('Campaign Generator returned invalid JSON: ' + raw)
  }
}

module.exports = { generateCampaign }

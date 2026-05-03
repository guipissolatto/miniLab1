const Anthropic = require('@anthropic-ai/sdk')
const { loadPrompt } = require('../utils/prompt-loader')

async function analyzeImage(imageBase64, mimeType, apiKey) {
  const client = new Anthropic({ apiKey: apiKey || process.env.ANTHROPIC_API_KEY })
  const systemPrompt = loadPrompt('image-analyzer.md')

  const response = await client.messages.create({
    model: process.env.IMAGE_ANALYZER_MODEL || 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    temperature: parseFloat(process.env.IMAGE_ANALYZER_TEMPERATURE || '0.1'),
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: mimeType,
              data: imageBase64,
            },
          },
          {
            type: 'text',
            text: 'Analyze this product image and return the structured JSON.',
          },
        ],
      },
    ],
  })

  const raw = response.content[0].text.trim()

  try {
    return JSON.parse(raw)
  } catch {
    throw new Error('Image Analyzer returned invalid JSON: ' + raw)
  }
}

module.exports = { analyzeImage }


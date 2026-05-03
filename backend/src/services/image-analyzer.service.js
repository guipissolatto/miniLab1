const Groq = require('groq-sdk')
const { loadPrompt } = require('../utils/prompt-loader')

function extractJson(text) {
  const match = text.match(/```json\s*([\s\S]*?)```/) || text.match(/({[\s\S]*})/)
  return match ? match[1].trim() : text.trim()
}

async function analyzeImage(imageBase64, mimeType, apiKey) {
  const client = new Groq({ apiKey })
  const systemPrompt = loadPrompt('image-analyzer.md')

  const response = await client.chat.completions.create({
    model: 'meta-llama/llama-4-scout-17b-16e-instruct',
    temperature: parseFloat(process.env.IMAGE_ANALYZER_TEMPERATURE || '0.1'),
    max_tokens: 1024,
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: `data:${mimeType};base64,${imageBase64}` },
          },
          {
            type: 'text',
            text: 'Analyze this product image and return the structured JSON.',
          },
        ],
      },
    ],
  })

  const raw = extractJson(response.choices[0].message.content)

  try {
    return JSON.parse(raw)
  } catch {
    throw new Error('Image Analyzer returned invalid JSON: ' + raw)
  }
}

module.exports = { analyzeImage }

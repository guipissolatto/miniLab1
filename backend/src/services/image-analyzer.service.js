const { GoogleGenerativeAI } = require('@google/generative-ai')
const { loadPrompt } = require('../utils/prompt-loader')

function extractJson(text) {
  const match = text.match(/```json\s*([\s\S]*?)```/) || text.match(/({[\s\S]*})/)
  return match ? match[1].trim() : text.trim()
}

async function analyzeImage(imageBase64, mimeType, apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey)
  const systemPrompt = loadPrompt('image-analyzer.md')

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: systemPrompt,
    generationConfig: {
      temperature: parseFloat(process.env.IMAGE_ANALYZER_TEMPERATURE || '0.1'),
      maxOutputTokens: 1024,
    },
  })

  const result = await model.generateContent([
    { inlineData: { data: imageBase64, mimeType } },
    'Analyze this product image and return the structured JSON.',
  ])

  const raw = extractJson(result.response.text())

  try {
    return JSON.parse(raw)
  } catch {
    throw new Error('Image Analyzer returned invalid JSON: ' + raw)
  }
}

module.exports = { analyzeImage }

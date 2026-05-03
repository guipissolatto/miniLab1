const Groq = require('groq-sdk')
const { loadPrompt } = require('../utils/prompt-loader')

/**
 * Extrai o primeiro objeto JSON de uma string de texto.
 * Suporta respostas brutas e respostas envolvidas em bloco markdown ```json```.
 *
 * @param {string} text - Texto retornado pelo modelo de linguagem.
 * @returns {string} String contendo apenas o JSON extraído.
 */
function extractJson(text) {
  const match = text.match(/```json\s*([\s\S]*?)```/) || text.match(/({[\s\S]*})/)
  return match ? match[1].trim() : text.trim()
}

/**
 * Analisa uma imagem de produto e retorna seus atributos visuais estruturados.
 *
 * Envia a imagem para o modelo de visão `llama-4-scout-17b` via Groq,
 * usando o prompt COSTAR+PASSEF definido em `src/prompts/image-analyzer.md`.
 *
 * @param {string} imageBase64 - Imagem codificada em Base64.
 * @param {string} mimeType - Tipo MIME da imagem (ex: "image/jpeg").
 * @param {string} apiKey - API Key do Groq fornecida pelo usuário.
 * @returns {Promise<Object>} Atributos do produto: product_type, primary_colors,
 *   materials_or_textures, visual_style, distinctive_visual_elements,
 *   condition, background_context, confidence.
 * @throws {Error} Se o modelo retornar uma resposta que não seja JSON válido.
 */
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

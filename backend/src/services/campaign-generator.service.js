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
 * Gera copies de campanha de marketing para Instagram, TikTok e Google Ads.
 *
 * Envia os atributos do produto e o contexto do usuário para o modelo de texto
 * `llama-3.3-70b-versatile` via Groq, usando o prompt COSTAR+PASSEF definido
 * em `src/prompts/campaign-generator.md`.
 *
 * @param {Object} productAttributes - Atributos visuais extraídos pelo agente de visão.
 * @param {Object} userContext - Contexto fornecido pelo usuário na interface.
 * @param {string} userContext.product_name - Nome do produto (obrigatório).
 * @param {string|null} userContext.highlight - Diferencial ou destaque do produto.
 * @param {string|null} userContext.tone - Tom da comunicação (ex: urgente, divertido).
 * @param {string|null} userContext.target_audience - Público-alvo da campanha.
 * @param {string} apiKey - API Key do Groq fornecida pelo usuário.
 * @returns {Promise<Object>} Campanha estruturada com seções instagram, tiktok e google_ads.
 * @throws {Error} Se o modelo retornar uma resposta que não seja JSON válido.
 */
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

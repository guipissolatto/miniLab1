const express = require('express')
const { upload, toBase64 } = require('../handlers/upload.handler')
const { analyzeImage } = require('../services/image-analyzer.service')
const { generateCampaign } = require('../services/campaign-generator.service')
const { formatCampaignResponse, formatErrorResponse } = require('../formatters/response.formatter')

const router = express.Router()

router.post('/generate', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(formatErrorResponse('Imagem obrigatória.', 400))
    }

    const { product_name, highlight, tone, target_audience } = req.body

    if (!product_name) {
      return res.status(400).json(formatErrorResponse('Nome do produto obrigatório.', 400))
    }

    const apiKey = (req.headers['x-api-key'] || process.env.GEMINI_API_KEY || '').trim()

    if (!apiKey) {
      return res.status(400).json(formatErrorResponse('API Key obrigatória.', 400))
    }

    const imageBase64 = toBase64(req.file.buffer)
    const mimeType = req.file.mimetype

    const productAttributes = await analyzeImage(imageBase64, mimeType, apiKey)

    const userContext = {
      product_name,
      highlight: highlight || null,
      tone: tone || null,
      target_audience: target_audience || null,
    }

    const campaign = await generateCampaign(productAttributes, userContext, apiKey)

    return res.status(200).json(formatCampaignResponse(campaign))
  } catch (err) {
    console.error('[ERROR STATUS]', err.status)
    console.error('[ERROR MESSAGE]', err.message)
    console.error('[ERROR STACK]', err.stack)
    const statusCode = err.status || 500
    let message = 'Erro interno ao gerar campanha.'

    if (err.status === 400 && err.message?.toLowerCase().includes('api key')) message = 'API Key inválida. Verifique sua chave do Google Gemini em aistudio.google.com.'
    else if (err.status === 403) message = 'API Key sem permissão. Verifique se a chave está ativa em aistudio.google.com.'
    else if (err.status === 429) message = 'Limite de requisições atingido. Aguarde alguns segundos e tente novamente.'
    else if (err.message) message = err.message

    return res.status(statusCode).json(formatErrorResponse(message, statusCode))
  }
})

module.exports = router

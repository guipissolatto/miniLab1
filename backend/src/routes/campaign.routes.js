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

    const imageBase64 = toBase64(req.file.buffer)
    const mimeType = req.file.mimetype

    const productAttributes = await analyzeImage(imageBase64, mimeType)

    const userContext = {
      product_name,
      highlight: highlight || null,
      tone: tone || null,
      target_audience: target_audience || null,
    }

    const campaign = await generateCampaign(productAttributes, userContext)

    return res.status(200).json(formatCampaignResponse(campaign))
  } catch (err) {
    const isApiError = err.status && err.message
    const statusCode = isApiError ? err.status : 500
    const message = isApiError ? err.message : 'Erro interno ao gerar campanha.'
    return res.status(statusCode).json(formatErrorResponse(message, statusCode))
  }
})

module.exports = router

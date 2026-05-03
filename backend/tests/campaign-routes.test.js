const request = require('supertest')
const path = require('path')

jest.mock('../src/services/image-analyzer.service')
jest.mock('../src/services/campaign-generator.service')

const { analyzeImage } = require('../src/services/image-analyzer.service')
const { generateCampaign } = require('../src/services/campaign-generator.service')

const app = require('../src/server')

const fakeAttributes = {
  product_type: 'sneaker',
  primary_colors: ['white'],
  visual_style: 'casual',
  confidence: 'high',
}

const fakeCampaign = {
  instagram: {
    feed_caption: 'Legenda teste',
    stories_text: 'Stories teste',
    hashtags: ['tag1'],
    suggested_format: 'feed',
  },
  tiktok: {
    hook: 'Hook teste',
    script: 'Script teste',
    cta: 'CTA teste',
    hashtags: ['tiktag1'],
    trend_suggestion: 'Trend teste',
  },
  google_ads: {
    headline_main: 'Headline',
    headline_alt_1: 'Alt 1',
    headline_alt_2: 'Alt 2',
    description: 'Descrição',
    cta: 'Compre Agora',
  },
}

const fakeImageBuffer = Buffer.from('fake-image-data')

describe('POST /api/generate', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('retorna 400 quando nenhuma imagem é enviada', async () => {
    const res = await request(app)
      .post('/api/generate')
      .set('x-api-key', 'gsk_test')
      .field('product_name', 'Tênis Teste')

    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
    expect(res.body.error.message).toMatch(/imagem/i)
  })

  it('retorna 400 quando product_name está ausente', async () => {
    const res = await request(app)
      .post('/api/generate')
      .set('x-api-key', 'gsk_test')
      .attach('image', fakeImageBuffer, { filename: 'product.jpg', contentType: 'image/jpeg' })

    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
    expect(res.body.error.message).toMatch(/produto/i)
  })

  it('retorna 400 quando api key está ausente', async () => {
    const res = await request(app)
      .post('/api/generate')
      .attach('image', fakeImageBuffer, { filename: 'product.jpg', contentType: 'image/jpeg' })
      .field('product_name', 'Tênis Teste')

    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
    expect(res.body.error.message).toMatch(/api key/i)
  })

  it('retorna 200 com campanha válida quando tudo está correto', async () => {
    analyzeImage.mockResolvedValue(fakeAttributes)
    generateCampaign.mockResolvedValue(fakeCampaign)

    const res = await request(app)
      .post('/api/generate')
      .set('x-api-key', 'gsk_test')
      .attach('image', fakeImageBuffer, { filename: 'product.jpg', contentType: 'image/jpeg' })
      .field('product_name', 'Tênis Teste')
      .field('tone', 'urgente')

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.instagram.feed_caption).toBe('Legenda teste')
    expect(res.body.data.tiktok.hook).toBe('Hook teste')
    expect(analyzeImage).toHaveBeenCalledWith(expect.any(String), 'image/jpeg', 'gsk_test')
    expect(generateCampaign).toHaveBeenCalledWith(
      fakeAttributes,
      expect.objectContaining({ product_name: 'Tênis Teste', tone: 'urgente' }),
      'gsk_test'
    )
  })

  it('retorna 429 quando o serviço lança erro de rate limit', async () => {
    const err = new Error('rate limit')
    err.status = 429
    analyzeImage.mockRejectedValue(err)

    const res = await request(app)
      .post('/api/generate')
      .set('x-api-key', 'gsk_test')
      .attach('image', fakeImageBuffer, { filename: 'product.jpg', contentType: 'image/jpeg' })
      .field('product_name', 'Tênis Teste')

    expect(res.status).toBe(429)
    expect(res.body.success).toBe(false)
    expect(res.body.error.message).toMatch(/limite/i)
  })

  it('retorna 500 quando o serviço lança erro genérico', async () => {
    analyzeImage.mockRejectedValue(new Error('falha inesperada'))

    const res = await request(app)
      .post('/api/generate')
      .set('x-api-key', 'gsk_test')
      .attach('image', fakeImageBuffer, { filename: 'product.jpg', contentType: 'image/jpeg' })
      .field('product_name', 'Tênis Teste')

    expect(res.status).toBe(500)
    expect(res.body.success).toBe(false)
    expect(res.body.error.message).toBe('falha inesperada')
  })
})

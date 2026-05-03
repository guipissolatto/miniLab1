const { formatCampaignResponse, formatErrorResponse } = require('../src/formatters/response.formatter')

const validCampaign = {
  instagram: {
    feed_caption: 'Legenda de teste',
    stories_text: 'Stories de teste',
    hashtags: ['tag1', 'tag2'],
    suggested_format: 'feed',
  },
  tiktok: {
    hook: 'Hook de teste',
    script: 'Script de teste',
    cta: 'CTA de teste',
    hashtags: ['tiktag1'],
    trend_suggestion: 'Trend de teste',
  },
  google_ads: {
    headline_main: 'Headline principal',
    headline_alt_1: 'Headline alt 1',
    headline_alt_2: 'Headline alt 2',
    description: 'Descrição de teste',
    cta: 'Compre Agora',
  },
}

describe('formatCampaignResponse', () => {
  it('retorna success true com os dados estruturados', () => {
    const result = formatCampaignResponse(validCampaign)
    expect(result.success).toBe(true)
    expect(result.data.instagram.feed_caption).toBe('Legenda de teste')
    expect(result.data.tiktok.hook).toBe('Hook de teste')
    expect(result.data.google_ads.headline_main).toBe('Headline principal')
  })

  it('retorna arrays vazios quando hashtags estão ausentes', () => {
    const result = formatCampaignResponse({ instagram: {}, tiktok: {}, google_ads: {} })
    expect(result.data.instagram.hashtags).toEqual([])
    expect(result.data.tiktok.hashtags).toEqual([])
  })

  it('retorna strings vazias para campos ausentes', () => {
    const result = formatCampaignResponse({})
    expect(result.data.instagram.feed_caption).toBe('')
    expect(result.data.google_ads.description).toBe('')
  })
})

describe('formatErrorResponse', () => {
  it('retorna success false com mensagem e statusCode', () => {
    const result = formatErrorResponse('Erro de teste', 400)
    expect(result.success).toBe(false)
    expect(result.error.message).toBe('Erro de teste')
    expect(result.error.statusCode).toBe(400)
  })

  it('usa statusCode 500 como padrão', () => {
    const result = formatErrorResponse('Erro genérico')
    expect(result.error.statusCode).toBe(500)
  })
})

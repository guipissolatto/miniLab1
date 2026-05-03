const mockCreate = jest.fn()

jest.mock('groq-sdk', () => {
  return jest.fn().mockImplementation(() => ({
    chat: { completions: { create: mockCreate } },
  }))
})

const { generateCampaign } = require('../src/services/campaign-generator.service')

const fakeAttributes = {
  product_type: 'sneaker',
  primary_colors: ['white'],
  visual_style: 'casual',
  confidence: 'high',
}

const fakeContext = {
  product_name: 'Air Run Pro',
  highlight: 'edição limitada',
  tone: 'urgente',
  target_audience: 'jovens 18-30',
}

const fakeCampaign = {
  instagram: {
    feed_caption: 'Legenda teste',
    stories_text: 'Stories teste',
    hashtags: ['tag1', 'tag2'],
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

describe('generateCampaign', () => {
  beforeEach(() => mockCreate.mockReset())

  it('retorna campanha válida quando a API responde corretamente', async () => {
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: JSON.stringify(fakeCampaign) } }],
    })

    const result = await generateCampaign(fakeAttributes, fakeContext, 'gsk_test')
    expect(result.instagram.feed_caption).toBe('Legenda teste')
    expect(result.tiktok.hook).toBe('Hook teste')
    expect(result.google_ads.headline_main).toBe('Headline')
  })

  it('extrai JSON de resposta com bloco markdown', async () => {
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: '```json\n' + JSON.stringify(fakeCampaign) + '\n```' } }],
    })

    const result = await generateCampaign(fakeAttributes, fakeContext, 'gsk_test')
    expect(result.instagram).toBeDefined()
  })

  it('lança erro quando a API retorna JSON inválido', async () => {
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: 'resposta inválida' } }],
    })

    await expect(generateCampaign(fakeAttributes, fakeContext, 'gsk_test')).rejects.toThrow(
      'Campaign Generator returned invalid JSON'
    )
  })
})

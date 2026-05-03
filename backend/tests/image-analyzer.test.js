const mockCreate = jest.fn()

jest.mock('@anthropic-ai/sdk', () => {
  return jest.fn().mockImplementation(() => ({
    messages: { create: mockCreate },
  }))
})

const { analyzeImage } = require('../src/services/image-analyzer.service')

describe('analyzeImage', () => {
  beforeEach(() => mockCreate.mockReset())

  it('retorna JSON válido quando a API responde corretamente', async () => {
    const fakeAttributes = {
      product_type: 'sneaker',
      primary_colors: ['white'],
      materials_or_textures: ['canvas'],
      visual_style: 'casual',
      distinctive_visual_elements: ['logo'],
      condition: 'new',
      background_context: 'white studio',
      confidence: 'high',
    }

    mockCreate.mockResolvedValue({
      content: [{ text: JSON.stringify(fakeAttributes) }],
    })

    const result = await analyzeImage('base64string', 'image/jpeg')
    expect(result.product_type).toBe('sneaker')
    expect(result.confidence).toBe('high')
  })

  it('lança erro quando a API retorna JSON inválido', async () => {
    mockCreate.mockResolvedValue({
      content: [{ text: 'resposta inválida' }],
    })

    await expect(analyzeImage('base64string', 'image/jpeg')).rejects.toThrow(
      'Image Analyzer returned invalid JSON'
    )
  })
})

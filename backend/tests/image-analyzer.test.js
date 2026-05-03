const mockCreate = jest.fn()

jest.mock('groq-sdk', () => {
  return jest.fn().mockImplementation(() => ({
    chat: { completions: { create: mockCreate } },
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
      choices: [{ message: { content: JSON.stringify(fakeAttributes) } }],
    })

    const result = await analyzeImage('base64string', 'image/jpeg', 'gsk_test')
    expect(result.product_type).toBe('sneaker')
    expect(result.confidence).toBe('high')
  })

  it('extrai JSON de resposta com bloco markdown', async () => {
    const fakeAttributes = { product_type: 'bag', confidence: 'medium' }

    mockCreate.mockResolvedValue({
      choices: [{ message: { content: '```json\n' + JSON.stringify(fakeAttributes) + '\n```' } }],
    })

    const result = await analyzeImage('base64string', 'image/jpeg', 'gsk_test')
    expect(result.product_type).toBe('bag')
  })

  it('lança erro quando a API retorna JSON inválido', async () => {
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: 'resposta inválida' } }],
    })

    await expect(analyzeImage('base64string', 'image/jpeg', 'gsk_test')).rejects.toThrow(
      'Image Analyzer returned invalid JSON'
    )
  })
})

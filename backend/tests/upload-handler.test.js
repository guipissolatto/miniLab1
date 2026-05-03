const { toBase64 } = require('../src/handlers/upload.handler')

describe('toBase64', () => {
  it('converte buffer para string base64', () => {
    const buffer = Buffer.from('hello world')
    const result = toBase64(buffer)
    expect(result).toBe(buffer.toString('base64'))
    expect(typeof result).toBe('string')
  })

  it('retorna string vazia para buffer vazio', () => {
    const result = toBase64(Buffer.alloc(0))
    expect(result).toBe('')
  })
})

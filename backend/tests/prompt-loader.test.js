const path = require('path')
const { loadPrompt } = require('../src/utils/prompt-loader')

describe('prompt-loader', () => {
  it('carrega um prompt existente como string', () => {
    const content = loadPrompt('image-analyzer.md')
    expect(typeof content).toBe('string')
    expect(content.length).toBeGreaterThan(0)
  })

  it('lança erro quando o arquivo não existe', () => {
    expect(() => loadPrompt('nao-existe.md')).toThrow('Prompt file not found: nao-existe.md')
  })
})

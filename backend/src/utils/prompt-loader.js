const fs = require('fs')
const path = require('path')

const PROMPTS_DIR = path.join(__dirname, '..', 'prompts')

/**
 * Lê e retorna o conteúdo de um arquivo de prompt Markdown.
 *
 * Os prompts ficam em `src/prompts/` e seguem os frameworks COSTAR+PASSEF.
 * O conteúdo é passado diretamente como system prompt para os modelos de IA.
 *
 * @param {string} filename - Nome do arquivo (ex: "image-analyzer.md").
 * @returns {string} Conteúdo do prompt como string UTF-8.
 * @throws {Error} Se o arquivo não existir no diretório de prompts.
 */
function loadPrompt(filename) {
  const filepath = path.join(PROMPTS_DIR, filename)

  if (!fs.existsSync(filepath)) {
    throw new Error(`Prompt file not found: ${filename}`)
  }

  return fs.readFileSync(filepath, 'utf-8')
}

module.exports = { loadPrompt }

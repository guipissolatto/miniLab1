const fs = require('fs')
const path = require('path')

const PROMPTS_DIR = path.join(__dirname, '..', 'prompts')

function loadPrompt(filename) {
  const filepath = path.join(PROMPTS_DIR, filename)

  if (!fs.existsSync(filepath)) {
    throw new Error(`Prompt file not found: ${filename}`)
  }

  return fs.readFileSync(filepath, 'utf-8')
}

module.exports = { loadPrompt }

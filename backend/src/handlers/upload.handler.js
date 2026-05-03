const multer = require('multer')

const MAX_SIZE_BYTES = parseInt(process.env.MAX_FILE_SIZE_MB || '5') * 1024 * 1024
const ALLOWED_TYPES = (process.env.ALLOWED_MIME_TYPES || 'image/jpeg,image/png,image/webp').split(',')

const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE_BYTES },
  fileFilter(_req, file, cb) {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error(`Tipo de arquivo não suportado: ${file.mimetype}. Use JPG, PNG ou WebP.`))
    }
  },
})

function toBase64(buffer) {
  return buffer.toString('base64')
}

module.exports = { upload, toBase64 }

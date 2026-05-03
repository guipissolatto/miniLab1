require('dotenv').config()

const express = require('express')
const cors = require('cors')
const campaignRoutes = require('./routes/campaign.routes')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

app.get('/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api', campaignRoutes)

app.listen(PORT, () => {
  console.log(`miniLab1 backend rodando em http://localhost:${PORT}`)
})

module.exports = app

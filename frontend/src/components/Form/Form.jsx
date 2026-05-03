import { useState } from 'react'
import Upload from '../Upload/Upload'
import { useGenerateCampaign } from '../../hooks/useGenerateCampaign'

const TONES = [
  { value: '', label: 'Padrão' },
  { value: 'divertido', label: 'Divertido' },
  { value: 'sofisticado', label: 'Sofisticado' },
  { value: 'urgente', label: 'Urgente' },
  { value: 'inspirador', label: 'Inspirador' },
]

export default function Form() {
  const [file, setFile] = useState(null)
  const [fields, setFields] = useState({
    product_name: '',
    highlight: '',
    tone: '',
    target_audience: '',
    api_key: '',
  })

  const { generate, loading, error } = useGenerateCampaign()

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!file || !fields.product_name || !fields.api_key) return
    await generate(file, fields)
  }

  const canSubmit = file && fields.product_name && fields.api_key && !loading

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-5">
      <h2 className="text-base font-semibold text-gray-800">Dados do produto</h2>

      <Upload onFileSelect={setFile} />

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome do produto <span className="text-red-500">*</span>
          </label>
          <input
            name="product_name"
            value={fields.product_name}
            onChange={handleChange}
            placeholder="Ex: Tênis Air Run Pro"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Diferencial / destaque</label>
          <input
            name="highlight"
            value={fields.highlight}
            onChange={handleChange}
            placeholder="Ex: edição limitada, 40% de desconto, vegano"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tom da comunicação</label>
            <select
              name="tone"
              value={fields.tone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {TONES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Público-alvo</label>
            <input
              name="target_audience"
              value={fields.target_audience}
              onChange={handleChange}
              placeholder="Ex: mulheres 25-35 anos"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            API Key Google Gemini <span className="text-red-500">*</span>
          </label>
          <input
            name="api_key"
            type="password"
            value={fields.api_key}
            onChange={handleChange}
            placeholder="AIza..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            Chave gratuita em aistudio.google.com · Não é armazenada.
          </p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-2.5 text-sm transition-colors"
      >
        {loading ? 'Gerando campanha...' : 'Gerar Campanha'}
      </button>
    </form>
  )
}

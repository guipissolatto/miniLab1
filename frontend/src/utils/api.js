export async function generateCampaign(file, fields) {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('product_name', fields.product_name)
  if (fields.highlight) formData.append('highlight', fields.highlight)
  if (fields.tone) formData.append('tone', fields.tone)
  if (fields.target_audience) formData.append('target_audience', fields.target_audience)

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'x-api-key': fields.api_key },
    body: formData,
  })

  const json = await response.json()

  if (!response.ok) {
    throw new Error(json.error?.message || 'Erro ao gerar campanha.')
  }

  return json.data
}

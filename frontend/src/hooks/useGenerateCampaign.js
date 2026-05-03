import { useState } from 'react'
import { generateCampaign } from '../utils/api'
import { useCampaignStore } from '../store/campaign.store'

export function useGenerateCampaign() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const setCampaign = useCampaignStore((s) => s.setCampaign)

  async function generate(file, fields) {
    setLoading(true)
    setError(null)
    try {
      const data = await generateCampaign(file, fields)
      setCampaign(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { generate, loading, error }
}

import { useState } from 'react'
import ChannelSelector from '../ChannelSelector/ChannelSelector'
import { useCampaignStore } from '../../store/campaign.store'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
    >
      {copied ? 'Copiado!' : 'Copiar'}
    </button>
  )
}

function Block({ label, text }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
        <CopyButton text={text} />
      </div>
      <p className="text-sm text-gray-800 bg-gray-50 rounded-lg px-3 py-2 whitespace-pre-wrap">{text}</p>
    </div>
  )
}

function TagList({ label, tags }) {
  const text = tags.map((t) => `#${t}`).join(' ')
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
        <CopyButton text={text} />
      </div>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span key={tag} className="text-xs bg-indigo-50 text-indigo-700 rounded-full px-2 py-0.5">#{tag}</span>
        ))}
      </div>
    </div>
  )
}

function InstagramTab({ data }) {
  return (
    <div className="space-y-4">
      <Block label="Legenda (feed)" text={data.feed_caption} />
      <Block label="Stories" text={data.stories_text} />
      <TagList label="Hashtags" tags={data.hashtags} />
      <Block label="Formato sugerido" text={data.suggested_format} />
    </div>
  )
}

function TikTokTab({ data }) {
  return (
    <div className="space-y-4">
      <Block label="Hook (primeiros 3s)" text={data.hook} />
      <Block label="Roteiro" text={data.script} />
      <Block label="Call-to-action" text={data.cta} />
      <TagList label="Hashtags" tags={data.hashtags} />
      <Block label="Sugestão de tendência" text={data.trend_suggestion} />
    </div>
  )
}

function GoogleAdsTab({ data }) {
  return (
    <div className="space-y-4">
      <Block label="Headline principal" text={data.headline_main} />
      <Block label="Headline alternativo 1" text={data.headline_alt_1} />
      <Block label="Headline alternativo 2" text={data.headline_alt_2} />
      <Block label="Descrição" text={data.description} />
      <Block label="Call-to-action" text={data.cta} />
    </div>
  )
}

function DownloadJsonButton({ campaign }) {
  function handleDownload() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const evidence = {
      generated_at: new Date().toISOString(),
      model_vision: 'meta-llama/llama-4-scout-17b-16e-instruct',
      model_copy: 'llama-3.3-70b-versatile',
      provider: 'Groq',
      campaign,
    }
    const blob = new Blob([JSON.stringify(evidence, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `minilab1-campaign-${timestamp}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleDownload}
      className="text-xs text-gray-500 hover:text-gray-700 border border-gray-300 hover:border-gray-400 rounded-lg px-3 py-1.5 transition-colors"
    >
      Baixar JSON
    </button>
  )
}

export default function Results() {
  const campaign = useCampaignStore((s) => s.campaign)
  const [activeChannel, setActiveChannel] = useState('instagram')

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">Campanha gerada</h2>
        <DownloadJsonButton campaign={campaign} />
      </div>
      <ChannelSelector active={activeChannel} onChange={setActiveChannel} />

      <div className="pt-2">
        {activeChannel === 'instagram' && <InstagramTab data={campaign.instagram} />}
        {activeChannel === 'tiktok' && <TikTokTab data={campaign.tiktok} />}
        {activeChannel === 'google_ads' && <GoogleAdsTab data={campaign.google_ads} />}
      </div>
    </div>
  )
}

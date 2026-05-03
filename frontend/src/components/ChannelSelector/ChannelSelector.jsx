const CHANNELS = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'google_ads', label: 'Google Ads' },
]

export default function ChannelSelector({ active, onChange }) {
  return (
    <div className="flex gap-2 border-b border-gray-200">
      {CHANNELS.map((ch) => (
        <button
          key={ch.key}
          onClick={() => onChange(ch.key)}
          className={`pb-2 px-3 text-sm font-medium border-b-2 transition-colors
            ${active === ch.key
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          {ch.label}
        </button>
      ))}
    </div>
  )
}

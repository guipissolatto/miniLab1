import Form from './components/Form/Form'
import Results from './components/Results/Results'
import { useCampaignStore } from './store/campaign.store'

export default function App() {
  const campaign = useCampaignStore((s) => s.campaign)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">miniLab1</h1>
        <p className="text-sm text-gray-500">Crie campanhas de marketing com IA a partir de uma imagem</p>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10 space-y-10">
        <Form />
        {campaign && <Results />}
      </main>
    </div>
  )
}

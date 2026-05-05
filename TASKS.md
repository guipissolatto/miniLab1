# miniLab1 — Tasks de Implementação

> Acompanhamento do progresso do MVP.
> Legenda: ✅ Concluído · 🔄 Em andamento · ⬜ Pendente

---

## Backend

| # | Task | Status |
|---|------|--------|
| 1 | `package.json` + instalar dependências | ✅ |
| 2 | `.env.example` com variáveis de ambiente | ✅ |
| 3 | `utils/prompt-loader.js` | ✅ |
| 4 | `services/image-analyzer.service.js` | ✅ |
| 5 | `services/campaign-generator.service.js` | ✅ |
| 6 | `formatters/response.formatter.js` | ✅ |
| 7 | `handlers/upload.handler.js` | ✅ |
| 8 | `routes/campaign.routes.js` | ✅ |
| 9 | `server.js` (entry point + guard `require.main`) | ✅ |

---

## Frontend

| # | Task | Status |
|---|------|--------|
| 10 | `package.json` + dependências | ✅ |
| 11 | Configurar Vite + Tailwind | ✅ |
| 12 | `src/main.jsx` + `App.jsx` | ✅ |
| 13 | `components/Upload` (drag & drop) | ✅ |
| 14 | `components/Form` (nome, tom, público, API key) | ✅ |
| 15 | `components/ChannelSelector` (abas) | ✅ |
| 16 | `components/Results` (copies + botão copiar + download JSON) | ✅ |
| 17 | `hooks/useGenerateCampaign.js` | ✅ |
| 18 | `store/campaign.store.js` (Zustand) | ✅ |
| 19 | `utils/api.js` (wrapper fetch com tratamento de erro) | ✅ |

---

## Prompt Engineering

| # | Task | Status |
|---|------|--------|
| 20 | Prompt do agente de visão com COSTAR + PASSEF (`image-analyzer.md`) | ✅ |
| 21 | Prompt do agente de texto com COSTAR + PASSEF (`campaign-generator.md`) | ✅ |

---

## Testes

| # | Task | Status |
|---|------|--------|
| 22 | Testes unitários — `image-analyzer.service` (3 testes) | ✅ |
| 23 | Testes unitários — `campaign-generator.service` (3 testes) | ✅ |
| 24 | Testes unitários — `upload.handler` (2 testes) | ✅ |
| 25 | Testes unitários — `response.formatter` (6 testes) | ✅ |
| 26 | Testes unitários — `prompt-loader` (4 testes) | ✅ |
| 27 | Testes de integração — `campaign.routes` com supertest (6 testes) | ✅ |
| 28 | Cobertura total: 96.4% statements · 100% functions · 98.7% lines | ✅ |

---

## Validação e Evidência

| # | Task | Status |
|---|------|--------|
| 29 | Teste do fluxo completo end-to-end (upload → agentes → campanha) | ✅ |
| 30 | Evidência de campanha real commitada em `evidence/` | ✅ |
| 31 | Migração de provider: Anthropic → Gemini → Groq (free tier funcional) | ✅ |

---

## Entrega Final

| # | Task | Status |
|---|------|--------|
| 32 | README completo (storytelling, instalação, curl, estrutura, cobertura) | ✅ |
| 33 | Makefile com `install`, `run`, `test`, `format` | ✅ |
| 34 | LICENSE MIT | ✅ |
| 35 | JSDoc em todos os serviços | ✅ |
| 36 | Remoção de dependências não utilizadas (Anthropic SDK, Google GenAI) | ✅ |
| 37 | Conventional commits em todo o histórico | ✅ |
| 38 | Tag `v1.0.0` publicada no GitHub | ✅ |
| 39 | Repositório público e acessível | ✅ |

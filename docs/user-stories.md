# miniLab1 — User Stories

> Persona principal: **pequeno empreendedor** sem equipe de marketing, que precisa criar copies profissionais de forma rápida e acessível.

---

## User Stories

| ID | Como... | Quero... | Para... |
|----|---------|----------|---------|
| US-01 | empreendedor | fazer upload de uma foto do meu produto (JPG, PNG ou WebP) | que o sistema analise a imagem automaticamente sem eu precisar descrever o produto |
| US-02 | empreendedor | informar o nome, destaque, tom e público-alvo do produto | personalizar a campanha gerada de acordo com minha estratégia |
| US-03 | empreendedor | clicar em "Gerar Campanha" e receber copies prontos em segundos | economizar tempo sem precisar de copywriter ou agência |
| US-04 | empreendedor | visualizar os resultados separados por canal (Instagram, TikTok, Google Ads) | usar cada copy diretamente na plataforma correta |
| US-05 | empreendedor | copiar o copy de cada canal com um único clique | colá-lo na plataforma sem precisar selecionar o texto manualmente |
| US-06 | usuário | inserir minha própria API Key do Groq | garantir que minhas credenciais não sejam armazenadas pela plataforma |
| US-07 | usuário | ver o botão "Gerar" desabilitado enquanto campos obrigatórios estão vazios | evitar erros de submissão incompleta |
| US-08 | usuário | receber mensagens de erro claras (API Key inválida, limite atingido, imagem muito grande) | entender o que aconteceu e como resolver sem abrir o terminal |
| US-09 | usuário técnico | baixar o resultado completo em JSON | arquivar, integrar ou auditar a campanha gerada |

---

## Rastreabilidade US × Tasks

| US | Tasks relacionadas |
|----|--------------------|
| US-01 | 7 `upload.handler` · 13 `Upload component` · 4 `image-analyzer.service` · 20 `prompt image-analyzer` · 22 testes image-analyzer · 24 testes upload.handler |
| US-02 | 14 `Form component` · 19 `api.js` |
| US-03 | 5 `campaign-generator.service` · 8 `campaign.routes` · 9 `server.js` · 17 `useGenerateCampaign` · 19 `api.js` · 21 `prompt campaign-generator` · 23 testes campaign-generator · 27 testes integração routes |
| US-04 | 6 `response.formatter` · 12 `App.jsx` · 15 `ChannelSelector` · 16 `Results` · 25 testes response.formatter |
| US-05 | 16 `Results` (botão copiar) |
| US-06 | 2 `.env.example` · 8 `campaign.routes` (header x-api-key) · 14 `Form component` · 19 `api.js` |
| US-07 | 14 `Form component` (lógica de disable) |
| US-08 | 6 `response.formatter` · 8 `campaign.routes` (erros 400/429) · 19 `api.js` · 25 testes formatter · 27 testes integração |
| US-09 | 16 `Results` (DownloadJsonButton) · 30 evidência commitada em `evidence/` |

---

## Tasks de infraestrutura

Não entregam comportamento visível ao usuário diretamente, mas sustentam qualidade e reprodutibilidade:

| Tasks | Categoria |
|-------|-----------|
| 1, 10 | Gerenciamento de dependências (`package.json`) |
| 3, 11, 12, 18 | Fundação técnica (prompt-loader, Vite, App, Zustand) |
| 26, 28, 29, 31 | Qualidade e validação end-to-end |
| 32, 33, 34, 35, 36, 37, 38, 39 | Entrega final e empacotamento |

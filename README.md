# miniLab1

> Crie campanhas de marketing com IA a partir de uma imagem.

Suba a foto do seu produto, informe um contexto mínimo e receba em segundos copies prontos para **Instagram**, **TikTok** e **Google Ads**.

---

## Sobre o projeto

miniLab1 é uma ferramenta web que transforma uma imagem de produto em uma campanha de marketing completa, utilizando Inteligência Artificial generativa. Pensada para pequenos empreendedores e criadores de conteúdo que não têm equipe de marketing, orçamento para agências ou tempo para criar copy profissional.

**Exemplos de uso:**
- Um lojista sobe a foto do tênis e recebe legenda para o Instagram, roteiro para o TikTok e anúncio para o Google Ads — tudo focado em venda
- Uma artesã cria uma campanha de lançamento sem precisar de copywriter

---

## Como funciona

```
1. Acesse http://localhost:5173 (sem login)
2. Insira sua API Key (Groq — gratuita em console.groq.com)
3. Faça upload da foto do produto (JPG, PNG ou WebP, até 5 MB)
4. Informe o nome e contexto do produto
5. Clique em "Gerar Campanha"
6. Copie os outputs por canal e use nas plataformas
```

O processamento usa um pipeline de dois agentes de IA:
- **Agente de visão** (`llama-4-scout-17b`) — analisa a imagem e extrai atributos do produto (tipo, cores, estilo, materiais)
- **Agente de texto** (`llama-3.3-70b`) — recebe os atributos + contexto do usuário e gera as copies para cada canal

Os prompts dos agentes seguem os frameworks **COSTAR** (contexto, objetivo, estilo, tom, audiência, resposta) e **PASSEF** (persona, ação, contexto, exemplos few-shot, formato), documentados em [`backend/src/prompts/`](backend/src/prompts/).

---

## Outputs gerados

| Canal | Conteúdo |
|-------|----------|
| **Instagram** | Legenda para feed, texto para Stories, hashtags e sugestão de formato |
| **TikTok** | Hook de abertura, roteiro de 15–30s, CTA e hashtags |
| **Google Ads** | Headlines (até 30 chars), descrição (até 90 chars) e CTA |

---

## Inputs do usuário

| Campo | Obrigatório |
|-------|-------------|
| Imagem do produto (JPG/PNG/WebP) | Sim |
| Nome do produto | Sim |
| API Key (Groq) | Sim |
| Diferencial / destaque | Não |
| Tom da comunicação | Não |
| Público-alvo | Não |

> A API Key é inserida pelo próprio usuário e não é armazenada em nenhum momento.

---

## Pré-requisitos

- [Node.js](https://nodejs.org) 18 ou superior
- npm 9+
- API Key gratuita do [Groq](https://console.groq.com)

---

## Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/guipissolatto/miniLab1.git
cd miniLab1
```

### 2. Configure o backend

```bash
cd backend
npm install
cp .env.example .env
```

Edite o `.env` se quiser ajustar porta ou temperaturas dos agentes. A API Key **não** vai no `.env` — ela é inserida pelo usuário na interface.

```bash
npm run dev        # inicia em http://localhost:3001
```

### 3. Configure o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev        # inicia em http://localhost:5173
```

### 4. Acesse

Abra [http://localhost:5173](http://localhost:5173), insira sua API Key do Groq e envie uma imagem de produto.

---

## Rodando os testes

```bash
cd backend
npm test                  # todos os testes
npm run test:coverage     # com relatório de cobertura
```

---

## Estrutura do projeto

```
miniLab1/
├── backend/
│   ├── src/
│   │   ├── prompts/          # prompts COSTAR+PASSEF dos agentes (.md)
│   │   ├── services/         # image-analyzer e campaign-generator
│   │   ├── routes/           # POST /api/generate
│   │   ├── handlers/         # upload com multer
│   │   ├── formatters/       # normalização da resposta
│   │   └── utils/            # prompt-loader
│   └── tests/                # 21 testes (unitários + integração)
├── frontend/
│   └── src/
│       ├── components/       # Form, Upload, Results, ChannelSelector
│       ├── store/            # estado global com Zustand
│       └── utils/            # client HTTP
├── docs/                     # PRD, arquitetura, casos de uso, datamodel
├── evidence/                 # JSON de campanha real gerada no teste do MVP
└── README.md
```

---

## Cobertura de testes

Última atualização: **03/05/2026**

| Camada | Statements | Functions | Lines |
|--------|-----------|-----------|-------|
| Routes (integração) | 94.6% | 100% | 100% |
| Services | 100% | 100% | 100% |
| Formatters | 100% | 100% | 100% |
| Utils | 100% | 100% | 100% |
| **Total** | **96.4%** | **100%** | **98.7%** |

21 testes distribuídos em 6 suites. Testes de integração da rota principal cobertos com `supertest`.

---

## Fora do escopo (MVP)

- Login ou autenticação de usuários
- Histórico de campanhas
- Publicação automática nas plataformas
- Geração de imagens ou vídeos
- Versão mobile nativa

---

## Próximos passos (pós-MVP)

| Prioridade | Feature |
|-----------|---------|
| Alta | **Geração de imagens** — usar os atributos visuais extraídos para gerar um banner de campanha pronto (ex: feed do Instagram) via DALL·E ou Stable Diffusion |
| Alta | Histórico de campanhas geradas por sessão |
| Média | Exportar campanha em formato editável (PDF / Google Slides) |
| Média | Sugestão automática de tom e público-alvo com base na imagem |
| Baixa | Publicação direta nas plataformas via API (Instagram Graph, Google Ads API) |
| Baixa | Versão mobile nativa |

---

## Status

`MVP funcional` · Versão 1.0 · Maio 2026

Provider de IA: **Groq** (free tier) · Modelos: `llama-4-scout-17b` (visão) + `llama-3.3-70b` (texto)

---

## Autor

**Guilherme Pissolatto**

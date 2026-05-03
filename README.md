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

O processamento usa um **pipeline de dois agentes de IA**:

| Agente | Modelo | Função |
|--------|--------|--------|
| Visão | `llama-4-scout-17b-16e-instruct` | Analisa a imagem e extrai atributos (tipo, cores, estilo, materiais) |
| Texto | `llama-3.3-70b-versatile` | Recebe os atributos + contexto e gera copies para os três canais |

Os prompts seguem os frameworks **COSTAR** e **PASSEF**, documentados em [`backend/src/prompts/`](backend/src/prompts/).

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

## Demonstração

### Verificar se o backend está no ar

```bash
curl http://localhost:3001/health
# {"status":"ok"}
```

### Gerar campanha via curl

```bash
curl -X POST http://localhost:3001/api/generate \
  -H "x-api-key: gsk_SUA_CHAVE_GROQ" \
  -F "image=@produto.jpg" \
  -F "product_name=Tênis Air Run Pro" \
  -F "highlight=Edição limitada" \
  -F "tone=urgente" \
  -F "target_audience=Jovens 18-30"
```

**Resposta esperada:**

```json
{
  "success": true,
  "data": {
    "instagram": {
      "feed_caption": "Seu próximo passo começa aqui...",
      "stories_text": "Só hoje. Só agora.",
      "hashtags": ["#tenis", "#lifestyle", "#edicaolimitada"],
      "suggested_format": "carrossel"
    },
    "tiktok": {
      "hook": "Você ainda não viu o tênis que vai mudar tudo...",
      "script": "...",
      "cta": "Clica no link da bio",
      "hashtags": ["#tenis", "#moda"],
      "trend_suggestion": "Get Ready With Me"
    },
    "google_ads": {
      "headline_main": "Tênis Air Run Pro",
      "headline_alt_1": "Edição Limitada",
      "headline_alt_2": "Compre Antes que Acabe",
      "description": "Estilo e performance numa edição exclusiva. Garanta o seu agora.",
      "cta": "Compre Agora"
    }
  }
}
```

> Um exemplo real de campanha gerada está em [`evidence/`](evidence/).

---

## Tecnologias

| Camada | Stack |
|--------|-------|
| Backend | Node.js 18, Express, Multer |
| Frontend | React 18, Vite, Tailwind CSS, Zustand |
| IA | Groq SDK — `llama-4-scout-17b` (visão) + `llama-3.3-70b` (texto) |
| Testes | Jest, Supertest |
| Prompt Engineering | COSTAR + PASSEF |

---

## Pré-requisitos

- [Node.js](https://nodejs.org) 18 ou superior
- npm 9+
- API Key gratuita do [Groq](https://console.groq.com)

---

## Como rodar localmente

### Usando Make (Linux/macOS/WSL/Git Bash)

```bash
git clone https://github.com/guipissolatto/miniLab1.git
cd miniLab1
make install
make run          # backend em http://localhost:3001
```

Em outro terminal:

```bash
cd frontend && npm run dev    # frontend em http://localhost:5173
```

### Manualmente (Windows PowerShell)

```bash
git clone https://github.com/guipissolatto/miniLab1.git
cd miniLab1

# Backend
cd backend
npm install
cp .env.example .env   # ajuste se necessário
npm run dev

# Frontend (outro terminal)
cd frontend
npm install
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173).

---

## Rodando os testes

```bash
# Via Make
make test

# Via npm
cd backend
npm test                   # todos os testes
npm run test:coverage      # com relatório de cobertura
```

---

## Estrutura do projeto

```
miniLab1/
├── Makefile                       # comandos: install, run, test, format
├── backend/
│   ├── src/
│   │   ├── prompts/               # prompts COSTAR+PASSEF dos agentes (.md)
│   │   ├── services/              # image-analyzer e campaign-generator
│   │   ├── routes/                # POST /api/generate
│   │   ├── handlers/              # upload com multer (memoryStorage)
│   │   ├── formatters/            # normalização e envelope de resposta
│   │   └── utils/                 # prompt-loader
│   ├── tests/                     # 21 testes (unitários + integração)
│   └── .env.example               # variáveis de ambiente documentadas
├── frontend/
│   └── src/
│       ├── components/            # Form, Upload, Results, ChannelSelector
│       ├── store/                 # estado global com Zustand
│       └── utils/                 # client HTTP (fetch + FormData)
├── docs/                          # PRD, arquitetura, casos de uso, datamodel
├── evidence/                      # JSON de campanha real gerada no teste do MVP
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

21 testes em 6 suites — unitários e integração com `supertest`.

---

## Desenvolvido com IA generativa

### Como a IA acelerou o desenvolvimento

O projeto foi desenvolvido com **Claude Code** como copiloto principal. O maior ganho de produtividade não foi na geração de código em si, mas na capacidade de tomar decisões arquiteturais mais rápido.

O fluxo adotado:
1. **PRD detalhado primeiro** — visão do produto, problema, público-alvo, escopo do MVP e critérios de sucesso foram definidos em texto antes de qualquer código
2. **Diagramas gerados a partir da descrição** — arquitetura, casos de uso e datamodel criados com Mermaid a partir do PRD
3. **Prompts com COSTAR + PASSEF** — os agentes de IA receberam prompts estruturados com contexto, objetivo, estilo e exemplos few-shot, o que eliminou a variação nas respostas e tornou o pipeline previsível
4. **Implementação incremental com testes** — cada serviço foi implementado com testes unitários antes de avançar para o próximo

### Ferramentas utilizadas

- **Claude Code** — copiloto de desenvolvimento (geração de código, revisão, testes)
- **Groq** — provider de IA generativa (free tier, sem cartão de crédito)
- **COSTAR** — framework de prompt engineering: Contexto, Objetivo, Estilo, Tom, Audiência, Resposta
- **PASSEF** — framework complementar: Persona, Ação, Contexto, Exemplos (few-shot), Formato

### Desafios superados

O maior obstáculo técnico foi a **migração de provider de IA**. A sequência foi:
- **Anthropic Claude** → sem créditos disponíveis
- **Google Gemini 2.0** → limite de requisições zerado no projeto
- **Google Gemini 1.5** → inúmeros erros de formato e versão de API
- **Groq** → funcionou com free tier real, sem restrições

Cada troca exigiu refatorar os serviços, ajustar os mocks nos testes e adaptar os prompts ao comportamento do novo modelo. A lição foi clara: uma **abstração de provider desde o início** teria economizado tempo significativo.

Outro desafio foi a **extração de JSON das respostas**: modelos generativos frequentemente envolvem o JSON em blocos markdown (` ```json ``` `) mesmo quando o prompt pede resposta bruta. Foi necessário implementar um parser defensivo nos dois agentes.

### Lições aprendidas

- **A IA executa bem, mas não decide por você.** Em vários momentos ela propôs abstrações desnecessárias para um MVP. Foi preciso lembrá-la do escopo constantemente.
- **Testes são a rede de segurança.** Sem cobertura de testes, cada refatoração (especialmente as trocas de provider) seria arriscada. Com 96% de cobertura, cada mudança podia ser validada com confiança.
- **Entender antes de commitar.** Aceitar sugestões da IA sem compreendê-las cria dívida técnica silenciosa. O hábito de revisar cada bloco gerado antes do commit foi essencial para manter a qualidade.
- **PRD bem feito vale mais que prompt bem feito.** Quanto mais claro o contexto antes de começar, menos correções foram necessárias durante a implementação.

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

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.

---

## Autor

**Guilherme Pissolatto**

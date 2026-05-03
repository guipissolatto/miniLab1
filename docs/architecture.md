---
config:
  layout: elk
---
flowchart TD
    %% ===================== FRONTEND =====================
    subgraph FRONTEND["Frontend (Web App) — React + Vite + Tailwind"]
      FE1["UI / HTML5 + CSS3<br/>(Vite + TailwindCSS)"]
      FE2["Componente React<br/>Upload & Inputs (Dropzone, Formik)"]
      FE3["Seletor de Canal<br/>(React state)"]
      FE4["Visualizador de Resultados<br/>(Tabs, Syntax Highlight)"]
      FE5["Botões de Copiar / Compartilhar<br/>(navigator.clipboard)"]
    end

    %% ===================== BACKEND =====================
    subgraph BACKEND["Backend (Node.js + Express / AWS Lambda)"]
      BE1["API Gateway / Express Router"]
      BE2["Upload Handler<br/>(AWS S3 SDK / Multer)"]
      BE3["IA Handler<br/>(Axios ou fetch)<br/>para APIs OpenAI / Claude"]
      BE4["Task Manager<br/>(Node.js Async / Promise.all)<br/>Orquestra chamadas paralelas"]
      BE5["Formatter / Aggregator<br/>(normaliza JSON e valida schema)"]
    end

    %% ===================== EXTERNAL AI =====================
    subgraph EXTERNAL["Serviços Externos de IA"]
      E1["OpenAI API<br/>(GPT-4 Turbo / GPT-4o-mini)"]
      E2["Anthropic Claude API<br/>(Claude 3.5 / Sonnet)"]
    end

    %% ===================== DATA & STORAGE =====================
    subgraph DATA["Módulos de Dados — AWS S3 + Redis (cache)"]
      D1["ImageTempStore<br/>(S3 bucket ou FileSystem temporário)"]
      D2["JSONFormatter<br/>(estrutura canal, texto, status)"]
      D3["Cache / Redis<br/>(armazenamento rápido de respostas)"]
    end

    %% ===================== OUTPUT =====================
    subgraph OUTPUT["Interface e Exibição — React Components"]
      O1["Renderizador de Resultados<br/>(tabs para cada canal)"]
      O2["Controle de Estado (Recoil / Zustand)<br/>para UI e canais carregados"]
    end

    %% ===================== FLUXO =====================
    FE1 --> FE2 --> FE3 -->|input do usuário| BE1
    BE1 --> BE2 --> D1
    BE2 --> BE3 --> BE4 -->|gera JSON input| D2
    BE4 -->|chamadas paralelas| E1 & E2
    E1 & E2 -->|retornam JSON output| BE5
    BE5 -->|retorno consolidado via REST| FE4 --> FE5 --> O1 --> O2
    BE5 -.->|cache opcional| D3

    %% ===================== ESTILOS =====================
    style FRONTEND fill:#eef2ff,stroke:#818cf8
    style BACKEND fill:#fff7ed,stroke:#fb923c
    style EXTERNAL fill:#fefce8,stroke:#facc15
    style DATA fill:#f0fdfa,stroke:#2dd4bf
    style OUTPUT fill:#f0fdf4,stroke:#4ade80

    classDef stepBlue fill:#eef2ff,stroke:#818cf8
    classDef stepOrange fill:#fff7ed,stroke:#fb923c
    classDef stepYellow fill:#fefce8,stroke:#facc15
    classDef stepTeal fill:#f0fdfa,stroke:#2dd4bf
    classDef stepGreen fill:#f0fdf4,stroke:#4ade80

    class FE1,FE2,FE3,FE4,FE5 stepBlue
    class BE1,BE2,BE3,BE4,BE5 stepOrange
    class E1,E2 stepYellow
    class D1,D2,D3 stepTeal
    class O1,O2 stepGreen
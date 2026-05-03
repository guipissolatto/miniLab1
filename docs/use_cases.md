---
config:
  layout: elk
---
flowchart TD
    U["Usuário (Empreendedor / Criador de Conteúdo)"]

    %% ===================== FUNCIONAIS =====================
    subgraph FUNCIONAIS["Casos de Uso — Funcionais (Interação com o Sistema)"]
        UC1["UC1 — Fazer Upload da Imagem do Produto"]
        UC2["UC2 — Inserir Contexto do Produto<br/>(nome, diferencial, tom, público)"]
        UC3["UC3 — Selecionar Canal de Geração<br/>(Instagram, TikTok ou Google Ads)"]
        UC4["UC4 — Gerar Campanha com IA Claude"]
        UC5["UC5 — Visualizar Output Gerado<br/>(legenda, roteiro ou anúncio)"]
        UC6["UC6 — Copiar e Utilizar o Texto Gerado"]
    end

    %% ===================== TECNICOS =====================
    subgraph TECNICOS["Casos de Uso — Técnicos (Processos Internos do Sistema)"]
        UC7["UC7 — Pré-processar imagem (extrair tags ou palavras-chave)"]
        UC8["UC8 — Construir Prompt com Contexto e Canal"]
        UC9["UC9 — Enviar Requisição à API Claude"]
        UC10["UC10 — Receber e Validar JSON de Resposta"]
        UC11["UC11 — Formatar e Exibir Output por Canal"]
        UC12["UC12 — Gerar Logs e Medir Tempo de Execução"]
    end

    %% ===================== RELACIONAMENTOS =====================
    U --> UC1 --> UC2 --> UC3 --> UC4 --> UC5 --> UC6

    UC4 --> UC7 --> UC8 --> UC9 --> UC10 --> UC11
    UC11 --> UC5
    UC9 --> UC12

    %% ===================== ESTILOS =====================
    style FUNCIONAIS fill:#eef2ff,stroke:#818cf8
    style TECNICOS fill:#fff7ed,stroke:#fb923c
    classDef user fill:#f0fdf4,stroke:#4ade80
    class U user
---
config:
  layout: elk
---
erDiagram
    USUARIO {
        string id PK
        string api_key
        string nome
        string email
    }

    IMAGEM_PRODUTO {
        string id PK
        string usuario_id FK
        string file_path
        string tags
        datetime created_at
    }

    CONTEXTO_CAMPANHA {
        string id PK
        string usuario_id FK
        string nome_produto
        string diferencial
        string tom
        string publico_alvo
        datetime created_at
    }

    CANAL {
        string id PK
        string nome
        string tipo_template
    }

    PROMPT {
        string id PK
        string contexto_id FK
        string canal_id FK
        text texto_prompt
        datetime created_at
    }

    CONTEUDO_GERADO {
        string id PK
        string canal_id FK
        string prompt_id FK
        text texto_gerado
        string status
        int tempo_exec_ms
        datetime created_at
    }

    %% RELACIONAMENTOS
    USUARIO ||--o{ IMAGEM_PRODUTO : "possui"
    USUARIO ||--o{ CONTEXTO_CAMPANHA : "define"
    CONTEXTO_CAMPANHA ||--o{ PROMPT : "gera"
    CANAL ||--o{ PROMPT : "usa"
    PROMPT ||--o{ CONTEUDO_GERADO : "retorna"
    CANAL ||--o{ CONTEUDO_GERADO : "exibe"
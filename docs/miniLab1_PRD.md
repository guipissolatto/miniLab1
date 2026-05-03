**MINILAB1**

**miniLab1**

Crie campanhas de marketing com IA a partir de uma imagem

  -------------------------------------------
  **Product Requirements Document --- MVP**
  -------------------------------------------

Versão 1.0 · Maio 2026

**Informações do Projeto**

  ------------- ----------
  **Projeto**   miniLab1
  ------------- ----------

  ------------ -------------
  **Versão**   1.0 --- MVP
  ------------ -------------

  ---------- --------------
  **Data**   Maio de 2026
  ---------- --------------

  ------------ --------------
  **Status**   Em definição
  ------------ --------------

**1. Visão do Produto**

miniLab1 é uma ferramenta web que transforma uma imagem de produto em uma campanha de marketing completa e pronta para uso, utilizando Inteligência Artificial generativa. O usuário sobe a foto, informa um contexto mínimo e recebe em segundos copies otimizados para Instagram, TikTok e Google Ads.

Exemplos de uso: um lojista que vende tênis sobe a foto do produto e recebe em segundos uma legenda para o Instagram, um roteiro para o TikTok e um anúncio para o Google Ads --- tudo focado em venda. Uma artesã que produz peças à mão usa a ferramenta para criar uma campanha de lançamento sem precisar de agência ou copywriter.

O objetivo do MVP é validar que é possível gerar conteúdo de marketing relevante e utilizável a partir de uma única imagem, reduzindo de horas para segundos o tempo necessário para criar uma campanha básica.

**2. Problema que Resolve**

Pequenos empreendedores e criadores de conteúdo precisam publicar com frequência em múltiplos canais, mas não têm equipe de marketing, não dominam copywriting e não têm budget para agências. O resultado é:

-   Posts sem estratégia, com baixo engajamento

-   Tempo excessivo gasto em tentativa e erro

-   Conteúdo inconsistente entre canais diferentes

-   Dificuldade em adaptar a linguagem para cada plataforma

miniLab1 resolve isso com uma entrada simples (imagem + contexto) e uma saída rica e imediatamente aplicável.

**3. Público-Alvo**

**Persona Principal**

+-------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------+
| **Quem é** Empreendedor(a) solo ou microempresa que vende produtos físicos online --- moda, calçados, cosméticos, artesanato, alimentos. |
 **Dor principal**  Não tem tempo, habilidade ou dinheiro para criar copy de marketing profissional para cada postagem. |
|                                                                                                                               |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------+
| **Contexto**  Usa Instagram e TikTok ativamente. Já experimentou Google Ads mas achou difícil criar os textos. 
**Expectativa** Quer uma sugestão pronta para copiar e colar, adaptada ao canal, sem precisar editar muito.  |      
+-------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------+

**4. Proposta de Valor**

+-------------------------------------------------------------------------+
| \"Suba a foto do seu produto, conte o contexto em uma frase             |
|                                                                         |
| **e receba uma campanha pronta para Instagram, TikTok e Google Ads.\"** |
+-------------------------------------------------------------------------+

Diferenciais do produto:

-   **Zero fricção ---** Entrada mínima: apenas uma imagem + poucas informações de contexto

-   **Pronto para usar ---** Outputs prontos para copiar e colar em cada plataforma

-   **Multi-canal ---** Instagram, TikTok e Google Ads em um único fluxo

-   **Transparência ---** A chave de API é do próprio usuário --- sem custos ocultos

**5. Funcionalidades do MVP**

**5.1 Inputs do Usuário**

  -------------------------------- -------------------------------------------------------- ---------------------
  **Campo**                        **Descrição**                                            **Obrigatoriedade**
  **Imagem do produto**            Upload de foto JPG/PNG do produto que será anunciado     **Obrigatório**
  **Nome do produto**              Ex: Tênis Air Run Pro                                    **Obrigatório**
  **Diferencial / destaque**       Ex: edição limitada, 40% de desconto, vegano             **Opcional**
  **Tom da comunicação**           Opções: Divertido · Sofisticado · Urgente · Inspirador   **Opcional**
  **Público-alvo**                 Ex: mulheres 25-35 anos, atletas amadores                **Opcional**
  **API Key (OpenAI ou Claude)**   Inserida pelo usuário, não armazenada                    **Obrigatório**
  -------------------------------- -------------------------------------------------------- ---------------------

**5.2 Outputs por Canal**

+------------------+----------------------------------------------------------------------+
| **Canal**        | **Conteúdo gerado**                                                  |
+------------------+----------------------------------------------------------------------+
| **📸 Instagram**  | -   Legenda completa para post de feed (tom ajustado conforme input) |
|                  |                                                                      |
|                  | -   Sugestão de texto para Stories (curto, direto)                   |
|                  |                                                                      |
|                  | -   Bloco de hashtags relevantes (10--15 tags)                       |
|                  |                                                                      |
|                  | -   Sugestão de formato: feed, Stories, Reels ou Carrossel           |
+------------------+----------------------------------------------------------------------+
| **🎵 TikTok**     | -   Hook de abertura (primeiros 3 segundos --- frase de impacto)     |
|                  |                                                                      |
|                  | -   Roteiro completo de 15--30 segundos (narração ou legenda)        |
|                  |                                                                      |
|                  | -   Call-to-action final                                             |
|                  |                                                                      |
|                  | -   Hashtags e sugestão de trilha/tendência                          |
+------------------+----------------------------------------------------------------------+
| **🔍 Google Ads** | -   Headline principal (até 30 caracteres)                           |
|                  |                                                                      |
|                  | -   2 Headlines alternativos                                         |
|                  |                                                                      |
|                  | -   Descrição (até 90 caracteres)                                    |
|                  |                                                                      |
|                  | -   Call-to-action sugerido                                          |
+------------------+----------------------------------------------------------------------+

**5.3 Fluxo do Usuário**

  -------- --------------------------------- ------------------------------------------------------------------------
  **\#**   **Etapa**                         **Descrição**
  **1**    **Abertura da ferramenta**        Usuário acessa a página web (HTML estático, sem login)
  **2**    **Configuração da API Key**       Insere a chave da OpenAI ou Anthropic Claude no campo indicado
  **3**    **Upload da imagem**              Arrasta ou seleciona a foto do produto
  **4**    **Preenchimento do contexto**     Informa nome do produto e campos opcionais (diferencial, tom, público)
  **5**    **Geração da campanha**           Clica em \"Gerar Campanha\" --- IA processa e exibe loading de \~5s
  **6**    **Visualização dos resultados**   Recebe os outputs organizados por aba: Instagram / TikTok / Google Ads
  **7**    **Cópia e uso**                   Clica no botão \"Copiar\" de cada bloco e usa nas plataformas
  -------- --------------------------------- ------------------------------------------------------------------------

**6. Fora do Escopo (MVP)**

Para manter o foco e viabilizar a entrega em tempo reduzido, os itens abaixo ficam fora do MVP:

-   Login, cadastro ou autenticação de usuários

-   Armazenamento de histórico de campanhas geradas

-   Edição inline dos outputs gerados pela IA

-   Integração direta com APIs das plataformas (publicação automática)

-   Geração de imagens ou vídeos pelo sistema

-   Suporte a múltiplos idiomas

-   Versão mobile nativa (app iOS/Android)

-   Análise de performance das campanhas publicadas

**7. Critérios de Sucesso do MVP**

O MVP será considerado bem-sucedido se:

-   A ferramenta gera outputs para os 3 canais a partir de qualquer imagem de produto

-   O conteúdo gerado é coerente com o produto da imagem e o contexto informado

-   O fluxo completo (upload → geração → cópia) funciona em menos de 60 segundos

-   Um usuário sem conhecimento técnico consegue usar a ferramenta sem instruções

-   O código é publicado no GitHub com documentação mínima de uso (README)

**8. Próximos Passos**

-   **1.** Definição da arquitetura técnica do MVP (módulos, dependências e fluxo de dados)

+-------------------------------------------------------------+
| **miniLab1**                                                |
|                                                             |
| Documento de requisitos de produto · Versão 1.0 · Maio 2026 |
+-------------------------------------------------------------+

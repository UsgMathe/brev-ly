# Arquitetura do Repositório Brev.ly

## Visão Arquitetural

Brev.ly é um projeto de encurtador de links com frontend React e backend Fastify. A arquitetura usa PostgreSQL como banco de dados, Drizzle ORM para mapeamento objeto-relacional, Zod para validação de esquemas, e AWS SDK S3 para armazenamento de arquivos. As dependências principais são:

- **Backend (node_server):**
  - `drizzle-orm@0.45.1` — ORM para PostgreSQL (confirmado via `server/package.json`)
  - `fastify@5.6.2` — framework backend (confirmado via `server/src/http/server.ts`)
  - `zod@4.2.0` — validação de esquemas (confirmado via `server/src/app/services/create-link.service.ts`)
  - `uuidv7@1.1.0` — geração de UUIDs (confirmado via `server/src/db/schemas/links.ts`)

- **Frontend (node_web):**
  - `react@19.1.1` — framework frontend (confirmado via `web/package.json`)
  - `@tanstack/react-query@5.90.12` — gerenciamento de estado e busca de dados (confirmado via `web/src/services/links/links.queries.ts`)
  - `tailwindcss@4.1.17` — framework CSS (confirmado via `web/package.json`)

## Entrypoints Confirmados

- **Backend (`server/src/http/server.ts`):** Inicializa o servidor Fastify com rotas registradas.
- **Frontend (`web/src/main.tsx`):** Inicializa o React Router com as rotas `/` e `/:slug`.

## Módulos Principais

- **Backend API (`server/src/http/routes`, `server/src/app/services`):**
  - Responsabilidade: Gerencia operações CRUD de links, contagem de acessos e exportação.
  - Arquivos representativos:
    - `create-link.route.ts`
    - `delete-link.route.ts`
    - `get-links.route.ts`

- **Frontend UI (`web/src/components`, `web/src/pages`):**
  - Responsabilidade: Exibe links e interage com a API usando componentes React e hooks.
  - Arquivos representativos:
    - `link-card.tsx`
    - `home.page.tsx`

- **Database (`server/src/db/schemas`, `server/src/db/migrations`):**
  - Responsabilidade: Armazena dados de links usando Drizzle ORM e PostgreSQL.
  - Arquivos representativos:
    - `links.ts`
    - `index.ts`

## Rotas e API Surface

- **POST /links:** Cria um novo link com validação de esquemas Zod.
- **GET /links/id/:id:** Busca um link por ID.
- **DELETE /links/:id:** Deleta um link por ID.
- **POST /links/:id/access-count:** Incrementa a contagem de acessos de um link.
- **GET /links:** Lista links com paginação.
- **GET /links/slug/:slug:** Busca um link por slug.
- **POST /links/export:** Exporta dados de links em formato CSV.

## Relações Estruturais

- **Backend (`server/src/app/services/create-link.service.ts`):** Importa `db` e `schema` para interagir com o banco de dados.
- **Frontend (`web/src/components/link-card.tsx`):** Importa componentes UI como `Button` e `Toast`.

## Arquivos Mais Relevantes

- **server/src/http/routes/create-link.route.ts:** Define a rota POST /links com validação de esquemas Zod.
- **server/src/db/schemas/links.ts:** Define o schema do banco de dados para links.
- **web/src/main.tsx:** Ponto de entrada do React, inicializa o BrowserRouter.
- **server/src/app/services/create-link.service.ts:** Serviço de criação de links que interage com o banco de dados.

## Padrões de Nomeação e Organização

- **Route files:** Seguem o padrão `*.route.ts` (e.g., `create-link.route.ts`).
- **Service files:** Seguem o padrão `*.service.ts` (e.g., `create-link.service.ts`).
- **Schema files:** Definem tabelas do banco de dados com Drizzle ORM (e.g., `links.ts`).
- **Frontend components:** Usam o padrão `*.component.tsx` (e.g., `link-card.tsx`).
- **API routes:** São prefixadas com `/links` e usam convenções RESTful.

## Scripts e Ambiente

- **Scripts Backend (`server/package.json`):**
  - `dev`: `tsx watch --env-file .env src/http/server.ts`
  - `build`: `tsc -p tsconfig.json`
  - `start`: `node index.js`
  - `db:generate`: `drizzle-kit generate`
  - `db:migrate`: `drizzle-kit migrate`
  - `db:studio`: `drizzle-kit studio`

- **Scripts Frontend (`web/package.json`):**
  - `dev`: `vite --host`
  - `build`: `tsc -b && vite build`
  - `lint`: `eslint .`
  - `preview`: `vite preview`

- **Variáveis de Ambiente Backend (`server/package.json`):**
  - `VITE_BACKEND_URL`

- **Variáveis de Ambiente Frontend (`web/package.json`):**
  - Não confirmado a partir do contexto analisado.

## Riscos e Incertezas

- **Ausência de testes:** Não há arquivos de teste observados.
- **Ausência de CI:** Não há configurações de CI encontradas.
- **Autenticação não confirmada:** Não há evidências de um mecanismo de autenticação.
- **Exportação de dados não especificada:** O formato e o uso detalhado da exportação de dados não são totalmente claros.
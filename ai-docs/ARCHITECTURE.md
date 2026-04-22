# Arquitetura do Repositório Brev.ly

## Visão Geral do Projeto

Brev.ly é uma aplicação fullstack para encurtamento de URLs, composta por um backend em Fastify e um frontend em React. O backend expõe rotas REST como POST /links para criação, GET /links para listagem, GET /links/slug/:slug e GET /links/id/:id para busca, DELETE /links/:id para exclusão, POST /links/export para exportação e POST /links/:id/access-count para contagem de acessos. O frontend utiliza React Router com rotas / e /:slug para redirecionamento. A persistência é gerenciada via Drizzle ORM com PostgreSQL.

## Estrutura de Módulos

O projeto está organizado em dois principais módulos: Backend API e Frontend UI.

- **Backend API** (`server/src/http/routes`, `server/src/app/services`): Gerencia rotas HTTP e lógica de negócios para manipulação de links. Inclui serviços como criação, busca, exclusão e exportação de links.

- **Frontend UI** (`web/src/components`, `web/src/pages`): Componente de interface e ponto de entrada da aplicação web. Gerencia a exibição de links com ações de copiar e excluir.

## Arquivos Mais Relevantes

- **Entrypoint Backend** (`server/src/http/server.ts`): Inicializa o servidor Fastify com as rotas definidas.

- **Entrypoint Frontend** (`web/src/main.tsx`): Configura e renderiza a aplicação React com rotas utilizando React Router.

- **Schema de Links** (`server/src/db/schemas/links.ts`): Define o schema de dados para links no banco de dados PostgreSQL.

## Rotas/API

As rotas confirmadas são:

- POST /links — Cria um novo link encurtado.
- GET /links — Lista todos os links encurtados.
- GET /links/slug/:slug — Busca um link por slug.
- GET /links/id/:id — Busca um link por ID.
- POST /links/export — Exporta links para um arquivo CSV.
- DELETE /links/:id — Exclui um link pelo ID.
- POST /links/:id/access-count — Incrementa a contagem de acessos a um link.

## Frontend/UI

- **Componente LinkCard** (`web/src/components/link-card.tsx`): Exibe links com ações de copiar e excluir.

- **Página Inicial** (`web/src/pages/home.page.tsx`): Página principal onde os usuários podem inserir URLs longas para encurtamento.

- **Redirecionamento** (`web/src/main.tsx`): Configura rotas para redirecionamento de links encurtados.

## Banco de Dados

- **Schema de Links** (`server/src/db/schemas/links.ts`): Define o modelo de dados para links, incluindo campos como `id`, `targetUrl`, `slug`, `accessCount` e `createdAt`.

## Padrões Arquiteturais

- **Separação de Responsabilidades**: As rotas HTTP estão separadas dos serviços de lógica de negócios, seguindo o padrão `*.route.ts` e `*.service.ts`.

- **Camadas**: O backend segue uma camada de roteamento (`server/src/http/routes`) e uma camada de serviço (`server/src/app/services`).

- **Comunicação entre Módulos**: O frontend comunica-se com o backend através de requisições HTTP, utilizando Axios.

## Scripts e Ambiente

- **Scripts Backend** (`server/package.json`):
  - `dev`: Executa o servidor em modo de desenvolvimento.
  - `build`: Compila o código TypeScript para JavaScript.
  - `start`: Inicia o servidor compilado.
  - `db:generate`: Gera migrações do banco de dados.
  - `db:migrate`: Aplica as migrações ao banco de dados.
  - `db:studio`: Abre o Drizzle Studio para gerenciamento do banco de dados.

- **Scripts Frontend** (`web/package.json`):
  - `dev`: Inicia o servidor de desenvolvimento Vite.
  - `build`: Compila a aplicação React e gera arquivos estáticos.
  - `lint`: Executa ESLint para verificar o código.
  - `preview`: Serve a aplicação compilada localmente.

## Riscos e Incertezas

- **Segurança de Rotas**: Ausência de validação de autenticação em rotas sensíveis, o que pode expor operações não autorizadas.

- **Gerenciamento de Estado**: Dependência de React Query sem evidência de cache global, o que pode afetar a performance e a consistência dos dados.
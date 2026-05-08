# Arquitetura do Repositório Brev.ly

## Visão Geral do Projeto

Brev.ly é um encurtador de links fullstack desenvolvido com Fastify como backend e React como frontend. O projeto permite aos usuários criar, gerenciar e compartilhar links curtos a partir de URLs longas. As principais funcionalidades incluem criação de links, listagem de links, exclusão de links, exportação de links e redirecionamento via slug.

## Estrutura de Módulos

O projeto está organizado em duas partes principais: backend (server) e frontend (web).

- **Backend API** (`server/src/http/routes` e `server/src/app/services`): Gerencia rotas HTTP e lógica de negócios para manipulação de links. Inclui serviços como criação, listagem, exclusão e exportação de links.

- **Frontend UI** (`web/src/components` e `web/src/pages`): Componente de interface do usuário para exibição e interação com links. Inclui páginas como Home e Redirect, além de componentes como LinkCard para exibir e copiar links.

## Rotas/API

As rotas HTTP confirmadas são:

- **POST /links**: Cria um novo link curto.
- **GET /links**: Lista todos os links encurtados.
- **GET /links/slug/:slug**: Redireciona para a URL original com base no slug do link curto.
- **GET /links/id/:id**: Obtém detalhes de um link específico pelo ID.
- **POST /links/export**: Exporta uma lista de links encurtados em formato CSV.
- **DELETE /links/:id**: Exclui um link específico pelo ID.

## Frontend/UI

O frontend é desenvolvido com React e utiliza componentes como LinkCard para exibir e interagir com links. As páginas principais incluem Home e Redirect, onde o usuário pode criar novos links e visualizar seus links existentes.

## Banco de Dados

O projeto usa Drizzle ORM com PostgreSQL para persistência de dados. O esquema do banco de dados está definido em `server/src/db/schemas/links.ts`, onde os campos observados incluem `id`, `targetUrl`, `slug`, `accessCount` e `createdAt`. As migrações do banco de dados estão localizadas em `server/src/db/migrations`.

## Padrões Arquiteturais

O projeto segue uma arquitetura clara com separação de responsabilidades:

- **Backend**: Gerencia rotas HTTP e lógica de negócios em `server/src/http/routes` e `server/src/app/services`.
- **Frontend**: Gerencia a interface do usuário em `web/src/components` e `web/src/pages`.
- **Banco de Dados**: Define esquemas e migrações em `server/src/db/schemas` e `server/src/db/migrations`.

## Scripts e Ambiente

Os scripts de desenvolvimento estão definidos nos arquivos `package.json` do backend (`server/package.json`) e frontend (`web/package.json`).

**Backend Scripts**:
- **dev**: Inicia o servidor em modo de desenvolvimento.
- **build**: Compila o código para produção.
- **start**: Executa o servidor compilado.
- **db:generate**: Gera esquemas do banco de dados.
- **db:migrate**: Aplica migrações do banco de dados.
- **db:studio**: Abre a interface do Drizzle ORM Studio.

**Frontend Scripts**:
- **dev**: Inicia o servidor de desenvolvimento com Vite.
- **build**: Compila o código para produção.
- **lint**: Executa ESLint no projeto.
- **preview**: Serve o build em modo de visualização.

## Riscos e Incertezas

- **Segurança de Rotas**: As rotas expostas não possuem evidência clara de autenticação ou validação, o que pode representar um risco de segurança.

- **Gerenciamento de Estado**: O frontend depende do React Query para gerenciamento de estado e requisições, mas a configuração visível de cache ou revalidação não foi confirmada.
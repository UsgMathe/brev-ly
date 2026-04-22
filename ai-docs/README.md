# Brev.ly - Sistema de Encurtador de Links

## Visão geral do projeto

Brev.ly é um sistema de encurtador de links que permite aos usuários criar, gerenciar e rastrear URLs curtos. Os usuários podem criar links com slugs personalizados, visualizar e excluir seus links, e exportar dados de link. O sistema também rastreia a contagem de acessos para cada link.

## Stack tecnológica confirmada

**Backend (Node.js):**
- Fastify v5.6.2
- Zod v4.2.0
- Drizzle ORM v0.45.1
- PostgreSQL v3.4.7
- UUIDv7 v1.1.0

**Frontend (React):**
- React v19.1.1
- React Router v7.11.0
- TanStack Query v5.90.12
- Tailwind CSS v4.1.17
- Axios v1.13.2
- Sonner v2.0.7

## Superfície funcional principal

**Endpoints HTTP:**
- **POST /links**: Cria um novo link com slug personalizado.
- **GET /links/id/:id**: Obtém detalhes de um link por ID.
- **DELETE /links/:id**: Exclui um link por ID.
- **POST /links/:id/access-count**: Incrementa a contagem de acessos de um link.
- **GET /links**: Lista todos os links.
- **GET /links/slug/:slug**: Obtém detalhes de um link por slug.
- **POST /links/export**: Exporta dados de link em formato CSV.

**Páginas SPA:**
- Home Page: Exibe a lista de links e permite criar novos links.
- Redirect Page: Redireciona para o URL original do link curto.

## Arquivos importantes e por onde começar

**Backend:**
- **server/src/http/routes/create-link.route.ts**: Define a rota para criar links.
- **server/src/db/schemas/links.ts**: Define o esquema de banco de dados para links.

**Frontend:**
- **web/src/main.tsx**: Ponto de entrada da aplicação React, configurando as rotas.
- **web/src/components/link-card.tsx**: Componente UI para exibir detalhes dos links.

## Organização visível do repositório

**Backend:**
- **server/src/http/routes/**: Rotas HTTP.
- **server/src/app/services/**: Serviços de aplicação.
- **server/src/db/schemas/**: Esquemas de banco de dados.

**Frontend:**
- **web/src/components/**: Componentes UI.
- **web/src/pages/**: Páginas da aplicação.

## Notas sobre desenvolvimento local

**Scripts de Desenvolvimento:**
- `pnpm run dev`: Inicia o servidor de desenvolvimento.
- `pnpm run build`: Compila a aplicação para produção.
- `pnpm run start`: Inicia a aplicação compilada.

**Banco de Dados:**
- `pnpm run db:generate`: Gera esquemas do banco de dados.
- `pnpm run db:migrate`: Aplica migrações do banco de dados.
- `pnpm run db:studio`: Abre o Drizzle Studio para gerenciamento do banco de dados.

**Variáveis de Ambiente:**
- **VITE_BACKEND_URL**: URL base do backend.

## Lacunas e limitações conhecidas

- Autenticação: O sistema não possui mecanismo de autenticação definido.
- Workflow de slugs: A geração e validação de slugs não estão completamente claros.
- Exportação de dados: Os detalhes do formato de exportação e seu uso não estão totalmente especificados.
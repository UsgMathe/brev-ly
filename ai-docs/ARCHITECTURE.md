# Arquitetura do Repositório Brev.ly

## Visão Geral do Projeto

Brev.ly é um encurtador de links fullstack desenvolvido com Fastify como backend e React como frontend. O projeto permite que usuários criem, gerenciem e compartilhem links curtos de forma eficiente. As principais funcionalidades incluem a criação de links, listagem de links, exclusão de links, redirecionamento de URLs, exportação de relatórios e rastreamento de acessos.

## Estrutura de Módulos

O projeto está organizado em duas partes principais: backend (`server/`) e frontend (`web/`). Cada parte tem sua própria estrutura de diretórios e arquivos.

- **Backend (`server/`)**:
  - `src/app/services/*`: Contém serviços de negócios, como criação, exclusão e busca de links.
  - `src/http/routes/*`: Define as rotas HTTP para operações de links.
  - `src/db/schemas/*`: Define os schemas do banco de dados usando Drizzle ORM.

- **Frontend (`web/`)**:
  - `src/components/*`: Componentes de interface do usuário, como LinkCard e botões.
  - `src/pages/*`: Páginas da aplicação, como a página inicial e a página de redirecionamento.
  - `src/services/links/*`: Lógica de negócios para interações com links.

## Arquivos Mais Relevantes

- **Entrypoint Backend (`server/src/http/server.ts`)**: Inicializa o servidor Fastify e configura as rotas HTTP.
- **Entrypoint Frontend (`web/src/main.tsx`)**: Inicializa a aplicação React com React Router e os provedores de estado.
- **Serviço de Criação de Links (`server/src/app/services/create-link.service.ts`)**: Lógica para criar links, interagindo com o banco de dados via Drizzle ORM.
- **Componente LinkCard (`web/src/components/link-card.tsx`)**: Componente UI para exibir e gerenciar links encurtados.

## Rotas/API

O backend expõe as seguintes rotas HTTP:

- **POST /links**: Cria um novo link.
- **DELETE /links/:id**: Exclui um link pelo ID.
- **POST /links/:id/access-count**: Incrementa a contagem de acessos a um link.
- **GET /links**: Lista todos os links com paginação.
- **GET /links/slug/:slug**: Redireciona para o link original usando o slug.
- **GET /links/id/:id**: Retorna detalhes de um link pelo ID.
- **POST /links/export**: Exporta relatórios de links em formato CSV.

## Frontend/UI

O frontend é desenvolvido com React e utiliza componentes como LinkCard para exibir e gerenciar links encurtados. As páginas principais incluem a página inicial (`HomePage`) e a página de redirecionamento (`RedirectPage`).

## Banco de Dados

O banco de dados usado é PostgreSQL, acessado via Drizzle ORM. O schema principal está definido em `server/src/db/schemas/links.ts`, que inclui campos como `id`, `targetUrl`, `slug`, `accessCount` e `createdAt`.

## Padrões Arquiteturais

- **Separação de Responsabilidades**: O backend e frontend estão separados em diretórios distintos (`server/` e `web/`).
- **Camadas**: O backend segue uma camada de serviços (`app/services`) e rotas (`http/routes`), enquanto o frontend tem componentes (`components`) e páginas (`pages`).
- **Comunicação entre Módulos**: A comunicação entre o backend e frontend ocorre via API RESTful, com validação de schemas usando Zod.

## Scripts e Ambiente

- **Scripts Backend (`server/package.json`)**:
  - `dev`: Inicia o servidor em modo de desenvolvimento.
  - `build`: Compila o código TypeScript para JavaScript.
  - `start`: Executa o servidor compilado.
  - `db:generate`, `db:migrate`, `db:studio`: Comandos para gerenciar e inspecionar o banco de dados.

- **Scripts Frontend (`web/package.json`)**:
  - `dev`: Inicia a aplicação em modo de desenvolvimento com Vite.
  - `build`: Compila a aplicação para produção.
  - `lint`: Executa ESLint para verificar o código.
  - `preview`: Serve a aplicação compilada.

## Riscos e Incertezas

- **Integração Frontend-Backend**: Ausência de testes e CI/CD pode levar a problemas na integração entre as partes.
- **Segurança de Rotas**: Rotas expostas sem evidência de autenticação podem ser vulneráveis a acessos não autorizados.
# Guia Prático de Manutenção para o Repositório Brev.ly

## Mapa do Repositório

O repositório Brev.ly está organizado em dois principais módulos: Backend API e Frontend UI.

- **Backend API** (`server/src/http/routes`, `server/src/app/services`): Gerencia rotas HTTP e lógica de negócios para manipulação de links. Inclui serviços como criação, busca, exclusão e exportação de links.

- **Frontend UI** (`web/src/components`, `web/src/pages`): Componente de interface e ponto de entrada da aplicação web. Gerencia a exibição de links com ações de copiar e excluir.

## Tarefas de Manutenção Comuns

- **Adicionar um novo endpoint**: Para adicionar um novo endpoint, siga o padrão de `server/src/http/routes/*.route.ts`. Por exemplo, para adicionar uma rota POST /links/new, crie um arquivo `new-link.route.ts` seguindo o padrão observado nos outros arquivos de rotas.

- **Adicionar um novo serviço**: Para adicionar um novo serviço, siga o padrão de `server/src/app/services/*.service.ts`. Por exemplo, para adicionar um serviço de atualização de links, crie um arquivo `update-link.service.ts` seguindo o padrão observado nos outros arquivos de serviços.

- **Adicionar uma nova página**: Para adicionar uma nova página no frontend, siga o padrão de `web/src/pages/*.page.tsx`. Por exemplo, para adicionar uma página de configurações, crie um arquivo `settings.page.tsx` seguindo o padrão observado nas outras páginas.

- **Adicionar um novo componente**: Para adicionar um novo componente no frontend, siga o padrão de `web/src/components/*.tsx`. Por exemplo, para adicionar um componente de notificação, crie um arquivo `notification.tsx` seguindo o padrão observado nos outros componentes.

## Arquivos Essenciais para Inspecionar Antes de Alterações

- **Entrypoint Backend** (`server/src/http/server.ts`): Inicializa o servidor Fastify com as rotas definidas.

- **Entrypoint Frontend** (`web/src/main.tsx`): Configura e renderiza a aplicação React com rotas utilizando React Router.

- **Schema de Links** (`server/src/db/schemas/links.ts`): Define o schema de dados para links no banco de dados PostgreSQL.

## Padrões Observados de Nomeação e Organização

- **Prefixos consistentes**: Prefixos como 'createLink', 'getLinkBySlug' indicam padronização.

- **Uso de 'service' e 'route'**: Separando preocupações de lógica e HTTP, onde arquivos de rotas seguem o padrão `*.route.ts` (ex: `server/src/http/routes/create-link.route.ts`) e arquivos de serviço seguem o padrão `*.service.ts` (ex: `server/src/app/services/create-link.service.ts`).

- **Estrutura de diretórios**: A estrutura de diretórios está separada entre 'server' e 'web', com subdiretórios como 'http/routes' e 'app/services' indicando a separação de responsabilidades.

## Áreas Sensíveis e Pontos de Acoplamento

- **Segurança de rotas**: Ausência de validação de autenticação em rotas sensíveis, o que pode expor operações não autorizadas.

- **Gerenciamento de estado**: Dependência de React Query sem evidência de cache global, o que pode afetar a performance e a consistência dos dados.

## Scripts e Variáveis de Ambiente

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

- **Variáveis de Ambiente** (`web/.env.example`):
  - `VITE_BACKEND_URL`: URL do backend, usada no frontend para fazer requisições HTTP.

## O Que Ainda Está Incerto

- Não há evidência clara de autenticação ou controle de acesso aos links.

- Não está claro se há validação de URLs ou restrições de uso.

- Não há evidência de estatísticas avançadas além do accessCount.
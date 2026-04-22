# Guia Operacional para Brev.ly

## Visão Geral do Projeto

Brev.ly é um encurtador de links simples e eficiente, desenvolvido para transformar URLs longas em links curtos e fáceis de compartilhar. O projeto utiliza Fastify como servidor backend e React para o frontend. O banco de dados utilizado é PostgreSQL, com Drizzle ORM para interação. A aplicação permite criar, listar, excluir, redirecionar e exportar links encurtados.

## Ordem de Leitura Obrigatória

Leia `server/src/http/server.ts` primeiro — ele inicializa o servidor Fastify com as rotas definidas, configurando o backend. Em seguida, leia `web/src/main.tsx` — ele inicializa a aplicação React com React Router e os provedores de estado necessários para o frontend.

## Superfície Existente Confirmada

- **Backend Services**: Localizados em `server/src/app/services/`, incluindo `create-link.service.ts`, `export-links.service.ts`, entre outros. Esses arquivos contêm a lógica de negócios para manipulação de links.
- **Frontend UI Components**: Localizados em `web/src/components/`, incluindo `link-card.tsx`, `button.tsx`, entre outros. Esses arquivos definem os componentes de interface do usuário.
- **API Routes**: Localizados em `server/src/http/routes/`, incluindo `create-link.route.ts`, `get-links.route.ts`, entre outros. Esses arquivos definem as rotas HTTP para operações de links.

## Superfície Funcional

- **Rotas Backend**: 
  - `POST /links` — Cria um novo link encurtado.
  - `DELETE /links/:id` — Exclui um link encurtado pelo ID.
  - `POST /links/:id/access-count` — Incrementa a contagem de acessos a um link encurtado.
  - `GET /links` — Lista todos os links encurtados criados pelo usuário.
  - `GET /links/slug/:slug` — Redireciona para o URL original com base no slug do link encurtado.
  - `GET /links/id/:id` — Retorna informações de um link encurtado pelo ID.
  - `POST /links/export` — Exporta links em formato CSV.

## Regras de Localização de Novo Código

- **Backend Services**: Adicione novos serviços em `server/src/app/services/` seguindo o padrão `*.service.ts`.
- **Frontend UI Components**: Adicione novos componentes em `web/src/components/` seguindo o padrão `*.tsx`.
- **API Routes**: Adicione novas rotas em `server/src/http/routes/` seguindo o padrão `*.route.ts`.

## Padrões a Preservar

- **Convenções de Nomeação**: Prefixos consistentes como 'createLink', 'getLinkById' em serviços e rotas.
- **Organização de Código**: Estrutura separada entre backend (`server/`) e frontend (`web/`).
- **Validação de Schemas**: Uso de Zod para validação de schemas em rotas e serviços.

## Ambiente e Scripts

- **Variáveis de Ambiente**: Não especificadas no contexto fornecido.
- **Scripts Disponíveis**:
  - `dev`: Executa o servidor em modo de desenvolvimento.
  - `build`: Compila a aplicação para produção.
  - `start`: Inicia a aplicação compilada.
  - `db:generate`: Gera esquemas do banco de dados.
  - `db:migrate`: Aplica migrações ao banco de dados.
  - `db:studio`: Abre o Drizzle Studio para gerenciamento do banco de dados.

## Suposições Proibidas

- Não assuma a existência de autenticação ou controle de acesso nas rotas.
- Não assuma validação de URLs ou regras de negócio complexas além da criação básica de links.
- Não assuma funcionalidades avançadas como estatísticas detalhadas ou personalização de links.
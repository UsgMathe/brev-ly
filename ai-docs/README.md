# Brev.ly Onboarding Documentação

## Visão Geral do Projeto

Brev.ly é um encurtador de links simples e eficiente, desenvolvido para transformar URLs longas em links curtos e fáceis de compartilhar. Este projeto foi desenvolvido como parte da pós-graduação Pós Tech Developer 360 FTR da Faculdade de Tecnologia Rocketseat. O sistema permite que usuários criem, gerenciem e compartilhem links encurtados de forma eficiente.

## Stack Tecnológica Confirmada

- **Backend**: Fastify (versão 5.6.2), Drizzle ORM (versão 0.45.1), PostgreSQL (versão 3.4.7), Zod (versão 4.2.0)
- **Frontend**: React (versão 19.1.1), Vite, Tailwind CSS (versão 4.1.17)

## Superfície Funcional Principal

- **Backend API**:
  - `POST /links`: Cria um novo link encurtado.
  - `DELETE /links/:id`: Exclui um link encurtado pelo ID.
  - `POST /links/:id/access-count`: Incrementa a contagem de acessos a um link.
  - `GET /links`: Lista todos os links encurtados criados.
  - `GET /links/slug/:slug`: Redireciona para a URL original usando o slug do link.
  - `GET /links/id/:id`: Retorna detalhes de um link pelo ID.
  - `POST /links/export`: Exporta links em formato CSV.

- **Frontend SPA**:
  - Página inicial (`/`): Permite que usuários insiram URLs longas para encurtá-las.
  - Página de redirecionamento (`/:slug`): Redireciona para a URL original ao acessar um link encurtado.

## Arquivos Importantes e Por Onde Começar

- **Backend**:
  - `server/src/http/server.ts`: Ponto de entrada do servidor Fastify.
  - `server/src/app/services/create-link.service.ts`: Lógica para criar links encurtados.
  - `server/src/http/routes/create-link.route.ts`: Rota para criar links encurtados.

- **Frontend**:
  - `web/src/main.tsx`: Ponto de entrada do frontend, inicializando React Router.
  - `web/src/components/link-card.tsx`: Componente UI para exibir e gerenciar links encurtados.

## Organização Visível do Repositório

- **Backend (`server/`)**:
  - `src/app/services/*`: Lógica de negócios.
  - `src/http/routes/*`: Rotas HTTP.

- **Frontend (`web/`)**:
  - `src/components/*`: Componentes UI.
  - `src/pages/*`: Páginas da aplicação.

## Notas sobre Desenvolvimento Local

- **Scripts**:
  - `dev`: Inicia o servidor de desenvolvimento.
  - `build`: Compila a aplicação para produção.
  - `start`: Inicia a aplicação em modo de produção.
  - `db:generate`: Gera esquemas do banco de dados.
  - `db:migrate`: Aplica migrações do banco de dados.
  - `db:studio`: Abre o Drizzle Studio para gerenciamento do banco de dados.

- **Variáveis de Ambiente**:
  - Nenhuma variável de ambiente confirmada.

## Lacunas e Limitações Conhecidas

- **Autenticação**: Ausência de autenticação ou controle de acesso nas rotas.
- **Validação de URLs**: Falta de validação de URLs além da criação básica de links.
- **Funcionalidades Avançadas**: Ausência de funcionalidades como estatísticas detalhadas ou personalização de links.
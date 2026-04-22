# Guia Prático de Manutenção para o Repositório Brev.ly

## Mapa do Repositório

O repositório Brev.ly está organizado em duas partes principais: backend (`server/`) e frontend (`web/`). Cada parte tem sua própria estrutura de diretórios e arquivos.

- **Backend (`server/`)**:
  - `src/app/services/*`: Contém serviços de negócios, como criação, exclusão e busca de links.
  - `src/http/routes/*`: Define as rotas HTTP para operações de links.
  - `src/db/schemas/*`: Define os schemas do banco de dados usando Drizzle ORM.

- **Frontend (`web/`)**:
  - `src/components/*`: Componentes de interface do usuário, como LinkCard e botões.
  - `src/pages/*`: Páginas da aplicação, como a página inicial e a página de redirecionamento.
  - `src/services/links/*`: Lógica de negócios para interações com links.

## Tarefas de Manutenção Comuns

- **Adicionar um novo serviço backend**: Para adicionar um novo serviço, siga o padrão de `server/src/app/services/create-link.service.ts`: `import { db } from "@/db"; import { schema } from "@/db/schemas"; export async function [nomeDoServico]([parametros]) { ... }`. Para adicionar uma nova rota backend, edite `server/src/http/routes` — a estrutura usa o padrão de `create-link.route.ts`.

- **Adicionar um novo componente frontend**: Para adicionar um novo componente, siga o padrão de `web/src/components/link-card.tsx`: `import { Button } from "@/components/ui/button"; export function [NomeDoComponente]({ props }) { ... }`. Para adicionar uma nova página frontend, edite `web/src/pages` — a estrutura usa o padrão de `home.page.tsx`.

## Arquivos Essenciais para Inspecionar Antes de Alterações

- **Entrypoint Backend (`server/src/http/server.ts`)**: Inicializa o servidor Fastify e configura as rotas HTTP.
- **Entrypoint Frontend (`web/src/main.tsx`)**: Inicializa a aplicação React com React Router e os provedores de estado.
- **Serviço de Criação de Links (`server/src/app/services/create-link.service.ts`)**: Lógica para criar links, interagindo com o banco de dados via Drizzle ORM.
- **Componente LinkCard (`web/src/components/link-card.tsx`)**: Componente UI para exibir e gerenciar links encurtados.

## Padrões Observados de Nomeação e Organização

- **Prefixos consistentes**: Prefixos como 'createLink', 'getLinkById' em serviços e rotas.
- **Nomes de rotas RESTful**: Rotas seguem o padrão `/links` para operações de links (ex: `POST /links`, `GET /links`).
- **Arquivos de serviço**: Seguem o padrão `*.service.ts` (ex: `server/src/app/services/create-link.service.ts`).
- **Arquivos de rotas**: Seguem o padrão `*.route.ts` (ex: `server/src/http/routes/create-link.route.ts`).
- **Componentes do frontend**: Seguem o padrão `*.page.tsx` para páginas e `*.tsx` para componentes (ex: `web/src/pages/redirect.page.tsx`).

## Áreas Sensíveis e Pontos de Acoplamento

- **Integração frontend-backend**: Ausência de testes e CI/CD pode levar a problemas na integração entre as partes.
- **Segurança de rotas**: Rotas expostas sem evidência de autenticação podem ser vulneráveis a acessos não autorizados.

## Scripts e Variáveis de Ambiente

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

## O Que Ainda Está Incerto

- Autenticação e controle de acesso nas rotas backend.
- Validação de URLs e regras de negócio complexas além da criação básica de links.
- Funcionalidades avançadas como estatísticas detalhadas ou personalização de links.
# Documentação de Onboarding para Brev.ly

## Visão Geral do Projeto

Brev.ly é um encurtador de links simples e eficiente, desenvolvido para transformar URLs longas em links curtos e fáceis de compartilhar. Este projeto foi desenvolvido como parte da pós-graduação Pós Tech Developer 360 FTR da Faculdade de Tecnologia Rocketseat. O sistema permite que usuários criem, gerenciem e compartilhem links curtos a partir de URLs longas.

## Stack Tecnológica Confirmada

- **Backend**: Fastify (versão 5.6.2)
- **Frontend**: React (versão 19.1.1)
- **ORM**: Drizzle ORM (versão 0.45.1)
- **Banco de Dados**: PostgreSQL
- **Validação de Dados**: Zod (versão 4.2.0)
- **Gerenciamento de Estado Frontend**: React Query (versão 5.90.12)

## Superfície Funcional Principal

- **Backend API**:
  - POST /links: Cria um novo link curto a partir de uma URL longa.
  - GET /links: Lista todos os links encurtados.
  - DELETE /links/:id: Exclui um link encurtado pelo ID.
  - POST /links/export: Exporta uma lista de links encurtados.
  - GET /links/slug/:slug: Redireciona para a URL original a partir do slug do link curto.

- **Frontend SPA**:
  - Página inicial: Permite que o usuário insira uma URL longa para encurtar.
  - Página de redirecionamento: Exibe a página correspondente ao slug do link curto.

## Arquivos Importantes e Por Onde Começar

- **Entrypoint Backend**: `server/src/http/server.ts`
- **Entrypoint Frontend**: `web/src/main.tsx`

**Arquivos Principais para Leitura**:
- `server/src/http/routes/create-link.route.ts`: Define a rota para criar links.
- `web/src/components/link-card.tsx`: Componente de interface do usuário para exibição e cópia de links.
- `server/src/app/services/create-link.service.ts`: Lógica de negócios para criação de links.

## Organização Visível do Repositório

- **Backend**: Localizado na pasta `server/`
- **Frontend**: Localizado na pasta `web/`

## Setup Local Passo a Passo

1. **Clone do Repositório**:
   ```bash
   git clone https://github.com/UsgMathe/brev-ly.git
   cd brev-ly
   ```

2. **Instalação de Dependências**:
   ```bash
   pnpm install
   ```

3. **Configuração das Variáveis de Ambiente**:
   Copie o arquivo `.env.example` para `.env` e configure as variáveis necessárias.
   ```bash
   cp server/.env.example server/.env
   cp web/.env.example web/.env
   ```

4. **Preparação do Banco de Dados**:
   Execute a migração do banco de dados.
   ```bash
   pnpm db:migrate
   ```

5. **Rodar em Desenvolvimento**:
   ```bash
   pnpm dev
   ```

## Scripts Disponíveis

- **Desenvolvimento**:
  - `dev`: Inicia o servidor de desenvolvimento.

- **Build**:
  - `build`: Compila o projeto para produção.

- **Banco de Dados**:
  - `db:generate`: Gera as migrações do banco de dados.
  - `db:migrate`: Executa as migrações do banco de dados.
  - `db:studio`: Abre o Drizzle Studio para gerenciamento do banco de dados.

- **Utilitários**:
  - `lint`: Roda ESLint para verificar o código.
  - `preview`: Serve a aplicação em modo preview.

## Variáveis de Ambiente

- **PORT**: Porta do servidor backend (padrão: 3000).
- **DATABASE_URL**: URL do banco de dados PostgreSQL.
- **SERVER_BASE_URL**: Base URL do servidor backend.
- **CLOUDFLARE_ACCOUNT_ID**: ID da conta Cloudflare.
- **CLOUDFLARE_ACCESS_KEY_ID**: ID da chave de acesso Cloudflare.
- **CLOUDFLARE_SECRET_ACCESS_KEY**: Chave secreta de acesso Cloudflare.
- **CLOUDFLARE_BUCKET**: Nome do bucket Cloudflare.
- **CLOUDFLARE_PUBLIC_URL**: URL pública do bucket Cloudflare.
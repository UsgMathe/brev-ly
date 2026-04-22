# Brev.ly - Onboarding Documentação

## Visão Geral do Projeto

Brev.ly é uma aplicação fullstack para encurtamento de URLs, desenvolvida como parte da pós-graduação Pós Tech Developer 360 FTR da Faculdade de Tecnologia Rocketseat. O sistema permite que usuários criem, gerenciem e compartilhem links curtos a partir de URLs longas. As principais funcionalidades incluem criar links encurtados, listar e buscar links por slug ou ID, excluir links, exportar links para um arquivo e redirecionar usuários para as URLs originais ao acessar os links encurtados.

## Stack Tecnológica Confirmada

- **Backend**: Fastify, Drizzle ORM, PostgreSQL
- **Frontend**: React, Tailwind CSS, Axios

## Superfície Funcional Principal

**Endpoints de API**:
- `POST /links`: Cria um novo link encurtado.
- `GET /links`: Lista todos os links encurtados.
- `GET /links/slug/:slug`: Busca um link por slug.
- `GET /links/id/:id`: Busca um link por ID.
- `POST /links/export`: Exporta links para um arquivo CSV.
- `DELETE /links/:id`: Exclui um link pelo ID.

**Telas/Páginas Principais**:
- **Página Inicial**: Formulário para inserir URLs longas e visualização de cards com links encurtados.
- **Redirecionamento**: Página que redireciona usuários para a URL original ao acessar um link encurtado.

## Arquivos Importantes e Por Onde Começar

- **web/src/main.tsx**: Ponto de entrada do frontend com configuração de rotas.
- **server/src/http/server.ts**: Ponto de entrada do backend com configuração das rotas HTTP.
- **server/src/db/schemas/links.ts**: Define o schema de dados para links no banco de dados.
- **web/src/components/link-card.tsx**: Componente UI para exibição de links com ações de copiar e excluir.

## Organização Visível do Repositório

- **server/**: Contém o backend da aplicação, incluindo rotas HTTP e serviços de negócios.
- **web/**: Contém o frontend da aplicação, incluindo componentes UI e páginas.

## Notas sobre Desenvolvimento Local

**Scripts**:
- `dev`: Inicia o servidor de desenvolvimento.
- `build`: Compila a aplicação para produção.
- `start`: Inicia a aplicação em modo de produção.
- `db:generate`: Gera as migrações do banco de dados.
- `db:migrate`: Aplica as migrações do banco de dados.
- `db:studio`: Abre o Drizzle Studio para gerenciamento do banco de dados.

**Variáveis de Ambiente**:
- `VITE_BACKEND_URL`: URL base do backend.
- `VITE_FRONTEND_URL`: URL base do frontend.

## Lacunas e Limitações Conhecidas

- Ausência de autenticação ou controle de acesso aos links.
- Não está claro se há validação de URLs ou restrições de uso.
- Ausência de estatísticas avançadas além do accessCount.
# Guia de Manutenção para Brev.ly

## Mapa do Repositório

O repositório está organizado em duas partes principais: backend (server) e frontend (web).

- **Backend API** (`server/src/http/routes` e `server/src/app/services`): Gerencia rotas HTTP e lógica de negócios para manipulação de links.
- **Frontend UI** (`web/src/components` e `web/src/pages`): Componente de interface do usuário para exibição e interação com links.

## Setup do Ambiente Local

Para configurar o ambiente local, siga os passos abaixo:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/UsgMathe/brev-ly.git
   cd brev-ly
   ```

2. **Instale as dependências**:
   - Para backend (server):
     ```bash
     pnpm install --filter server
     ```
   - Para frontend (web):
     ```bash
     pnpm install --filter web
     ```

3. **Configure o .env**:
   Copie `.env.example` para `.env` em ambos os diretórios `server` e `web` e preencha as variáveis de ambiente necessárias.

4. **Prepare o banco de dados**:
   - Gere esquemas do banco de dados:
     ```bash
     pnpm db:generate --filter server
     ```
   - Aplicar migrações do banco de dados:
     ```bash
     pnpm db:migrate --filter server
     ```

5. **Rodar o desenvolvimento**:
   - Para backend (server):
     ```bash
     pnpm dev --filter server
     ```
   - Para frontend (web):
     ```bash
     pnpm dev --filter web
     ```

## Tarefas de Manutenção Comuns

### Adicionar uma Nova Rota no Backend
Para adicionar uma nova rota, siga o padrão de `server/src/http/routes/create-link.route.ts`:
```typescript
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/links',
    {
      schema: {
        summary: 'Create a link',
        tags: ['links'],
        body: z.object({
          targetUrl: z.url(),
          slug: z.string()
        }),
        response: {
          201: z.object({ id: z.number() })
        },
      },
    },
    async (request, reply) => {
      // Lógica para criar link
    }
  )
}
```

### Adicionar um Novo Componente no Frontend
Para adicionar um novo componente, siga o padrão de `web/src/components/link-card.tsx`:
```typescript
import { Button } from "@/components/ui/button";
import type { Link as LinkType } from "@/services/links/links.schemas";

interface LinkCardProps { link: LinkType; }
export function LinkCard({ link }: LinkCardProps) {
  return (
    <div>
      <a href={`/${link.slug}`}>{link.targetUrl}</a>
    </div>
  );
}
```

### Adicionar um Novo Serviço no Backend
Para adicionar um novo serviço, siga o padrão de `server/src/app/services/create-link.service.ts`:
```typescript
import { db } from "@/db";
import { schema } from "@/db/schemas";

type CreateLinkInput = typeof schema.links.$inferInsert;

export async function createLink({ targetUrl, slug }: CreateLinkInput) {
  const result = await db.insert(schema.links).values({ targetUrl, slug }).returning();
  return result[0];
}
```

### Adicionar um Novo Tipo no Frontend
Para adicionar um novo tipo, siga o padrão de `web/src/api/api.types.ts`:
```typescript
export interface Link {
  id: number;
  targetUrl: string;
  slug: string;
}
```

### Adicionar uma Nova Página no Frontend
Para adicionar uma nova página, siga o padrão de `web/src/pages/home.page.tsx`:
```typescript
import { LinkCard } from '@/components/link-card';

export function HomePage() {
  return (
    <div>
      <LinkCard link={{ id: 1, targetUrl: 'https://example.com', slug: 'example' }} />
    </div>
  );
}
```

## Arquivos Essenciais para Inspecionar

- `server/src/http/routes/*.route.ts`: Rotas HTTP do backend.
- `server/src/app/services/*.service.ts`: Serviços de lógica de negócios do backend.
- `web/src/components/*.tsx`: Componentes UI do frontend.
- `web/src/pages/*.tsx`: Páginas do frontend.
- `server/src/db/schemas/*.ts`: Esquemas do banco de dados.

## Padrões Observados de Nomeação e Organização

- **Prefixos consistentes**: 'createLink', 'getLinks' em serviços e rotas.
- **Uso de 'schema' e 'service'**: Em camadas de backend.
- **Nomes de arquivos seguem padrão camelCase**.

## Áreas Sensíveis e Pontos de Acoplamento

- **Segurança de rotas**: Rotas expostas sem evidência clara de autenticação ou validação.
- **Gerenciamento de estado**: Dependência de React Query sem configuração visível de cache ou revalidação.

## Testes

Não identificado no repositório analisado.

## Scripts e Variáveis de Ambiente

**Backend**:
- **PORT**: Porta do servidor.
- **DATABASE_URL**: URL do banco de dados PostgreSQL.
- **SERVER_BASE_URL**: Base URL do servidor.

**Frontend**:
- Não identificado no repositório analisado.

## Checklist antes de Abrir PR

- Verifique se todas as rotas e serviços estão corretamente definidos.
- Certifique-se de que os componentes UI estejam funcionando conforme o esperado.
- Confira se as variáveis de ambiente necessárias estão configuradas.
- Verifique se as migrações do banco de dados foram aplicadas corretamente.

## O Que Ainda Está Incerto

- Autenticação e controle de acesso nas rotas.
- Mecanismo de armazenamento de links.
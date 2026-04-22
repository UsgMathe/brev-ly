# Guia de Manutenção para o Repositório Brev.ly

## Mapa do repositório — pastas reais com responsabilidade observada

O repositório Brev.ly está organizado em duas principais partes: backend e frontend.

- **Backend (`server`):**
  - `src/app/services`: Lógica de negócios dos serviços.
  - `src/db/schemas`: Definições do schema do banco de dados.
  - `src/http/routes`: Rotas HTTP definidas para o backend.

- **Frontend (`web`):**
  - `src/components`: Componentes React reutilizáveis.
  - `src/pages`: Páginas da aplicação.
  - `src/api`: Integração com a API backend.

## Onde alterar código para tarefas comuns

- **Adicionar nova rota/endpoint (backend):**
  - Arquivo: `server/src/http/routes/new.route.ts`
  - Padrão exato do snippet:
    ```typescript
    import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
    import { z } from 'zod'

    export const newRoute: FastifyPluginAsyncZod = async (server) => {
      server.get(
        '/new',
        {
          schema: {
            summary: 'Descrição da rota',
            tags: ['categoria'],
            response: {
              200: z.object({ message: z.string() })
                .describe('Resposta bem-sucedida'),
            },
          },
        },
        async (request, reply) => {
          // Lógica da rota
          return reply.status(200).send({ message: 'Sucesso' })
        }
      )
    }
    ```
  - Registre via `server.register()` no `server.ts`

- **Integração com API / chamadas HTTP:**
  - Arquivo: `web/src/api/index.ts`
  - Padrão de uso:
    ```typescript
    import axios from 'axios'

    export const fetchLinks = async () => {
      const response = await axios.get('/links')
      return response.data
    }
    ```

- **Componentes de interface / telas:**
  - Pasta: `web/src/components`
  - Padrão:
    ```tsx
    import React from 'react'

    export const NewComponent = () => {
      return (
        <div>
          {/* Conteúdo do componente */}
        </div>
      )
    }
    ```

- **Formulários e validação:**
  - Biblioteca confirmada: `react-hook-form` com `zod`
  - Padrão do snippet:
    ```tsx
    import { useForm } from 'react-hook-form'
    import { zodResolver } from '@hookform/resolvers/zod'
    import * as z from 'zod'

    const schema = z.object({
      name: z.string().min(1),
    })

    export const NewForm = () => {
      const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) })

      return (
        <form onSubmit={handleSubmit(data => console.log(data))}>
          <input {...register('name')} />
          <button type="submit">Enviar</button>
        </form>
      )
    }
    ```

- **Tipos e entidades de domínio:**
  - Arquivo: `server/src/db/schemas/links.ts`
  - Padrão de exportação:
    ```typescript
    import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

    export const links = pgTable('links', {
      id: text('id').primaryKey().$defaultFn(() => uuidv7()),
      targetUrl: text('target_url').notNull(),
      slug: text('slug').notNull().unique(),
      accessCount: integer('access_count').default(0).notNull(),
      createdAt: timestamp('created_at').defaultNow().notNull(),
    })

    export type Link = typeof links.$inferSelect;
    ```

- **Serviços de negócio:**
  - Padrão service+route se backend presente:
    - Service (ex: `server/src/app/services/create-link.service.ts`):
      ```typescript
      import { db } from '@/db'
      import { schema } from '@/db/schemas'

      type CreateLinkInput = typeof schema.links.$inferInsert;

      export async function createLink({ targetUrl, slug }: CreateLinkInput) {
        const result = await db.insert(schema.links).values({ targetUrl, slug }).returning();
        return result[0];
      }
      ```
    - Route (ex: `server/src/http/routes/create-link.route.ts`):
      ```typescript
      import { createLink } from '@/app/services/create-link.service'
      import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
      import { z } from 'zod'

      export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
        server.post(
          '/links',
          {
            schema: {
              body: z.object({ targetUrl: z.string(), slug: z.string() }),
              response: { 201: z.object({ message: z.string() }) },
            },
          },
          async (request, reply) => {
            const { targetUrl, slug } = request.body;
            await createLink({ targetUrl, slug });
            return reply.status(201).send({ message: 'Link criado' });
          }
        );
      }
      ```

## Arquivos essenciais para inspecionar antes de alterações

- **server/src/http/routes/create-link.route.ts:** Define a rota POST /links com validação de esquemas Zod.
- **server/src/db/schemas/links.ts:** Define o schema do banco de dados para links.
- **web/src/main.tsx:** Ponto de entrada do React, inicializa o BrowserRouter.
- **server/src/app/services/create-link.service.ts:** Serviço de criação de links que interage com o banco de dados.

## Padrões observados de nomeação e organização

- **Route files:** Seguem o padrão `*.route.ts` (e.g., `create-link.route.ts`).
- **Service files:** Seguem o padrão `*.service.ts` (e.g., `create-link.service.ts`).
- **Schema files:** Definem tabelas do banco de dados com Drizzle ORM (e.g., `links.ts`).
- **Frontend components:** Usam o padrão `*.component.tsx` (e.g., `link-card.tsx`).
- **API routes:** São prefixadas com `/links` e usam convenções RESTful.

## Áreas sensíveis e pontos de acoplamento

- **server/src/db/schemas/links.ts:** Alterações aqui afetam diretamente o banco de dados.
- **web/src/api/index.ts:** Integração com a API backend, alterações podem quebrar a comunicação frontend-backend.

## Scripts e variáveis de ambiente

- **Scripts Backend (`server/package.json`):**
  - `dev`: `tsx watch --env-file .env src/http/server.ts`
  - `build`: `tsc -p tsconfig.json`
  - `start`: `node index.js`
  - `db:generate`: `drizzle-kit generate`
  - `db:migrate`: `drizzle-kit migrate`
  - `db:studio`: `drizzle-kit studio`

- **Scripts Frontend (`web/package.json`):**
  - `dev`: `vite --host`
  - `build`: `tsc -b && vite build`
  - `lint`: `eslint .`
  - `preview`: `vite preview`

- **Variáveis de Ambiente Backend (`server/package.json`):**
  - `VITE_BACKEND_URL` → URL base da API

## O que ainda está incerto

- Autenticação não confirmada: Não há evidências de um mecanismo de autenticação.
- Exportação de dados não especificada: O formato e o uso detalhado da exportação de dados não são totalmente claros.
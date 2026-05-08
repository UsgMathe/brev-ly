# Operational Guide for Brev.ly

## 30-second Overview

Brev.ly is a URL shortener application developed as part of the Pós Tech Developer 360 FTR course at Rocketseat. It uses Fastify for the backend and React for the frontend, with PostgreSQL as the database. The project includes features like creating, listing, deleting, exporting, and redirecting links.

## Mandatory Reading Order

1. **Read `server/src/http/server.ts` first** — it initializes the Fastify HTTP server with routes and middleware.
2. **Read `web/src/main.tsx` next** — it sets up the React application with routing and providers.
3. **Read `server/src/app/services/create-link.service.ts`** — it contains the business logic for creating links.
4. **Read `web/src/components/link-card.tsx`** — it defines the UI component for displaying and interacting with links.

## Confirmed Existing Surface

- **Backend API**: Located in `server/src/http/routes/` and `server/src/app/services/`. Key files include `create-link.route.ts`, `get-links.route.ts`, etc.
- **Frontend UI**: Located in `web/src/components/` and `web/src/pages/`. Key files include `link-card.tsx`, `home.page.tsx`, etc.
- **Database Schema**: Located in `server/src/db/schemas/`. Key file is `links.ts`.

## Functional Surface

- **Backend Routes**:
  - POST `/links` — Create a link
  - GET `/links` — List all links
  - GET `/links/slug/:slug` — Get link by slug
  - DELETE `/links/:id` — Delete a link by ID
  - POST `/links/export` — Export links
- **Frontend Routes**:
  - `/` — Home page
  - `/:slug` — Redirect page

## New Code Location Rules

- **Backend API**: Create new routes in `server/src/http/routes/` following the pattern `*.route.ts`. Create new services in `server/src/app/services/` following the pattern `*.service.ts`.
- **Frontend UI**: Create new components in `web/src/components/` following the pattern `*.tsx`. Create new pages in `web/src/pages/` following the pattern `*.page.tsx`.

## Patterns to Preserve

- **File Naming**: Use prefixes like 'createLink', 'getLinks' in services and routes. Use suffixes like `*.route.ts` for routes and `*.service.ts` for services.
- **Directory Structure**: Maintain a separate structure for backend (`server`) and frontend (`web`). Use subdirectories like `http/routes`, `app/services`, `db/schemas`.

## Tests

No test files identified in analyzed context.

## Environment and Scripts

- **Backend Environment Variables**: Defined in `.env.example`.
  - `PORT`
  - `DATABASE_URL`
  - `SERVER_BASE_URL`
  - `CLOUDFLARE_ACCOUNT_ID`
  - `CLOUDFLARE_ACCESS_KEY_ID`
  - `CLOUDFLARE_SECRET_ACCESS_KEY`
  - `CLOUDFLARE_BUCKET`
  - `CLOUDFLARE_PUBLIC_URL`
- **Backend Scripts**:
  - `dev`: Start the development server
  - `build`: Build the project
  - `start`: Run the built project
  - `db:generate`: Generate database schemas
  - `db:migrate`: Migrate the database
  - `db:studio`: Open Drizzle Studio
- **Frontend Environment Variables**: Not identified in analyzed context.
- **Frontend Scripts**:
  - `dev`: Start the development server
  - `build`: Build the project
  - `lint`: Run ESLint
  - `preview`: Preview the built project

## Mandatory Pre-modification Checklist

- **Read `server/src/http/server.ts`** — understand how routes and middleware are initialized.
- **Read `web/src/main.tsx`** — understand the React application setup.
- **Verify `server/package.json`** — ensure all dependencies are correctly listed.
- **Check `web/package.json`** — ensure all frontend dependencies are correctly listed.

## Forbidden Assumptions

- Do not assume the presence of authentication mechanisms in routes or services.
- Do not assume the presence of detailed cache or revalidation configurations in React Query.
- Do not assume the presence of a specific storage mechanism for links.
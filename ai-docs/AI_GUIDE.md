# AI Operational Guide for Brev.ly

## 30-second repository snapshot

Brev.ly is a URL shortener service with a Fastify backend and React frontend. It allows users to create, manage, and track shortened links. The backend uses PostgreSQL for data storage with Drizzle ORM, and the frontend interacts with the API using TanStack Query.

## Mandatory read-first order

- **Read `web/src/main.tsx` first** — it initializes the React app with BrowserRouter and defines routes for the home page and link redirection.
- **Read `server/src/http/server.ts` next** — it mounts the Fastify server and initializes all API routes from `server/src/http/routes`.

## Confirmed existing surface

- **Backend API (server/src/http/routes)**: Contains route definitions for CRUD operations on links, including access count tracking and export functionality.
- **Frontend UI (web/src/components)**: Includes React components for displaying links and interacting with the API.
- **Database (server/src/db/schemas)**: Defines the Link schema using Drizzle ORM.

## HTTP API surface

- **POST /links**: Creates a new link with a target URL and optional slug.
- **GET /links/id/:id**: Fetches a link by its ID.
- **DELETE /links/:id**: Deletes a link by its ID.
- **POST /links/:id/access-count**: Increments the access count for a link.
- **GET /links**: Lists all links with pagination.
- **GET /links/slug/:slug**: Fetches a link by its slug.
- **POST /links/export**: Exports link data.

## Placement rules for new code

- **New service → server/src/app/services/[name].service.ts**
- **New route → server/src/http/routes/[name].route.ts**
- **New component → web/src/components/[name].tsx**

## Patterns to preserve

- **File naming patterns**: Consistent use of 'link' in file names for link-related functionality (e.g., `create-link.route.ts`, `create-link.service.ts`).
- **Service pattern**: Services receive input, interact with the database using Drizzle ORM, and return output (e.g., `server/src/app/services/create-link.service.ts`).
- **API client pattern**: Uses Axios with base URL from `VITE_BACKEND_URL` defined in `web/package.json`.

## Environment and scripts

- **Environment variables**:
  - `VITE_BACKEND_URL`: Defined in `web/package.json`.
- **NPM scripts**:
  - **Backend**: `dev`, `build`, `start`, `db:generate`, `db:migrate`, `db:studio`
  - **Frontend**: `dev`, `build`, `lint`, `preview`

## Forbidden assumptions

- Do not assume there is an authentication mechanism — the context explicitly gaps this.
- Do not assume the exact workflow for slug generation or validation — the context explicitly gaps this.
- Do not assume the export functionality's output format and usage details — the context explicitly gaps this.
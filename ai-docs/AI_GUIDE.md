# Operational Guide for Brev.ly

## 30-second Overview

Brev.ly is a fullstack URL shortener application developed using Fastify as the backend framework and React for the frontend. The project uses Drizzle ORM with PostgreSQL for database management, Zod for schema validation, and Tailwind CSS for styling. The application allows users to create, manage, and share shortened links.

## Mandatory Reading Order

1. **Read `web/src/main.tsx` first** — it initializes the frontend application with React Router configuration for navigation routes.

2. **Read `server/src/http/server.ts` next** — it initializes the Fastify server and sets up HTTP routes.

3. **Read `server/src/db/schemas/links.ts`** — it defines the database schema for links, which is crucial for understanding data models.

4. **Read `server/src/app/services/create-link.service.ts`** — it contains the business logic for creating links.

5. **Read `web/src/components/link-card.tsx`** — it initializes the UI component for displaying and managing links.

## Confirmed Existing Surface

- **Backend API**: Located in `server/src/http/routes` and `server/src/app/services`. Handles HTTP routes and business logic for link management.

- **Frontend UI**: Located in `web/src/components` and `web/src/pages`. Manages the user interface and navigation routes.

- **Database Schema**: Located in `server/src/db/schemas`. Defines models and migrations.

## Functional Surface

- **Backend Routes**:
  - POST `/links` — Create a link
  - GET `/links` — List all links
  - GET `/links/slug/:slug` — Get link by slug
  - GET `/links/id/:id` — Get link by ID
  - POST `/links/export` — Export links
  - DELETE `/links/:id` — Delete a link
  - POST `/links/:id/access-count` — Increment link access count

## New Code Location Rules

- **Backend API Routes**: Create new routes in `server/src/http/routes/` following the pattern `[operation]-link.route.ts`.

- **Frontend UI Components**: Create new components in `web/src/components/` following the pattern `[ComponentName].tsx`.

- **Database Schemas**: Define new schemas in `server/src/db/schemas/` following the pattern `[SchemaName].ts`.

## Patterns to Preserve

- **File Naming**:
  - Prefixes like `createLink`, `getLinkBySlug` indicate consistent naming.
  - Use of `service` and `route` separates concerns between business logic and HTTP handling.

- **Directory Structure**:
  - Separate directories for `server` and `web`.
  - Subdirectories like `http/routes` and `app/services` indicate separation of responsibilities.

## Environment and Scripts

- **Environment Variables**:
  - `VITE_FRONTEND_URL`
  - `VITE_BACKEND_URL`

- **Scripts**:
  - `dev`: Starts the development server.
  - `build`: Builds the project for production.
  - `start`: Runs the built application.
  - `db:generate`: Generates database migrations.
  - `db:migrate`: Applies database migrations.
  - `db:studio`: Opens Drizzle Studio.
  - `lint`: Lints the codebase.
  - `preview`: Starts a preview server.

## Forbidden Assumptions

- Do not assume authentication or access control mechanisms are in place — the context confirmed their absence.

- Do not assume advanced statistics beyond `accessCount` — the context confirmed its absence.
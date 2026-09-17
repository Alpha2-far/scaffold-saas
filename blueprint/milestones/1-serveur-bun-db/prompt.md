# Milestone 1 — Socle Serveur Bun & BDD Double Adaptateur

You are entering plan mode to plan and then build milestone 1 of the Scaffold™ SaaS Platform.

## Context & Documents de Référence Instatic

- Read `@blueprint/prd.md` for the full project architecture, data model, and engineering invariants.
- Read `@docs/server.md` for the Bun server architecture, DbClient specifications, and SQL schema.
- Read `@docs/architecture.md` for the global platform architecture and data flow.
- Base codebase: `design-os/` (React 19 + TypeScript + Tailwind v4 + Bun).
- Git repository: `https://github.com/Alpha2-far/scaffold-saas.git`.
- For milestone 1, there is no prior milestone log to read.

## Invariant Matériel & Règles d'Exécution

> [!CRITICAL]
> **Décharge Matérielle Obligatoire (Mac Local ➔ GitHub Actions)** :
> - ⛔ **NE JAMAIS exécuter** `npm run build`, `npx tsc -b`, ni de tests de charge lourds sur cette machine locale (ressources limitées).
> - ✅ **Test local léger autorisé** :
>   ```bash
>   bun run server/index.ts
>   curl -s http://localhost:3001/api/health
>   ```
> - Toute la validation de production (compilation TypeScript, bundling Vite, tests de conformité) est automatiquement exécutée sur les runners cloud **GitHub Actions** (`.github/workflows/ci.yml`) dès que le code est commité et poussé sur `origin/main`.

## Your Task

1. Plan the implementation for **only** milestone 1 as defined in the PRD. Do not build anything from later milestones.
2. Build the server architecture in `design-os/server/`:
   - `design-os/server/index.ts` : Point d'entrée serveur `Bun.serve` natif écoutant sur le port 3001 avec gestion CORS.
   - `design-os/server/db/client.ts` : Interface unifiée `DbClient` gérant le mode SQLite local (`bun:sqlite` vers `server/data/scaffold.db`) et PostgreSQL cloud (`Bun.sql` si `DATABASE_URL` est défini).
   - `design-os/server/db/migrations/001_initial_schema.sql` : Schéma relationnel complet (`users`, `projects`, `agent_sessions`, `chat_messages`, `project_capabilities`, `document_snapshots`, `security_ip_bans`, `model_configs`, `stack_configs`, `coupons`, `billing_transactions`). Inclure les stacks par défaut (Supabase, Neon, Bun, Cloudflare D1, Expo, FastAPI).
   - `design-os/server/db/migrate.ts` : Fonction `runMigrations(db: DbClient)` exécutant automatiquement les migrations DDL au démarrage du serveur.
   - `design-os/server/router.ts` : Routeur premier-match séquentiel gérant les routes d'API, OPTIONS pré-vol CORS et erreurs 404.
   - `design-os/server/handlers/health.ts` : Route `GET /api/health` renvoyant le JSON d'intégrité (`status: "ok"`, `db: "connected"`, `engine: "bun"`, `uptime`, `tables`).
   - `design-os/server/handlers/stacks.ts` : Route `GET /api/stacks` renvoyant la liste des stacks actives pour l'Agent et le frontend.
3. Verify your work against the "Done when" criteria:
   - Lance `bun run server/index.ts` en tâche de fond ou test.
   - Exécute `curl -s http://localhost:3001/api/health` et valide la réponse HTTP 200 `{ status: "ok", db: "connected" }`.
   - Effectue un git commit et push vers `Alpha2-far/scaffold-saas.git` et confirme que GitHub Actions passe au vert.
4. When complete, write a `milestone-log.md` in this folder (`blueprint/milestones/1-serveur-bun-db/milestone-log.md`) and append its content to the root [`milestones.log`](../../milestones.log). Structure it as follows:
   - **`## What's new in the app`** at the very top (concise, bulleted list of main capabilities added, readable by a non-technical reviewer).
   - `## What was built` (files created, routes, database tables, schema).
   - `## Decisions made during implementation` (architectural decisions, choices made).
   - `## Notes for Milestone 2` (information needed for the OpenRouter cascade and SSE streaming milestone).
   - `## Deviations from PRD` (deviations if any, or state none).

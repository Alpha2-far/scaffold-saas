# Milestone 1 — Socle Serveur Bun & BDD Double Adaptateur

You are entering plan mode to plan and then build milestone 1 of the Scaffold™ SaaS Platform.

---

## 🎯 1. OBJECTIF
Mettre en place le socle serveur backend ultra-rapide sous Bun (`design-os/server/`) avec double adaptateur de base de données (SQLite en dev local / PostgreSQL en production cloud), le schéma SQL relationnel initial avec pré-population des stacks dynamiques, et les points d'accès `/api/health` et `/api/stacks`.

---

## 📚 2. CONTEXTE & FICHIERS CONCERNÉS
- **Documents de référence Instatic obligatoires** :
  - `@_build_plan/prd.md` : PRD officiel, Trinité de Valeur et Section 5 (Modèle de données).
  - `@docs/server.md` : Spécification complète du serveur Bun, `DbClient`, schéma SQL et routeur.
  - `@docs/architecture.md` : Topologie globale et flux de données.
  - `@CLAUDE.md` : Directives d'ingénierie et commandes autorisées.
- **Codebase existante** : `design-os/` (React 19 + TypeScript + Tailwind v4 + Bun).
- **Dépôt Git** : `https://github.com/Alpha2-far/scaffold-saas.git`.
- **Fichiers physiques à créer dans `design-os/server/`** :
  - `server/index.ts` : Point d'entrée serveur `Bun.serve` natif écoutant sur le port 3001 avec gestion CORS.
  - `server/db/client.ts` : Interface unifiée `DbClient` gérant le mode SQLite local (`bun:sqlite` vers `server/data/scaffold.db`) et PostgreSQL cloud (`Bun.sql` si `DATABASE_URL` est défini).
  - `server/db/migrations/001_initial_schema.sql` : Schéma relationnel complet (`users`, `projects`, `agent_sessions`, `chat_messages`, `project_capabilities`, `document_snapshots`, `security_ip_bans`, `model_configs`, `stack_configs`, `coupons`, `billing_transactions`). Inclure les stacks par défaut pré-peuplées (Supabase, Neon, Bun, Cloudflare D1, Expo, FastAPI).
  - `server/db/migrate.ts` : Fonction `runMigrations(db: DbClient)` exécutant automatiquement les migrations DDL au démarrage du serveur.
  - `server/router.ts` : Routeur premier-match séquentiel gérant les routes d'API, OPTIONS pré-vol CORS et erreurs 404.
  - `server/handlers/health.ts` : Route `GET /api/health` renvoyant le JSON d'intégrité (`status: "ok"`, `db: "connected"`, `engine: "bun"`, `uptime`, `tables`).
  - `server/handlers/stacks.ts` : Route `GET /api/stacks` renvoyant la liste des stacks actives pour l'Agent et le frontend.

---

## ⛔ 3. CONTRAINTES
- **Décharge Matérielle Obligatoire** : Ne JAMAIS exécuter de builds complets (`npm run build`, `npx tsc -b`) ni de tests de charge lourds sur cette machine locale.
- **Isolation de Périmètre** : Ne pas toucher aux composants React frontend existants (`src/App.tsx`, `src/components/ThemeStudio.tsx`), ni implémenter le streaming OpenRouter (réservé au Jalon 2).
- **Zéro Dépendance Lourde** : Exploiter les primitives natives de Bun (`Bun.serve`, `bun:sqlite`, `Bun.sql`), aucun framework lourd externe.
- **Préservation Graphify** : Ne pas corrompre les fichiers de `.graphify/`.

---

## ✅ 4. CRITÈRES DE SUCCÈS & VÉRIFICATION
1. **Lancement local léger** : `bun run server/index.ts` démarre en < 50 ms sans erreur.
2. **Vérification HTTP 200** :
   - `curl -s http://localhost:3001/api/health` renvoie `{"status":"ok","db":"connected","engine":"bun",...}`.
   - `curl -s http://localhost:3001/api/stacks` renvoie le tableau JSON des stacks actives.
3. **Mise à jour du Graphe** : `npm run graphify` indexe `server/`.
4. **Consignation & Journalisation** :
   - Écrire `_build_plan/milestones/1-serveur-bun-db/milestone-log.md` avec les 4 sections requises :
     - `## What's new in the app`
     - `## What was built`
     - `## Decisions made during implementation`
     - `## Notes for Milestone 2`
   - Ajouter l'entrée dans `milestones.log` et mettre à jour `AGENT_DISPATCH.md`.
5. **Validation CI/CD Cloud** : Commit et push sur `origin/main` (`Alpha2-far/scaffold-saas.git`) avec pipeline GitHub Actions 100% vert.

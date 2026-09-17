# Milestone 2 — Passerelle OpenRouter Cascade & Flux Streaming SSE

You are entering plan mode to plan and then build milestone 2 of the Scaffold™ SaaS Platform.

## Context

- Read `@blueprint/prd.md` for the project architecture and engineering standards.
- Read previous milestone log: `@blueprint/milestones/1-serveur-bun-db/milestone-log.md` (or `@milestones.log`) to see what was built in Milestone 1.
- Base codebase: `design-os/` (React 19 + TypeScript + Bun).
- Server router: `design-os/server/router.ts`.

## Invariant Matériel & Règles d'Exécution

> [!CRITICAL]
> **Décharge Matérielle Obligatoire (Mac Local ➔ GitHub Actions)** :
> - ⛔ **NE JAMAIS exécuter** de builds complets (`npm run build`, `npx tsc -b`) sur le Mac local.
> - ✅ **Test local léger autorisé** :
>   ```bash
>   curl -N -X POST http://localhost:3001/api/projects/test/chat -H "Content-Type: application/json" -d '{"message":"Bonjour"}'
>   ```
> - Tout le contrôle de type et bundling est certifié par **GitHub Actions** lors du push git sur `main`.

## Your Task

1. Plan the implementation for **only** milestone 2 as defined in the PRD.
2. Build the AI Gateway and Streaming infrastructure in `design-os/server/`:
   - `design-os/server/ai/openrouter.ts` : Client OpenRouter avec support du streaming SSE natif et gestion de la clé `OPENROUTER_API_KEY`.
   - `design-os/server/ai/fallbackCascade.ts` : Moteur de cascade résilient basculant automatiquement en cas d'erreur 429/500/timeout à travers la liste ordonnée :
     `['anthropic/claude-3.7-sonnet', 'openai/gpt-4o', 'google/gemini-2.0-flash', 'deepseek/deepseek-r1']`.
   - `design-os/server/ai/prompts/systemAgent.ts` : Prompt d'interview exécutive intégrant le Pare-Feu de Vocabulaire §0.6 (zéro jargon, zéro commande slash, attitude naturelle, motif *recommend-then-confirm*).
   - `design-os/server/handlers/chatStream.ts` : Routeur SSE `POST /api/projects/:id/chat` écrivant les tokens vers le flux de réponse avec en-têtes `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`.
   - Enregistrer la route dans `design-os/server/router.ts`.
3. Verify your work against the "Done when" criteria:
   - Démarrer le serveur et envoyer une requête `POST /api/projects/:id/chat` avec curl.
   - Vérifier la réception continue des tokens (`data: {"token": "..."}`).
   - Simuler une erreur sur le modèle primaire et vérifier que la cascade bascule sur le modèle de secours sans rompre la connexion.
   - Commit et push vers `Alpha2-far/scaffold-saas.git`, validation par GitHub Actions.
4. When complete, write `blueprint/milestones/2-openrouter-sse/milestone-log.md` and append its content to the root [`milestones.log`](../../milestones.log):
   - **`## What's new in the app`** at the top.
   - `## What was built`.
   - `## Decisions made during implementation`.
   - `## Notes for Milestone 3`.
   - `## Deviations from PRD`.

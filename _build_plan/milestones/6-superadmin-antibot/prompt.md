# Milestone 6 — Dashboard Superadmin (`/admin`), SSE On-Demand & Anti-Bot

You are entering plan mode to plan and then build milestone 6 of the Scaffold™ SaaS Platform.

## Context

- Read `@_build_plan/prd.md` for admin requirements and defensive security model.
- Read previous milestone logs: Milestones 1 to 5 in `@_build_plan/milestones/` or `@milestones.log`.
- Codebase: `design-os/` (React 19 + Bun + SQLite / Postgres).
- Router: `design-os/server/router.ts`.

## Invariant Matériel & Règles d'Exécution

> [!CRITICAL]
> **Décharge Matérielle Obligatoire (Mac Local ➔ GitHub Actions)** :
> - ⛔ **NE JAMAIS exécuter** de bundling lourd ou d'analyses de charge sur cette machine locale.
> - ✅ **Test local léger autorisé** :
>   ```bash
>   bun test server/security
>   ```
> - Validation complète des routes d'administration et de sécurité sur **GitHub Actions**.

## Your Task

1. Plan the implementation for **only** milestone 6 as defined in the PRD.
2. Build the Superadmin Dashboard and Defensive Security:
   - `design-os/src/pages/admin/AdminDashboard.tsx` : Page protégée `/admin` (rôle `superadmin`) avec cartes de statistiques (utilisateurs actifs, sessions en cours, projets verrouillés, chiffre d'affaires cumulé).
   - `design-os/src/components/admin/AdminSessionWatcher.tsx` : Observateur de sessions SSE **On-Demand** (le flux SSE ne s'ouvre que lorsque l'administrateur clique sur une session spécifique, garantissant 0 surcharge CPU).
   - `design-os/src/components/admin/ModelManager.tsx` : Interface d'administration pour réordonner à chaud les modèles LLM OpenRouter et activer/désactiver des fallbacks.
   - `design-os/src/components/admin/StackManager.tsx` : Interface d'administration pour créer, éditer et activer de nouvelles stacks dynamiquement (ex: React 20, Next 16, Neon, etc.) avec leur description vulgarisée pour non-développeurs.
   - `design-os/server/security/honeypot.ts` : Champ piège invisible dans les formulaires d'inscription/contact ; toute complétion entraîne un bannissement IP instantané.
   - `design-os/server/security/turnstile.ts` : Validation côté serveur du token Cloudflare Turnstile anti-bot.
   - `design-os/server/security/rateLimiter.ts` : Limiteur de débit glissant par IP (ex: max 20 req/min sur les routes d'interview).
   - `design-os/server/handlers/admin.ts` : Routes API protégées `GET /api/admin/metrics`, `GET /api/admin/sessions`, `POST /api/admin/models`, et CRUD `GET/POST/PUT/DELETE /api/admin/stacks`.
3. Verify your work against the "Done when" criteria:
   - Soumettre une requête avec le champ honeypot rempli ➔ Valider la réponse HTTP 403 Forbidden et la présence de l'IP dans la table `security_ip_bans`.
   - Accéder à `/admin` en mode superadmin et visualiser les métriques temps réel.
   - Ouvrir l'observateur de session et vérifier la connexion SSE à la demande.
   - Commit et push vers `Alpha2-far/scaffold-saas.git`, validation par GitHub Actions.
4. When complete, write `_build_plan/milestones/6-superadmin-antibot/milestone-log.md` and append its content to the root [`milestones.log`](../../milestones.log):
   - **`## What's new in the app`** at the top.
   - `## What was built`.
   - `## Decisions made during implementation`.
   - `## Notes for Milestone 7`.
   - `## Deviations from PRD`.

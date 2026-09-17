# Milestone 6 — Dashboard Superadmin (`/admin`), SSE On-Demand & Anti-Bot

You are entering plan mode to plan and then build milestone 6 of the Scaffold™ SaaS Platform.

---

## 🎯 1. OBJECTIF
Déployer le tableau de bord Superadmin (`/admin`), la surveillance de sessions SSE à la demande (`AdminSessionWatcher.tsx`, 0 surcharge CPU), le gestionnaire de modèles OpenRouter (`ModelManager.tsx`), le gestionnaire de stacks dynamiques (`StackManager.tsx`), et le bouclier de sécurité défensif (honeypot anti-bot avec bannissement IP instantané, validation Cloudflare Turnstile, et rate limiting glissant).

---

## 📚 2. CONTEXTE & FICHIERS CONCERNÉS
- **Documents de référence Instatic obligatoires** :
  - `@_build_plan/prd.md` : PRD officiel, Section 8 (Dashboard Admin) et Section 9 (Sécurité & Anti-Bot).
  - `@docs/server.md` : Spécifications des routes d'administration, table `stack_configs`, et sécurité.
  - `@docs/features/security-anti-bot.md` : Modèle de sécurité défensif, honeypot et Turnstile.
  - `@CLAUDE.md` : Directives d'ingénierie et commandes autorisées.
  - `@milestones.log` : Historique des jalons 1 à 5.
- **Codebase existante** : `design-os/` (React 19 + TypeScript + Tailwind v4 + Bun).
- **Dépôt Git** : `https://github.com/Alpha2-far/scaffold-saas.git`.
- **Fichiers physiques à créer ou modifier** :
  - `src/pages/admin/AdminDashboard.tsx` : Page protégée `/admin` (rôle `superadmin`) affichant les cartes de métriques (utilisateurs actifs, sessions en cours, projets verrouillés, CA cumulé).
  - `src/components/admin/AdminSessionWatcher.tsx` : Observateur de sessions SSE **On-Demand** (le flux SSE ne s'ouvre que lorsque l'administrateur clique sur une session spécifique, garantissant 0 surcharge CPU).
  - `src/components/admin/ModelManager.tsx` : Interface d'administration pour réordonner à chaud les modèles LLM OpenRouter et activer/désactiver des fallbacks.
  - `src/components/admin/StackManager.tsx` : Interface d'administration pour créer, éditer, activer et tester les stacks logicielles dynamiquement (ex: React 20, Next 16, Neon, Supabase) avec vulgarisation non-technique.
  - `server/security/honeypot.ts` : Middleware de détection de champ piège invisible (`website_hp`) ; toute complétion entraîne un bannissement IP instantané (table `security_ip_bans`).
  - `server/security/turnstile.ts` : Validation côté serveur du token Cloudflare Turnstile anti-bot.
  - `server/security/rateLimiter.ts` : Limiteur de débit glissant par IP (ex: max 20 req/min sur les routes d'interview).
  - `server/handlers/admin.ts` : Routes API protégées `GET /api/admin/metrics`, `GET /api/admin/sessions`, `POST /api/admin/models`, et CRUD `GET/POST/PUT/DELETE /api/admin/stacks`.

---

## ⛔ 3. CONTRAINTES
- **Décharge Matérielle Obligatoire** : Ne JAMAIS exécuter de bundling lourd ou d'analyses de charge sur cette machine locale. Seul `bun test server/security` est autorisé en local.
- **Zéro Diffusion SSE Permanente en Arrière-Plan** : Aucun broadcast SSE permanent global ne doit consommer de CPU ou de bande passante ; streaming strictement à la demande à l'ouverture de l'inspecteur de session.
- **Cloisonnement RBAC Strict** : Aucune route sous `/api/admin/*` ne doit être accessible sans session superadmin validée par cookie/token sécurisé (renvoyer HTTP 401/403).
- **Préservation Graphify** : Ne pas altérer `.graphify/`.

---

## ✅ 4. CRITÈRES DE SUCCÈS & VÉRIFICATION
1. **Test local léger** :
   ```bash
   bun test server/security
   ```
   Toutes les suites de tests de sécurité (honeypot, turnstile, rate limiter) passent avec succès.
2. **Vérification Honeypot & Anti-Bot** :
   - Soumettre une requête POST avec `website_hp: "bot-data"` ➔ Valider la réponse HTTP 403 Forbidden et la présence immédiate de l'IP dans `security_ip_bans`.
3. **Vérification CRUD Stacks Dynamiques** :
   - Créer une nouvelle stack via `POST /api/admin/stacks` ➔ Vérifier qu'elle est immédiatement renvoyée par `GET /api/stacks`.
4. **Vérification Dashboard Superadmin** :
   - Accéder à `/admin` en mode superadmin et visualiser les métriques temps réel et l'observateur SSE on-demand.
5. **Consignation & Journalisation** :
   - Rédiger `_build_plan/milestones/6-superadmin-antibot/milestone-log.md` avec les sections :
     - `## What's new in the app`
     - `## What was built`
     - `## Decisions made during implementation`
     - `## Notes for Milestone 7`
     - `## Deviations from PRD`
   - Ajouter l'entrée dans `milestones.log` et mettre à jour `AGENT_DISPATCH.md`.
6. **Validation CI/CD Cloud** : Commit et push sur `origin/main` (`Alpha2-far/scaffold-saas.git`) avec pipeline GitHub Actions 100% vert.

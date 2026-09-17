# Feuille de Route d'Ingénierie : Les 7 Jalons SaaS (Synthèse BRD & Instatic)

*Date de révision : 17 septembre 2026*  
*Méthode : Synthèse BM PRD Creator (Incrémental & Visible) + Standard Instatic (< 600 lignes)*  
*Suivi d'exécution : `milestones.log`*  
*Plan de construction & Prompts : `_build_plan/`*  
*Exécution CI/CD : GitHub Actions Cloud Runner (`.github/workflows/ci.yml`)*  
*Socle de Code : `design-os/` (React 19 + TypeScript + Tailwind v4 + Bun)*  

---

## 1. Principes Directeurs & Invariants d'Exécution

### 🔒 Décharge Matérielle Obligatoire (Mac Local ➔ GitHub Actions)
- **Contrainte Matérielle** : Le Mac local ne dispose pas des ressources CPU/RAM pour les builds lourds (`tsc -b`, bundling Vite complet) ou les tests de charge.
- **Invariant CI/CD** : La machine locale est **strictement réservée à l'édition de code** et aux lancements locaux ultra-légers (`bun run server/index.ts`). Toutes les vérifications de types stricts, builds de production et tests de sécurité tournent sur les runners cloud **GitHub Actions** (`ubuntu-latest`).
- **Validation des Jalons** : Un jalon n'est validé dans [`milestones.log`](../milestones.log) que si le pipeline GitHub Actions associé est **100 % vert** sur la branche `main`.

### 💎 La Trinité de Valeur (Ce que livre chaque Jalon)
Chaque jalon contribue directement aux trois piliers fondamentaux :
1. **Le « Figma des Développeurs » & Visualisation Immédiate (WYSIWYB)** : Fonctionnalité visible à l'écran dans le navigateur avant de coder.
2. **La Structuration Logicielle & Cadrage Déterministe** : Contrats stricts, schémas Zod, Ruthless Scoping et audit 100/100.
3. **La Mémoire Souveraine du Projet & Continuité Multi-Agents (`milestones.log`)** : Journalisation atomique des livrables pour éliminer le *Context Rot* et permettre le passage fluide entre Claude Code, Cursor, Codex et Antigravity.

---

## 2. Les 7 Jalons d'Ingénierie : Spécifications, Liens Instatic & Prompts Copier-Coller

---

### 🏁 Jalon 1 : Socle Serveur Bun & BDD Double Adaptateur

*Fichier de prompt dédié : [`_build_plan/milestones/1-serveur-bun-db/prompt.md`](../_build_plan/milestones/1-serveur-bun-db/prompt.md)*

#### 📚 Documents de Référence Instatic
- [`docs/server.md`](server.md) : Spécification complète de l'architecture serveur Bun, de `DbClient`, du schéma SQL et du routeur.
- [`docs/architecture.md`](architecture.md) : Vue d'ensemble architecturale et modèle de données relationnel.
- [`docs/CONVENTIONS.md`](CONVENTIONS.md) : Conventions de nommage et standards d'ingénierie TypeScript.
- [`_build_plan/prd.md`](../_build_plan/prd.md) : PRD officiel de construction (Section 5 : Modèle de données & Milestone 1).

#### What gets built
- Serveur HTTP natif `Bun.serve` sur port 3001 avec gestion complète des en-têtes CORS.
- Adaptateur BDD unifié `DbClient` (`server/db/client.ts`) supportant SQLite local (`bun:sqlite`) et PostgreSQL cloud (`Bun.sql`).
- Schéma SQL relationnel unifié (`001_initial_schema.sql`) incluant les tables système et `stack_configs` (avec les stacks par défaut pré-peuplées : Supabase, Neon, Bun, Cloudflare D1, Expo, FastAPI).
- Runner de migration automatique synchrone au boot (`server/db/migrate.ts`).
- Route de santé `GET /api/health` renvoyant le JSON d'intégrité (`status: "ok"`, `db: "connected"`, `engine: "bun"`, `uptime`, `tables`).
- Route publique `GET /api/stacks` exposant les stacks actives pour l'Agent et le frontend.

#### What it explicitly does NOT include
- Interface de chat ou d'interview.
- Intégration des modèles LLM OpenRouter.
- Passerelle de facturation.

#### Done when
- `bun run server/index.ts` démarre en < 50 ms.
- `curl -s http://localhost:3001/api/health` renvoie HTTP 200 `{ status: "ok", db: "connected" }`.
- Commit et push validés 100% verts sur GitHub Actions (`.github/workflows/ci.yml`).

#### 📋 Prompt Copier-Coller pour l'Agent (Claude Code) :
```markdown
Tu es le Staff Engineer d'Exécution sur Scaffold™ SaaS.
Documents de référence obligatoires à lire :
- @_build_plan/prd.md
- @_build_plan/milestones/1-serveur-bun-db/prompt.md
- @docs/server.md
- @docs/architecture.md

Ta mission est d'implémenter le JALON 1 dans design-os/server/ :
1. Crée design-os/server/db/client.ts avec l'interface unifiée DbClient (SQLite bun:sqlite en local / Postgres Bun.sql en prod).
2. Crée design-os/server/db/migrations/001_initial_schema.sql (tables users, projects, agent_sessions, chat_messages, project_capabilities, document_snapshots, security_ip_bans, model_configs, stack_configs, coupons, billing_transactions).
3. Crée design-os/server/db/migrate.ts (exécution automatique des migrations SQL au boot).
4. Crée design-os/server/router.ts (routeur HTTP premier-match avec CORS).
5. Crée design-os/server/handlers/health.ts (route GET /api/health).
6. Crée design-os/server/handlers/stacks.ts (route GET /api/stacks retournant les stacks actives).
7. Crée design-os/server/index.ts (serveur Bun.serve écoutant sur le port 3001).
INVARIANT CRITIQUE : Ne lance aucun build lourd (tsc -b, npm run build) sur le Mac local. Teste uniquement avec `bun run server/index.ts` et `curl -s http://localhost:3001/api/health`.
Pousse ensuite sur GitHub et vérifie que GitHub Actions est vert.
Quand c'est terminé, écris _build_plan/milestones/1-serveur-bun-db/milestone-log.md et ajoute l'entrée correspondante dans milestones.log avec les sections : ## What's new in the app, ## What was built, ## Decisions made during implementation, ## Notes for Milestone 2.
```

---

### 🏁 Jalon 2 : Passerelle OpenRouter Cascade & Flux Streaming SSE

*Fichier de prompt dédié : [`_build_plan/milestones/2-openrouter-sse/prompt.md`](../_build_plan/milestones/2-openrouter-sse/prompt.md)*

#### 📚 Documents de Référence Instatic
- [`docs/features/openrouter-model-sync.md`](features/openrouter-model-sync.md) : Cascade de modèles LLM et tolérance de panne transparente.
- [`docs/features/agent-runtime.md`](features/agent-runtime.md) : Runtime de sessions d'agents et streaming SSE.
- [`docs/features/scaffold-agent.md`](features/scaffold-agent.md) : Comportement de l'Agent IA Scaffold et Pare-Feu de Vocabulaire §0.6.
- [`docs/features/soul.md`](features/soul.md) : Personnalité et principes d'interaction exécutive.

#### What gets built
- Client OpenRouter avec bascule automatique cascade résiliente (`claude-3.7-sonnet` ➔ `gpt-4o` ➔ `gemini-2.0-flash` ➔ `deepseek-r1`).
- Route SSE `POST /api/projects/:id/chat` servant le streaming temps réel mot par mot.
- Prompt d'interview exécutive intégrant le Pare-Feu de Vocabulaire §0.6 (zéro jargon technique, zéro slash command, motif *recommend-then-confirm*).

#### What it explicitly does NOT include
- Tiroir de paiement ou monétisation.
- Interface superadmin.

#### Done when
- Une requête curl streaming sur `/api/projects/test/chat` délivre un flux `data: {"token": "..."}` ininterrompu.
- La coupure simulée du modèle primaire bascule instantanément sur le modèle de secours sans coupure.

#### 📋 Prompt Copier-Coller pour l'Agent (Claude Code) :
```markdown
Tu es le Staff Engineer d'Exécution sur Scaffold™ SaaS.
Documents de référence obligatoires à lire :
- @_build_plan/prd.md
- @_build_plan/milestones/2-openrouter-sse/prompt.md
- @docs/features/openrouter-model-sync.md
- @docs/features/agent-runtime.md
- @docs/features/scaffold-agent.md

Ta mission est d'implémenter le JALON 2 dans design-os/server/ :
1. Crée design-os/server/ai/openrouter.ts (client streaming OpenRouter).
2. Crée design-os/server/ai/fallbackCascade.ts (cascade ordonnée Claude 3.7 -> GPT-4o -> Gemini 2.0 Flash -> DeepSeek R1).
3. Crée design-os/server/ai/prompts/systemAgent.ts (prompt d'interview exécutive naturelle, zéro jargon).
4. Crée design-os/server/handlers/chatStream.ts (endpoint POST /api/projects/:id/chat en SSE).
5. Branche la route dans design-os/server/router.ts.
INVARIANT : Zéro build lourd local. Teste avec curl streaming. Pousse sur GitHub pour validation CI/CD.
Quand c'est terminé, écris _build_plan/milestones/2-openrouter-sse/milestone-log.md et consigne dans milestones.log.
```

---

### 🏁 Jalon 3 : Interface Triptyque avec Rail 56px & Live Canvas WYSIWYB

*Fichier de prompt dédié : [`_build_plan/milestones/3-interface-triptyque-canvas/prompt.md`](../_build_plan/milestones/3-interface-triptyque-canvas/prompt.md)*

#### 📚 Documents de Référence Instatic
- [`docs/interface.md`](interface.md) : Spécification de l'interface triptyque (Rail 56px, Console 40%, Live Canvas 60%).
- [`docs/design.md`](design.md) : Système de tokens sémantiques OKLCH, contrastes AAA, 43 thèmes locaux compilés.
- [`docs/ux.md`](ux.md) : Principes d'interaction, cartes de choix *recommend-then-confirm*, suppression des commandes slash.

#### What gets built
- Rail vertical escamotable de 56 px avec navigation par icônes contextuelles (`src/components/NavigationRail.tsx`).
- Console Agent interactive (40% de largeur) connectée au flux SSE, avec cartes de choix visuelles (*recommend-then-confirm*).
- Live Canvas WYSIWYB réactif (60% de largeur) affichant en temps réel le Shell du produit client avec ses 43 thèmes locaux d'auteur.
- Éradication complète des commandes slash côté utilisateur.

#### What it explicitly does NOT include
- Facturation réelle ou paiements.
- Exportation physique d'archives ZIP.

#### Done when
- L'interface s'affiche parfaitement à 1280x800 sur Chrome sans défilement horizontal.
- Le changement de thème sur le Live Canvas applique instantanément les 12 tokens sémantiques.

#### 📋 Prompt Copier-Coller pour l'Agent (Claude Code) :
```markdown
Tu es le Staff Engineer d'Exécution sur Scaffold™ SaaS.
Documents de référence obligatoires à lire :
- @_build_plan/prd.md
- @_build_plan/milestones/3-interface-triptyque-canvas/prompt.md
- @docs/interface.md
- @docs/design.md
- @docs/ux.md

Ta mission est d'implémenter le JALON 3 dans design-os/src/ :
1. Crée design-os/src/components/NavigationRail.tsx (rail escamotable 56px).
2. Crée design-os/src/components/AgentConsole.tsx (console 40% reliée au stream SSE).
3. Crée design-os/src/components/LiveCanvas.tsx (pare-brise WYSIWYB 60% avec les 43 thèmes locaux).
4. Crée design-os/src/components/cards/RecommendationCard.tsx (cartes interactives recommend-then-confirm).
5. Orchestre le triptyque dans design-os/src/App.tsx en mode responsive 1280x800.
INVARIANT : Ne lance pas npm run build en local. Teste visuellement avec npm run dev sous Chrome. Pousse sur GitHub pour validation CI/CD.
Quand c'est terminé, écris _build_plan/milestones/3-interface-triptyque-canvas/milestone-log.md et consigne dans milestones.log.
```

---

### 🏁 Jalon 4 : Moteur de Structuration Déterministe Zod & `milestones.log` Client

*Fichier de prompt dédié : [`_build_plan/milestones/4-compilation-zod-capabilities/prompt.md`](../_build_plan/milestones/4-compilation-zod-capabilities/prompt.md)*

#### 📚 Documents de Référence Instatic
- [`docs/features/compilation-engine.md`](features/compilation-engine.md) : Compilateur déterministe, schémas Zod et assemblage des 6 documents.
- [`docs/features/export-engine.md`](features/export-engine.md) : Structure du livrable `product-plan/` et injection de `milestones.log`.
- [`docs/features/brownfield-intake.md`](features/brownfield-intake.md) : Intake des projets existants sans accès disque local.
- [`design-os/src/lib/product-health.ts`](../design-os/src/lib/product-health.ts) : Moteur d'audit et contrat de score 100/100.

#### What gets built
- Schémas Zod stricts pour les projets, entités de données, champs, relations et briques fonctionnelles.
- Compilateur déterministe générant les 6 documents de spécifications (`product-overview.md`, `data-shape.md`, `prd.md`, `product-roadmap.md`, `prompts/`, `soul.md`).
- Générateur du `milestones.log` sur-mesure pour le client (découpage atomique pour Claude Code / Cursor).
- Connexion du moteur d'audit de santé `product-health.ts` (Score 100/100 garanti).

#### What it explicitly does NOT include
- Passerelle de paiement paywall (Jalon 5).

#### Done when
- La compilation d'un projet test produit les 6 documents et le `milestones.log` client sans erreur avec score 100/100.

#### 📋 Prompt Copier-Coller pour l'Agent (Claude Code) :
```markdown
Tu es le Staff Engineer d'Exécution sur Scaffold™ SaaS.
Documents de référence obligatoires à lire :
- @_build_plan/prd.md
- @_build_plan/milestones/4-compilation-zod-capabilities/prompt.md
- @docs/features/compilation-engine.md
- @docs/features/export-engine.md
- @docs/features/brownfield-intake.md

Ta mission est d'implémenter le JALON 4 dans design-os/server/compilation/ :
1. Crée design-os/server/compilation/schema.ts (schémas Zod stricts entités et capacités).
2. Crée design-os/server/compilation/engine.ts (compilateur déterministe des 6 documents).
3. Crée design-os/server/compilation/generators/clientMilestonesLog.ts (générateur milestones.log client).
4. Implémente la capacité auth Google dans capabilities/authGoogle.ts.
5. Connecte design-os/src/lib/product-health.ts pour certifier le score 100/100.
INVARIANT : Zéro build lourd local. Teste avec bun test server/compilation. Pousse sur GitHub pour validation CI/CD.
Quand c'est terminé, écris _build_plan/milestones/4-compilation-zod-capabilities/milestone-log.md et consigne dans milestones.log.
```

---

### 🏁 Jalon 5 : Module de Paiement Géolocalisé & Modèle Steve Jobs (9 € / 6 000 FCFA)

*Fichier de prompt dédié : [`_build_plan/milestones/5-billing-geolocalise/prompt.md`](../_build_plan/milestones/5-billing-geolocalise/prompt.md)*

#### 📚 Documents de Référence Instatic
- [`docs/features/billing.md`](features/billing.md) : Détection Geo-IP, tarification géolocalisée (6 000 FCFA Mobile Money vs 9 € Cartes), contrat `PaymentProviderAdapter`, webhooks.
- [`docs/features/export-engine.md`](features/export-engine.md) : Déverrouillage après paiement et packaging `product-plan.zip`.

#### What gets built
- Détecteur Geo-IP de devise (Afrique ➔ 6 000 FCFA / Reste du monde ➔ 9 €).
- `PaymentProviderAdapter` générique avec deux adaptateurs agnostiques : `AfricaMobileMoneyAdapter` et `InternationalCardAdapter`.
- Tiroir de checkout instantané `CheckoutDrawer.tsx` au clic sur « Prendre les clés du logiciel ».
- Webhook sécurisé et idempotent déverrouillant le téléchargement de l'archive `product-plan.zip`.

#### What it explicitly does NOT include
- Abonnements récurrents d'entreprise complexes en V1.

#### Done when
- Une IP africaine affiche 6 000 FCFA et une IP occidentale affiche 9 €.
- La simulation de webhook libère instantanément le téléchargement de `product-plan.zip`.

#### 📋 Prompt Copier-Coller pour l'Agent (Claude Code) :
```markdown
Tu es le Staff Engineer d'Exécution sur Scaffold™ SaaS.
Documents de référence obligatoires à lire :
- @_build_plan/prd.md
- @_build_plan/milestones/5-billing-geolocalise/prompt.md
- @docs/features/billing.md
- @docs/features/export-engine.md

Ta mission est d'implémenter le JALON 5 dans design-os/server/billing/ et src/components/ :
1. Crée design-os/server/billing/geoIp.ts (détection 6 000 FCFA vs 9 €).
2. Crée design-os/server/billing/adapters/types.ts (interface PaymentProviderAdapter).
3. Crée design-os/server/billing/adapters/africaMobileMoney.ts et internationalCards.ts.
4. Crée design-os/src/components/CheckoutDrawer.tsx.
5. Crée design-os/server/handlers/billingWebhook.ts (libération idempotente de product-plan.zip).
INVARIANT : Zéro build lourd local. Teste avec bun test server/billing. Pousse sur GitHub pour validation CI/CD.
Quand c'est terminé, écris _build_plan/milestones/5-billing-geolocalise/milestone-log.md et consigne dans milestones.log.
```

---

### 🏁 Jalon 6 : Dashboard Superadmin (`/admin`), SSE On-Demand & Anti-Bot

*Fichier de prompt dédié : [`_build_plan/milestones/6-superadmin-antibot/prompt.md`](../_build_plan/milestones/6-superadmin-antibot/prompt.md)*

#### 📚 Documents de Référence Instatic
- [`docs/features/security-anti-bot.md`](features/security-anti-bot.md) : Piège Honeypot, Cloudflare Turnstile, table `security_ip_bans`, limiteur de débit.
- [`docs/features/agent-runtime.md`](features/agent-runtime.md) : Observateur de sessions SSE On-Demand sans surcharge serveur.
- [`docs/features/openrouter-model-sync.md`](features/openrouter-model-sync.md) : Gestionnaire dynamique des priorités de modèles LLM.

#### What gets built
- Dashboard `/admin` affichant les métriques clés en temps réel (inscrits, sessions, conversions).
- Observateur SSE **On-Demand** (ouvert uniquement au clic sur une session précise).
- Gestionnaire de priorité des modèles LLM à chaud.
- **Gestionnaire Dynamique des Stacks (`StackManager.tsx`)** : Interface superadmin permettant d'ajouter, modifier et activer de nouvelles stacks (ex: React 20, Next 16, Neon, etc.) avec leur description vulgarisée, consommées immédiatement par l'Agent IA.
- Sécurité anti-bot : honeypot invisible, Cloudflare Turnstile, rate limiting et table `security_ip_bans`.

#### What it explicitly does NOT include
- Gestion multi-tenant en marque blanche.

#### Done when
- Une soumission de formulaire avec champ honeypot bannie instantanément l'IP (HTTP 403).
- L'administrateur visualise et écoute une session en streaming à la demande sans latence.
- L'administrateur peut créer une nouvelle stack dans `/admin` et la voir immédiatement listée dans `GET /api/stacks`.

#### 📋 Prompt Copier-Coller pour l'Agent (Claude Code) :
```markdown
Tu es le Staff Engineer d'Exécution sur Scaffold™ SaaS.
Documents de référence obligatoires à lire :
- @_build_plan/prd.md
- @_build_plan/milestones/6-superadmin-antibot/prompt.md
- @docs/features/security-anti-bot.md
- @docs/features/agent-runtime.md
- @docs/features/openrouter-model-sync.md

Ta mission est d'implémenter le JALON 6 dans design-os/src/pages/admin/ et server/security/ :
1. Crée design-os/src/pages/admin/AdminDashboard.tsx et components/admin/AdminSessionWatcher.tsx (SSE On-Demand).
2. Crée design-os/src/components/admin/ModelManager.tsx (réordonnancement LLM à chaud).
3. Crée design-os/src/components/admin/StackManager.tsx (ajout et édition dynamique des stacks modernes).
4. Crée design-os/server/security/honeypot.ts, turnstile.ts et rateLimiter.ts.
5. Crée design-os/server/handlers/admin.ts (endpoints admin metrics, models, sessions, stacks).
INVARIANT : Zéro build lourd local. Teste avec bun test server/security. Pousse sur GitHub pour validation CI/CD.
Quand c'est terminé, écris _build_plan/milestones/6-superadmin-antibot/milestone-log.md et consigne dans milestones.log.
```

---

### 🏁 Jalon 7 : Garde-Fous Instatic, CI/CD Cloud & Déploiement Production

*Fichier de prompt dédié : [`_build_plan/milestones/7-garde-fous-prod/prompt.md`](../_build_plan/milestones/7-garde-fous-prod/prompt.md)*

#### 📚 Documents de Référence Instatic
- [`docs/CONVENTIONS.md`](CONVENTIONS.md) : Standard Instatic (< 600 lignes, zéro blabla, conformité stricte).
- [`.github/workflows/ci.yml`](../design-os/.github/workflows/ci.yml) : Configuration complète du pipeline CI/CD cloud sur GitHub Actions.
- [`docs/features/jobs.md`](features/jobs.md) : Tâches asynchrones et maintenance d'arrière-plan.

#### What gets built
- Suite de tests de garde-fous d'architecture Instatic (`scripts/test-architecture.mjs`).
- Configuration de production conteneurisée : `Dockerfile` multi-stage et `Caddyfile` avec HTTPS automatique.
- Pipeline GitHub Actions finalisé assurant la vérification continue de bout en bout.

#### What it explicitly does NOT include
- Clusters Kubernetes complexes.

#### Done when
- 100 % des tests passent au vert sur GitHub Actions (`tsc -b`, bundling Vite, ESLint, `bun test`, garde-fous Instatic).
- L'application est déployée et accessible en HTTPS.

#### 📋 Prompt Copier-Coller pour l'Agent (Claude Code) :
```markdown
Tu es le Staff Engineer d'Exécution sur Scaffold™ SaaS.
Documents de référence obligatoires à lire :
- @_build_plan/prd.md
- @_build_plan/milestones/7-garde-fous-prod/prompt.md
- @docs/CONVENTIONS.md
- @.github/workflows/ci.yml

Ta mission est d'implémenter le JALON 7 dans design-os/ :
1. Crée design-os/scripts/test-architecture.mjs (les 6 tests de conformité Instatic).
2. Crée design-os/Dockerfile et Caddyfile (packaging de production).
3. Finalise design-os/.github/workflows/ci.yml pour le déploiement cloud.
INVARIANT : Exécute node scripts/test-architecture.mjs en local. Pousse sur GitHub pour le déploiement.
Quand c'est terminé, écris _build_plan/milestones/7-garde-fous-prod/milestone-log.md et clôture milestones.log.
```

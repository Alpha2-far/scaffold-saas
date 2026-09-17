# Feuille de Route d'Ingénierie : Les 7 Jalons SaaS (Synthèse BRD & Instatic)

*Date de révision : 17 septembre 2026*  
*Méthode : Synthèse BM PRD Creator (Incrémental & Visible) + Standard Instatic (< 600 lignes)*  
*Suivi d'exécution : `milestones.log`*  
*Plan de construction & Prompts : `blueprint/`*  
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

## 2. Les 7 Jalons d'Ingénierie : Spécifications, Liens Instatic & Invites 4 Piliers

---

### 🏁 Jalon 1 : Socle Serveur Bun & BDD Double Adaptateur

*Fichier de prompt dédié : [`blueprint/milestones/1-serveur-bun-db/prompt.md`](../blueprint/milestones/1-serveur-bun-db/prompt.md)*

#### 📚 Documents de Référence Instatic
- [`docs/server.md`](server.md) : Spécification complète de l'architecture serveur Bun, de `DbClient`, du schéma SQL et du routeur.
- [`docs/architecture.md`](architecture.md) : Vue d'ensemble architecturale et modèle de données relationnel.
- [`docs/CONVENTIONS.md`](CONVENTIONS.md) : Conventions de nommage et standards d'ingénierie TypeScript.
- [`blueprint/prd.md`](../blueprint/prd.md) : PRD officiel de construction (Section 5 : Modèle de données & Milestone 1).

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
- `curl -s http://localhost:3001/api/stacks` renvoie les stacks par défaut pré-peuplées.
- Commit et push validés 100% verts sur GitHub Actions (`.github/workflows/ci.yml`).

#### 📋 Invite Modèle pour Claude Code (Structure 4 Piliers) :
```markdown
**OBJECTIF** :
Implémenter le Jalon 1 (Socle Serveur Bun & BDD Double Adaptateur) de Scaffold™ SaaS pour disposer d'un backend ultra-rapide capable de servir l'API de santé et d'exposer les stacks dynamiques.

**CONTEXTE** :
- Codebase cible : `design-os/`
- Spécifications officielles : `@blueprint/prd.md` et `@blueprint/milestones/1-serveur-bun-db/prompt.md`
- Architecture serveur et schéma BDD : `@docs/server.md` et `@docs/architecture.md`
- Fichiers à créer dans `design-os/server/` : `db/client.ts`, `db/migrations/001_initial_schema.sql`, `db/migrate.ts`, `router.ts`, `handlers/health.ts`, `handlers/stacks.ts`, `index.ts`.

**CONTRAINTES** :
- ⛔ NE PAS exécuter de builds lourds (`npm run build`, `npx tsc -b`) sur cette machine locale (CPU/RAM limités).
- ⛔ NE PAS toucher aux fonctionnalités des jalons ultérieurs (chat SSE, UI triptyque, billing, admin).
- Respecter scrupuleusement les directives de `CLAUDE.md`.

**CRITÈRE DE SUCCÈS** :
- `bun run server/index.ts` démarre sans erreur sur le port 3001.
- `curl -s http://localhost:3001/api/health` renvoie HTTP 200 `{ "status": "ok", "db": "connected" }`.
- `curl -s http://localhost:3001/api/stacks` renvoie la liste des stacks pré-peuplées.
- Le rapport d'exécution est rédigé dans `blueprint/milestones/1-serveur-bun-db/milestone-log.md` et consigné dans `milestones.log`.
- Push sur `origin/main` validé vert par GitHub Actions.
```

---

### 🏁 Jalon 2 : Passerelle OpenRouter Cascade & Flux Streaming SSE

*Fichier de prompt dédié : [`blueprint/milestones/2-openrouter-sse/prompt.md`](../blueprint/milestones/2-openrouter-sse/prompt.md)*

#### 📚 Documents de Référence Instatic
- [`docs/features/openrouter-model-sync.md`](features/openrouter-model-sync.md) : Cascade de modèles LLM et tolérance de panne transparente.
- [`docs/features/agent-runtime.md`](features/agent-runtime.md) : Runtime de sessions d'agents et streaming SSE.
- [`docs/features/scaffold-agent.md`](features/scaffold-agent.md) : Comportement de l'Agent IA Scaffold et Pare-Feu de Vocabulaire §0.6.
- [`docs/features/soul.md`](features/soul.md) : Personnalité et principes d'interaction exécutive.

#### What gets built
- Client OpenRouter avec bascule automatique cascade résiliente (`claude-3.7-sonnet` ➔ `gpt-4o` ➔ `gemini-2.0-flash` ➔ `deepseek-r1`).
- Route SSE `POST /api/projects/:id/chat` servant le streaming temps réel mot par mot.
- Prompt d'interview exécutive réutilisant le master prompt BM PRD Creator (§0.6, posture non-développeur, motif *recommend-then-confirm*).

#### What it explicitly does NOT include
- Tiroir de paiement ou monétisation.
- Interface superadmin.

#### Done when
- Une requête curl streaming sur `/api/projects/test/chat` délivre un flux `data: {"token": "..."}` ininterrompu.
- La coupure simulée du modèle primaire bascule instantanément sur le modèle de secours sans coupure.

#### 📋 Invite Modèle pour Claude Code (Structure 4 Piliers) :
```markdown
**OBJECTIF** :
Connecter l'Agent IA Scaffold au flux OpenRouter en streaming temps réel (SSE) avec tolérance de panne totale via cascade de modèles.

**CONTEXTE** :
- Codebase cible : `design-os/server/`
- Spécifications : `@blueprint/prd.md`, `@blueprint/milestones/2-openrouter-sse/prompt.md`, `@docs/features/openrouter-model-sync.md`, `@docs/features/agent-runtime.md`, `@docs/features/scaffold-agent.md`
- Fichiers à créer : `server/ai/openrouter.ts`, `server/ai/fallbackCascade.ts`, `server/ai/prompts/systemAgent.ts`, `server/handlers/chatStream.ts`

**CONTRAINTES** :
- ⛔ Zéro build lourd local.
- Pare-feu de vocabulaire strict (§0.6) : aucun jargon robotique ni commande slash dans les prompts.
- Ne pas toucher aux paiements ni au dashboard superadmin.

**CRITÈRE DE SUCCÈS** :
- `curl -N -X POST http://localhost:3001/api/projects/test/chat` délivre les tokens mot par mot sans blocage.
- Bascule de modèle vérifiée en cas d'erreur simulée sur le modèle primaire.
- Rapport consigné dans `blueprint/milestones/2-openrouter-sse/milestone-log.md` et `milestones.log`.
```

---

### 🏁 Jalon 3 : Interface Triptyque avec Rail 56px & Live Canvas WYSIWYB

*Fichier de prompt dédié : [`blueprint/milestones/3-interface-triptyque-canvas/prompt.md`](../blueprint/milestones/3-interface-triptyque-canvas/prompt.md)*

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

#### 📋 Invite Modèle pour Claude Code (Structure 4 Piliers) :
```markdown
**OBJECTIF** :
Bâtir l'interface visuelle triptyque (Rail 56px + Console Agent 40% + Live Canvas 60%) et connecter les 43 thèmes d'auteur locaux.

**CONTEXTE** :
- Codebase cible : `design-os/src/`
- Spécifications : `@blueprint/prd.md`, `@blueprint/milestones/3-interface-triptyque-canvas/prompt.md`, `@docs/interface.md`, `@docs/design.md`, `@docs/ux.md`
- Fichiers à créer/adapter : `src/components/NavigationRail.tsx`, `src/components/AgentConsole.tsx`, `src/components/LiveCanvas.tsx`, `src/components/cards/RecommendationCard.tsx`, `src/App.tsx`

**CONTRAINTES** :
- ⛔ NE PAS exécuter `npm run build` ou `tsc -b` en local (utiliser `npm run dev` pour tester visuellement).
- Aucun défilement horizontal toléré à 1280x800.
- Zéro commande slash affichée à l'utilisateur.

**CRITÈRE DE SUCCÈS** :
- Interface testée et validée à 1280x800 sous Chrome.
- Changement de thème d'auteur répercuté instantanément sur le Live Canvas.
- Rapport consigné dans `blueprint/milestones/3-interface-triptyque-canvas/milestone-log.md` et `milestones.log`.
```

---

### 🏁 Jalon 4 : Moteur de Structuration Déterministe Zod & `milestones.log` Client

*Fichier de prompt dédié : [`blueprint/milestones/4-compilation-zod-capabilities/prompt.md`](../blueprint/milestones/4-compilation-zod-capabilities/prompt.md)*

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

#### 📋 Invite Modèle pour Claude Code (Structure 4 Piliers) :
```markdown
**OBJECTIF** :
Implémenter le compilateur déterministe Zod, la résolution des capacités et le générateur de `milestones.log` client avec audit 100/100.

**CONTEXTE** :
- Codebase cible : `design-os/server/compilation/`
- Spécifications : `@blueprint/prd.md`, `@blueprint/milestones/4-compilation-zod-capabilities/prompt.md`, `@docs/features/compilation-engine.md`, `@docs/features/export-engine.md`, `@docs/features/brownfield-intake.md`
- Fichiers à créer : `server/compilation/schema.ts`, `server/compilation/engine.ts`, `server/compilation/generators/clientMilestonesLog.ts`, `server/compilation/capabilities/authGoogle.ts`, `src/lib/product-health.ts`

**CONTRAINTES** :
- ⛔ Zéro build lourd local (tester avec `bun test server/compilation`).
- Zéro hallucination tolérée dans l'assemblage markdown des 6 documents.
- Ne pas brancher le module de paiement dans ce jalon.

**CRITÈRE DE SUCCÈS** :
- `bun test server/compilation` valide l'assemblage complet des 6 documents et du `milestones.log` client.
- Score santé `product-health.ts` à 100/100 sur projet test.
- Rapport consigné dans `blueprint/milestones/4-compilation-zod-capabilities/milestone-log.md` et `milestones.log`.
```

---

### 🏁 Jalon 5 : Module de Paiement Géolocalisé & Modèle Steve Jobs (9 € / 6 000 FCFA)

*Fichier de prompt dédié : [`blueprint/milestones/5-billing-geolocalise/prompt.md`](../blueprint/milestones/5-billing-geolocalise/prompt.md)*

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

#### 📋 Invite Modèle pour Claude Code (Structure 4 Piliers) :
```markdown
**OBJECTIF** :
Implémenter la facturation géolocalisée découplée (Modèle Steve Jobs : conception gratuite, paiement au clic pour emporter) et la libération de `product-plan.zip`.

**CONTEXTE** :
- Codebase cible : `design-os/server/billing/` et `src/components/`
- Spécifications : `@blueprint/prd.md`, `@blueprint/milestones/5-billing-geolocalise/prompt.md`, `@docs/features/billing.md`, `@docs/features/export-engine.md`
- Fichiers à créer : `server/billing/geoIp.ts`, `server/billing/adapters/types.ts`, `server/billing/adapters/africaMobileMoney.ts`, `server/billing/adapters/internationalCards.ts`, `src/components/CheckoutDrawer.tsx`, `server/handlers/billingWebhook.ts`

**CONTRAINTES** :
- ⛔ Zéro build lourd local (tester avec `bun test server/billing`).
- Les adaptateurs de paiement doivent être strictement découplés et agnostiques.
- Idempotence absolue des webhooks (zéro double-facturation).

**CRITÈRE DE SUCCÈS** :
- Simulation IP Afrique renvoie 6 000 FCFA et IP Europe renvoie 9 €.
- Simulation webhook déclenche immédiatement le téléchargement de `product-plan.zip`.
- Rapport consigné dans `blueprint/milestones/5-billing-geolocalise/milestone-log.md` et `milestones.log`.
```

---

### 🏁 Jalon 6 : Dashboard Superadmin (`/admin`), SSE On-Demand & Anti-Bot

*Fichier de prompt dédié : [`blueprint/milestones/6-superadmin-antibot/prompt.md`](../blueprint/milestones/6-superadmin-antibot/prompt.md)*

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

#### 📋 Invite Modèle pour Claude Code (Structure 4 Piliers) :
```markdown
**OBJECTIF** :
Déployer le Dashboard `/admin` avec observateur SSE On-Demand, le gestionnaire dynamique des stacks (`StackManager.tsx`) et la sécurité anti-bot défensive.

**CONTEXTE** :
- Codebase cible : `design-os/src/pages/admin/` et `server/security/`
- Spécifications : `@blueprint/prd.md`, `@blueprint/milestones/6-superadmin-antibot/prompt.md`, `@docs/features/security-anti-bot.md`, `@docs/features/agent-runtime.md`, `@docs/features/openrouter-model-sync.md`
- Fichiers à créer : `src/pages/admin/AdminDashboard.tsx`, `src/components/admin/AdminSessionWatcher.tsx`, `src/components/admin/ModelManager.tsx`, `src/components/admin/StackManager.tsx`, `server/security/honeypot.ts`, `server/security/turnstile.ts`, `server/security/rateLimiter.ts`, `server/handlers/admin.ts`

**CONTRAINTES** :
- ⛔ Zéro build lourd local (tester avec `bun test server/security`).
- L'observateur SSE doit être strictement On-Demand (jamais de broadcast continu passif).

**CRITÈRE DE SUCCÈS** :
- Honeypot déclenchant HTTP 403 et écriture dans `security_ip_bans`.
- Dashboard `/admin` affichant les métriques et session watcher opérationnel.
- Création d'une nouvelle stack dans `StackManager` immédiatement retournée par `GET /api/stacks`.
- Rapport consigné dans `blueprint/milestones/6-superadmin-antibot/milestone-log.md` et `milestones.log`.
```

---

### 🏁 Jalon 7 : Garde-Fous Instatic, CI/CD Cloud & Déploiement Production

*Fichier de prompt dédié : [`blueprint/milestones/7-garde-fous-prod/prompt.md`](../blueprint/milestones/7-garde-fous-prod/prompt.md)*

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

#### 📋 Invite Modèle pour Claude Code (Structure 4 Piliers) :
```markdown
**OBJECTIF** :
Certifier l'intégrité architecturale par les 6 tests de garde-fous Instatic et configurer le déploiement cloud de production en conteneur sécurisé HTTPS.

**CONTEXTE** :
- Codebase cible : `design-os/`
- Spécifications : `@blueprint/prd.md`, `@blueprint/milestones/7-garde-fous-prod/prompt.md`, `@docs/CONVENTIONS.md`, `@.github/workflows/ci.yml`
- Fichiers à créer : `scripts/test-architecture.mjs`, `Dockerfile`, `Caddyfile`, `.github/workflows/ci.yml`

**CONTRAINTES** :
- ⛔ Ne pas tenter de builder le Docker lourd sur le Mac local.
- Exécuter localement uniquement `node scripts/test-architecture.mjs`.
- Laisser GitHub Actions opérer le build et déploiement de production.

**CRITÈRE DE SUCCÈS** :
- 6/6 tests de garde-fous Instatic passants.
- Pipeline CI/CD GitHub Actions 100% vert.
- Déploiement opérationnel en HTTPS.
- Clôture finale de `milestones.log`.
```

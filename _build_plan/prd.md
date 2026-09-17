# Scaffold™ SaaS Platform — Product Requirements Document (PRD)

> **À propos de ces fichiers de plan de construction (`_build_plan/`) :**  
> Ce document PRD et les dossiers par jalon sous `_build_plan/milestones/` constituent le guide d'ingénierie déterministe pour la construction incrémentale de la plateforme SaaS Scaffold™.  
> Chaque jalon est conçu pour être une **session de travail autonome** pour un agent de programmation (Claude Code, Cursor, Codex, Antigravity) produisant une valeur visible et testable, avec son journal `milestone-log.md` consigné dans `milestones.log`.

---

## 1. Ce que nous construisons (Core Purpose)

**Scaffold™** est le **Visual Workspace & Pre-Code Intelligence Layer** pour tous les créateurs de produits logiciels. C'est le **« Macintosh de la création logicielle moderne »** : il transforme l'intention humaine en spécifications d'architecture déterministes et en prototypes visuels vivants avant d'écrire la moindre ligne de code applicatif.

### 💎 La Trinité de Valeur Inviolable
1. **Le « Figma des Développeurs » & Visualisation Immédiate (WYSIWYB)** : L'utilisateur voit son logiciel prendre forme sous ses yeux (Live Canvas interactif, Shell applicatif, 43 thèmes d'auteur locaux, maquettage d'écrans en direct) **avant** de coder. Zéro errance externe : on ne quitte jamais Scaffold pour chercher des templates sur le web.
2. **La Structuration Logicielle & Cadrage Déterministe** : Cadrage chirurgical (*Ruthless Scoping* In-Scope V1 vs Out-of-Scope V2+), modélisation des données (`data-shape.md`), 11 décisions exécutives (*recommend-then-confirm*), 5 stacks d'auteur modernes certifiées, et audit santé 100/100 (`product-health.ts`).
3. **La Mémoire Souveraine du Projet & Continuité Multi-Agents (`milestones.log`)** : Découpage en jalons atomiques, éradication du *Context Rot*, et portabilité totale sans lock-in (passerelle transparente entre Claude Code, Cursor, Codex et Antigravity sans perdre un seul token).

### 👥 Audience Universelle & Posture Bienveillante (Comme dans BM PRD)
- **Hypothèse Fondatrice** : L'utilisateur comprend parfaitement son produit, son business et ce qu'il souhaite accomplir. En revanche, **il n'a pas la compréhension technique d'un développeur** (code, drivers, bases de données, ORM, jobs d'arrière-plan, websockets).
- **Règle d'Or de l'Agent Scaffold** : Dès qu'un concept technique apparaît, l'Agent le vulgarise en langage simple et en termes de bénéfices produit avant de proposer un choix :
  - *« Une base de données cloud (comme Supabase ou Neon), c'est le coffre-fort sécurisé où sont enregistrés vos utilisateurs et leurs informations sans que vous ayez à gérer un serveur. »*
- **Profils Accueillis** :
  - **Créateurs non-techniques & Solopreneurs** : Conçoivent et visualisent leur logiciel sans coder ni dépendre de tiers.
  - **Porteurs d'idées & Founders** : Valident leur MVP et cadrent l'architecture à la vitesse de la pensée.
  - **Vibe Coders & Builders IA** : Échappent aux hallucinations et à la dette technique grâce aux contrats d'architecture stricts.
  - **Indie Hackers & Makers** : Expédient des micro-SaaS monétisables et robustes en un temps record.
  - **Agences & Développeurs Professionnels** : Cadrent les spécifications clients en 30 minutes sans réunions stériles.

---

## 2. Ce que l'Application Accomplit (High-Level Capabilities)

1. **Dialogue Exécutif Zéro-Jargon** : L'Agent Scaffold guide l'utilisateur à travers 11 décisions architecturales clés avec le pattern *recommend-then-confirm*.
2. **Live Canvas Interactif & Shell Applicatif** : Visualisation en direct du produit dans le navigateur avec 43 thèmes d'auteur compilés localement et 12 tokens sémantiques universels.
3. **Moteur de Recommandation de Stacks Modernes** : Recommandation personnalisée et vulgarisée parmi un éventail riche (Supabase, Neon, Cloudflare D1, Bun, Expo, FastAPI) validé par schéma Zod.
4. **Modélisation Déterministe des Données** : Définition visuelle des entités, champs et relations sans jargon SQL abstrait (`data-shape.md`).
5. **Matrice de Scoping Impitoyable (*Scope Lock*)** : Verrouillage strict du périmètre V1 pour éliminer le *feature creep*.
6. **Contrôle Santé Produit 100/100** : Moteur d'audit vérifiant 4 contrats d'intégrité avant tout export.
7. **Pont Zéro-Install Brownfield (Scaffold × Agent OS)** : Prompt d'extraction universel pour les projets existants, ingérant `scaffold-intake.json` pour cadrer la prochaine étape sans accès disque.
8. **Exportation Déterministe `product-plan.zip`** : Package complet des 6 documents de spécification + le journal `milestones.log` pré-configuré pour piloter les agents de code externes.
9. **Monétisation Découplée & Géolocalisée (Modèle Steve Jobs)** : Conception gratuite, paiement à l'export (6 000 FCFA en Afrique via Mobile Money / 9 € à l'International via Cartes et Apple Pay).
10. **Superadmin & Observabilité On-Demand** : Console `/admin` pour suivre les sessions en streaming sans surcharge serveur, et sécurité anti-bot invisible.

---

## 3. Déjà Fourni par le Socle Existant (`design-os/`)

Nous ne partons pas d'une page blanche. Le socle interne `design-os/` fournit déjà :
- **Stack Frontend** : React 19, TypeScript strict, Vite v7, Tailwind CSS v4.
- **43 Thèmes d'Auteur Locaux** : Présents dans `src/presets/`, 100% locaux avec contrastes AAA certifiés (`npm run presets`).
- **Composants Haptiques & UI** : Status badges pulsants, loaders de streaming, calques verre liquide, typographie tabulaire.
- **Moteur d'Audit Santé** : `src/lib/product-health.ts` calculant les 4 contrats et le score sur 100.
- **Graphe de Connaissances** : `.graphify/` contenant 411 nœuds et 943 liens.

---

## 4. Hors Périmètre Global V1 (*Out of Scope*)

- ❌ **Éditeur de code in-app / IDE Web** : Scaffold conçoit et spécifie, les agents locaux (Claude Code, Cursor) codent.
- ❌ **Push Git direct depuis l'UI web** : L'utilisateur télécharge son `product-plan.zip` et initialise son repo en local.
- ❌ **Hébergement infogéré du produit client** : Scaffold ne déploie pas le produit final du client sur AWS/Vercel.
- ❌ **Gestion Multi-Tenant Entreprise (SSO SAML / Okta)** : Uniquement auth email/password et OAuth universel en V1.
- ❌ **Builds lourds sur Mac local** : Décharge matérielle totale vers les runners cloud GitHub Actions (`.github/workflows/ci.yml`).

---

## 5. Modèle de Données (Conceptual Data Model)

1. **`users`** : Les créateurs de projets (id, email, password_hash, role: 'creator' | 'admin' | 'superadmin', nom, avatar, dates).
2. **`projects`** : Les applications créées (id, user_id, title, slug, description, theme_id, status: 'draft' | 'interviewing' | 'designed' | 'locked' | 'exported', dates).
3. **`agent_sessions`** : Sessions d'interview IA (id, project_id, current_step, active_model, fallback_count, dates).
4. **`chat_messages`** : Messages échangés lors du cadrage (id, session_id, role: 'user' | 'assistant' | 'system', content, model_tag, created_at).
5. **`project_capabilities`** : Briques fonctionnelles activées (id, project_id, capability_id, config_json, created_at).
6. **`document_snapshots`** : Versions compilées des 6 spécifications (id, project_id, doc_type, markdown_content, version, created_at).
7. **`billing_transactions`** : Historique des achats (id, project_id, user_id, provider: 'africa_mobile_money' | 'international_cards', transaction_id, amount_cents, currency, status, created_at).
8. **`security_ip_bans`** : Sécurité anti-bot (ip_address, reason, banned_until, created_at).

---

## 6. Le Catalogue des Stacks Modernes Recommandées (2026)

Scaffold™ ne restreint pas le créateur à un carcan unique. Selon l'intention et le besoin de scalabilité, l'Agent propose et justifie en langage clair l'une des options suivantes :

1. **`saas.standard` (Supabase First — Recommandé par défaut)** :
   - Frontend : React 19 + Vite / Next.js + Tailwind CSS v4.
   - Données & Auth : **Supabase** (PostgreSQL managé + Auth Google/Email + Stockage de fichiers + Realtime).
   - *Pourquoi pour le non-tech* : Zéro configuration de serveur, tout fonctionne immédiatement clé en main.
2. **`saas.serverless` (Neon Postgres + Drizzle ORM)** :
   - Frontend : React 19 + Vite / Next.js + Tailwind v4.
   - Données : **Neon** (PostgreSQL Serverless ultra-rapide avec branching instantané) + Better-Auth.
   - *Pourquoi pour le non-tech* : Permet de tester des nouveautés sur une copie de base de données sans risquer de casser la production.
3. **`hyper.speed` (Bun + SSE Streaming)** :
   - Runtime : Bun + React 19 + SQLite local (dev) / Neon ou Supabase (prod) + SSE natif.
   - *Pourquoi pour le non-tech* : Démarrage instantané et streaming mot par mot ultra-fluide pour les outils d'IA et micro-SaaS.
4. **`edge.global` (Cloudflare D1 & Workers)** :
   - Runtime : Cloudflare Workers + Hono + Cloudflare D1 (SQLite distribué mondialement).
   - *Pourquoi pour le non-tech* : Coûts quasi nuls, vitesse mondiale maximale sans maintenance.
5. **`mobile.first` (Expo Cross-Platform / React 19 PWA)** :
   - Mobile : Expo (React Native pour iOS et Android) ou React 19 PWA installable + Supabase.
   - *Pourquoi pour le non-tech* : Une seule application qui s'installe directement sur l'écran d'accueil d'un smartphone.
6. **`ai.data` (Python FastAPI + Vector DB)** :
   - Backend : Python FastAPI + pgvector (Supabase/Neon) ou Qdrant + React 19.
   - *Pourquoi pour le non-tech* : Conçu pour les produits avec recherche sémantique lourde, analyse de documents et pipelines IA.
7. **`custom.derived` (Sur-Mesure Déterminé)** :
   - Django, Laravel, Rails, Go, etc. — validé par schéma Zod strict.

---

## 7. Découpage des 7 Jalons d'Ingénierie (Milestones)

---

### Milestone 1 — Socle Serveur Bun & BDD Double Adaptateur
Initialise le backend ultra-léger sous Bun avec double persistance SQLite locale (dev sans friction) et PostgreSQL (production cloud).

#### What gets built
- Serveur HTTP `Bun.serve` natif sur port 3001 avec gestion CORS.
- Client BDD unifié `DbClient` basculant automatiquement entre `bun:sqlite` (local) et `Bun.sql` (Postgres prod).
- Schéma SQL relationnel complet (`001_initial_schema.sql`) et runner de migration synchrone au boot.
- Route de santé `GET /api/health` renvoyant le statut système, le moteur et l'état des tables.

#### What milestone 1 explicitly does NOT include
- Interface de chat ou d'interview.
- Connexion aux LLMs (OpenRouter).
- Passerelle de paiement.

#### Done when
- `bun run server/index.ts` démarre en < 50 ms.
- `curl -s http://localhost:3001/api/health` renvoie HTTP 200 `{ status: "ok", db: "connected", engine: "bun" }`.
- Commit et push validés 100% verts sur GitHub Actions.

---

### Milestone 2 — Passerelle OpenRouter Cascade & Flux Streaming SSE
Connecte le dialogue de l'Agent IA Scaffold en streaming mot par mot avec tolérance de panne totale.

#### What gets built
- Client OpenRouter avec tableau de cascade automatique (`claude-3.7-sonnet` ➔ `gpt-4o` ➔ `gemini-2.0-flash` ➔ `deepseek-r1`).
- Route SSE `POST /api/projects/:id/chat` servant le streaming temps réel.
- Prompt système intégrant le Pare-Feu de Vocabulaire (zéro jargon, zéro slash commands, pattern *recommend-then-confirm*).

#### What milestone 2 explicitly does NOT include
- Tiroir de paiement ou monétisation.
- Interface superadmin.

#### Done when
- Une requête curl streaming sur `/api/projects/test/chat` délivre un flux SSE continu sans interruption.
- Coupure simulée du modèle primaire basculant instantanément sur le modèle de secours sans crash.

---

### Milestone 3 — Interface Triptyque avec Rail 56px & Live Canvas WYSIWYB
Offre l'expérience visuelle « Figma des Développeurs » dans le navigateur, optimisée pour ordinateurs portables 13"-14" (ratio 40/60).

#### What gets built
- Rail vertical escamotable de 56 px avec icônes et infobulles contextuelles.
- Console interactive de l'Agent avec cartes de recommandation visuelle (*recommend-then-confirm*).
- Live Canvas WYSIWYB réactif intégrant les 43 thèmes d'auteur locaux et le maquettage d'écrans en direct.
- Éradication totale des slash commands de l'interface utilisateur.

#### What milestone 3 explicitly does NOT include
- Traitement de paiement réel.
- Exportation physique d'archives ZIP.

#### Done when
- L'interface s'affiche parfaitement à 1280x800 sans aucun défilement horizontal.
- Le changement de thème sur le Live Canvas met à jour instantanément les 12 tokens sémantiques.

---

### Milestone 4 — Moteur de Structuration Déterministe Zod & `milestones.log` Client
Assemble mathématiquement les 6 documents de spécification et génère le journal de bord de continuité multi-agents pour le client.

#### What gets built
- Schémas Zod stricts pour les entités, capacités et périmètres.
- Compilateur déterministe générant les 6 documents (`product-overview.md`, `data-shape.md`, `prd.md`, `product-roadmap.md`, `prompts/`, `soul.md`).
- Générateur du `milestones.log` projet personnalisé pour le client.
- Connexion du moteur d'audit de santé (`product-health.ts`) garantissant un score 100/100.

#### What milestone 4 explicitly does NOT include
- Passerelle de paiement paywall (réservée au Jalon 5).
- Multi-tenancy complexe.

#### Done when
- La compilation d'un projet test produit les 6 documents valides et un `milestones.log` complet avec score 100/100.

---

### Milestone 5 — Module de Paiement Géolocalisé & Modèle Steve Jobs (9 € / 6 000 FCFA)
Implémente l'expérience « Concevoir gratuitement, payer pour emporter » avec détection de pays et adaptateurs agnostiques.

#### What gets built
- Module Geo-IP détectant automatiquement la devise (Afrique ➔ 6 000 FCFA / International ➔ 9 €).
- `PaymentProviderAdapter` agnostique avec deux implémentations : `AfricaMobileMoneyAdapter` et `InternationalCardAdapter`.
- Tiroir de checkout instantané `CheckoutDrawer` au clic sur « Prendre les clés du logiciel ».
- Webhook sécurisé et idempotent déverrouillant le téléchargement immédiat de `product-plan.zip`.

#### What milestone 5 explicitly does NOT include
- Abonnements récurrents complexes ou gestion de TVA internationale multi-pays en V1.

#### Done when
- Une IP africaine affiche 6 000 FCFA et une IP européenne affiche 9 €.
- La simulation de webhook déclenche instantanément le téléchargement de l'archive ZIP.

---

### Milestone 6 — Dashboard Superadmin (`/admin`), SSE On-Demand & Anti-Bot
Offre à l'administrateur une visibilité totale sur l'activité sans surcharger le serveur, et sécurise la plateforme.

#### What gets built
- Page `/admin` avec métriques en temps réel (utilisateurs, sessions créées, taux de conversion, revenus).
- Observateur de sessions SSE **On-Demand** (ouvert uniquement au clic sur une session).
- Gestionnaire de priorité des modèles LLM à chaud.
- Sécurité défensive : champ Honeypot invisible, Cloudflare Turnstile, rate limiting et table `security_ip_bans`.

#### What milestone 6 explicitly does NOT include
- Facturation d'entreprise en marque blanche.

#### Done when
- Une injection honeypot ou une tentative de spam bloque immédiatement l'IP avec HTTP 403 et écriture dans `security_ip_bans`.
- La console `/admin` affiche les métriques et permet d'observer un chat sans latence.

---

### Milestone 7 — Garde-Fous Instatic, CI/CD Cloud & Déploiement Production
Valide l'intégrité absolue de l'architecture et met en production la plateforme Scaffold™ SaaS.

#### What gets built
- Suite de tests de garde-fous d'architecture Instatic (`scripts/test-architecture.mjs`).
- Configuration de production conteneurisée : `Dockerfile` multi-stage et `Caddyfile` avec HTTPS automatique.
- Pipeline GitHub Actions finalisé assurant la vérification continue de bout en bout.

#### What milestone 7 explicitly does NOT include
- Clusters Kubernetes multi-régions.

#### Done when
- 100 % des tests passent au vert sur GitHub Actions (`tsc -b`, bundling Vite, ESLint, `bun test`, garde-fous Instatic).
- L'application est déployée et fonctionnelle en HTTPS.

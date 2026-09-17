# Le Protocole des 11 Décisions Exécutives (Scaffold™ Engine)

*Date de révision : 17 septembre 2026*  
*Statut : Standard officiel d'orchestration conversationnelle SaaS*  
*Localisation : `docs/reference/bm-11-questions.md`*

---

## 1. Vue d'Ensemble & Révolution SaaS (Zéro Accès Disque)

Dans les anciens outils de cadrage en ligne de commande (CLI), le script supposait avoir un accès direct au disque dur local pour exécuter des commandes `grep` ou inspecter des fichiers `package.json`.

> [!IMPORTANT]
> **Le Paradigme 100% Web SaaS de Scaffold™**  
> 1. **Scaffold vit dans le navigateur** : Il n'a aucun accès physique au système de fichiers local du client.
> 2. **Mode Greenfield (Par défaut, 95% des cas)** : L'utilisateur arrive avec une intention pure. Scaffold déduit et propose l'architecture optimale.
> 3. **Mode Brownfield (Projet existant)** : Si l'utilisateur possède déjà une codebase, l'intake se fait de manière 100% web :
>    - Soit en le déclarant naturellement dans le dialogue (*« J'ai déjà une app Next.js avec Supabase »*).
>    - Soit en glissant-déposant son fichier `package.json`, `pyproject.toml` ou schéma SQL directement dans le tiroir de discussion du navigateur.

---

## 2. La Matrice des 11 Phases Réinventée

| # | Phase Interne | Révolution Scaffold™ (Conversationnelle & Visuelle) | Artefact Produit en Coulisse |
|---|---|---|---|
| **1** | **Brain Dump** | L'utilisateur dépose son idée brute dans la console sans jargon. | Intake initial |
| **2** | **Format Choice** | *(Automatique)* Standardisé vers le package hermétique `product-plan/`. | Structure cible |
| **3** | **Core Purpose** | Synthèse de la mission et de la valeur en 1 à 3 phrases percutantes. | `product-overview.md` |
| **4** | **In-Scope Features** | Sélection des 4 à 8 piliers fonctionnels du produit. | `product-overview.md` (Puces In-Scope) |
| **5** | **Out-of-Scope (Cut List)** | Verrouillage impitoyable de ce que le produit ne fera PAS en V1. | `product-overview.md` (Puces Out-of-Scope) |
| **6** | **Tech Stack Engine** | **Révolution des 5 Architectures d'Auteur Scaffold** (zéro lock-in). | Spécification technique déterministe |
| **7** | **Integrations & Clés** | Identification des briques tierces (Auth, Paiement, Stockage). | Inventaire des credentials `.env.example` |
| **8** | **Data Model** | Déduction logique des entités et relations à partir des fonctionnalités. | `data-shape/data-shape.md` |
| **9** | **Live Canvas & Design** | Choix parmi les 43 thèmes d'auteur locaux et preview multi-vues. | `DESIGN.md` & tokens |
| **10**| **Milestones Engine** | **Révolution du Découpage Incrémental + `milestones.log` Client**. | `milestones.log` & `milestones/` |
| **11**| **Compilation & Keys** | Validation du score 100/100 (`product-health.ts`) & libération ZIP. | `product-plan.zip` complet |

---

## 3. Révolution de la Phase 6 : Le Moteur de Stacks d'Auteur Scaffold (Adaptatif & Vulgarisé)

À l'origine, les anciens outils imposaient un template rigide unique (ex: Ruby on Rails 8). Scaffold™ révolutionne cette étape en adoptant **l'approche de vulgarisation pour créateurs et non-développeurs** : l'utilisateur connaît son produit et son business, mais n'a pas à maîtriser la plomberie d'ingénierie. Scaffold lui propose les meilleures stacks 2026 en expliquant clairement les bénéfices métier :

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      LE CATALOGUE DES STACKS D'AUTEUR SCAFFOLD™                        │
├──────────────────────────┬──────────────────────────────┬──────────────────────────────┤
│ Stack D'Auteur           │ Technologies Clés 2026       │ Bénéfices pour le Créateur   │
├──────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ 1. SaaS Standard 2026    │ React 19 + Tailwind v4 +     │ • Recommandé par défaut.     │
│    (Supabase First)      │ Supabase (PostgreSQL + Auth  │ • Tout-en-un sans devops :   │
│                          │ + Stockage de fichiers)      │   auth Google et BDD incluses│
├──────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ 2. Serverless Modern     │ React 19 / Next.js +         │ • Zéro serveur à gérer.      │
│    (Neon Postgres)       │ Neon (PostgreSQL Serverless) │ • Branchements de BDD comme  │
│                          │ + Drizzle ORM + Better-Auth  │   Git pour tester sans peur  │
├──────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ 3. Hyper-Speed Backend   │ Bun Runtime + React 19 +     │ • Démarrage en 5 ms.         │
│    (Temps Réel & SSE)    │ SQLite local (dev) /         │ • Streaming ultra-fluide pour│
│                          │ Postgres prod + SSE natif    │   outils IA et micro-SaaS    │
├──────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ 4. Edge-First Global     │ Hono / Cloudflare Workers +  │ • Coûts quasi-nuls.          │
│    (Ultra-faible latence)│ Cloudflare D1 (SQLite Edge)  │ • Vitesse mondiale instantanée│
├──────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ 5. Mobile-First & PWA    │ Expo (React Native iOS/And.) │ • Une seule app pour le web, │
│    (Cross-Platform)      │ ou React 19 PWA + Supabase   │   iPhone et Android          │
├──────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ 6. AI & Data Intensive   │ Python FastAPI +             │ • Idéal pour l'IA lourde, le │
│    (RAG & Calcul)        │ pgvector (Supabase/Neon)     │   scraping et les pipelines  │
│                          │ + React 19                   │   de machine learning        │
├──────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ 7. Custom Dérivé         │ Choix libre de l'utilisateur │ • S'adapte à toute stack     │
│    (Laravel, Django...)  │ Validé par schéma Zod strict │   personnalisée ou existante │
└──────────────────────────┴──────────────────────────────┴──────────────────────────────┘
```

### 🗣️ La Règle de Vulgarisation Bienveillante (Comme dans BM PRD)
L'Agent Scaffold ne demande jamais abruptement : *« Quel ORM ou quel moteur SQL voulez-vous ? »*.  
Il présente la recommandation avec pédagogie :
> *« Pour votre application de réservation, je vous recommande **SaaS Standard avec Supabase** : cela vous fournit automatiquement la base de données sécurisée dans le cloud, la connexion par email et Google, et le stockage des photos de vos utilisateurs sans que vous ayez à configurer de serveur. Si vous préférez une base de données pure ultra-flexible avec sauvegarde instantanée, nous pouvons opter pour **Neon**.*
> *Souhaitez-vous valider cette recommandation ou explorer une autre option ? »*

---

## 4. Révolution de la Phase 10 : Le Moteur de Milestones Client (`milestones.log`)

Exactement comme nous avons révolutionné le Design System pour en faire un moteur propriétaire et exportable, nous révolutionnons les Milestones du projet client :

### 1. Invariant de Visibilité Client
Chaque jalon généré pour l'application du client **doit obligatoirement livrer une fonctionnalité visible et testable dans le navigateur** :
- **Jalon 1 (Fondations & Auth)** : Connexion utilisateur, shell applicatif, layout et dashboard vide navigable.
- **Jalon 2 (Cœur de Données & Formulaires)** : Création, affichage, édition et suppression de l'entité principale.
- **Jalon 3 (Moteur Métier & Logique Clé)** : Exécution de l'action reine du produit (ex: matching, scoring, génération).
- **Jalon 4 (Intégrations & Facturation)** : Branchement des paiements, webhooks, emails transactionnels.
- **Jalon 5 (Audit & Production)** : Polissage de l'interface, gestion des états d'erreur et déploiement.

### 2. Export Automatique de `milestones.log` pour le Client
Le package `product-plan.zip` téléchargeable par le client contient son propre journal `milestones.log` pré-formaté.  
Dès que le client ouvre son projet avec son agent IA de code (**Claude Code**, **Cursor**, **Codex**), il lui transmet un ordre limpide :

> *« Lis le fichier milestones.log de mon projet et exécute le Jalon 1. »*

L'agent aval dispose des critères d'acceptation exacts, sait comment tester localement, et documente son avancement dans le `milestones.log` du client sans jamais dériver de la vision initiale.

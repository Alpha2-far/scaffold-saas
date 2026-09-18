# Scaffold™ Platform Docs

*Date de révision : 16 septembre 2026*  
*Statut : Index Maître de Documentation*

L'arborescence documentaire officielle de la plateforme SaaS **Scaffold™** (`Visual Workspace & Pre-Code Intelligence Layer`).

Ce document indexe la totalité de la documentation technique du projet. Il indique quoi lire, dans quel ordre, et où trouver chaque information.

- **Pour un agent IA (Claude Code, Cursor, Codex, Antigravity)** : commencez par `CLAUDE.md` / `AGENTS.md` à la racine pour les règles impératives, puis venez ici pour les explications.
- **Pour un contributeur ou fondateur** : commencez par [`product.md`](product.md) puis [`architecture.md`](architecture.md), puis lisez la fiche de fonctionnalité ([`features/`](features/)) ou de référence ([`reference/`](reference/)) la plus proche de votre tâche.

> **Note de portée V1 vs V2** : Cette documentation documente **la plateforme Scaffold SaaS elle-même**. Le livrable exporté par Scaffold V1 pour ses utilisateurs finaux reste le package déterministe `product-plan/` (PRD, Scope Lock, Data Shape, 43 thèmes, jalons). En V2, Scaffold générera également cette arborescence `docs/` pour les projets clients.

---

## 🗺️ Cartographie de l'Arborescence (`docs/`)

```text
docs/
├── README.md                   ← Cet index central (point d'entrée)
├── CONVENTIONS.md              ← Contrat d'écriture IA (ancrage chemins, < 600 lignes, zéro marketing)
│
├── product.md                  ← Product OS (problème résolu, cible, principes, Greenfield V1, exclusions)
├── ux.md                       ← UX Manifesto (Expérience Steve Jobs, modèle iTunes 9€/6000 FCFA, tiroir paiement)
├── architecture.md             ← Vue d'ensemble du système SaaS (processus, couches, cycles de vie)
├── interface.md                ← Spécification UI/UX (Rail 56px, asymétrie 40/60, console Superadmin)
├── design.md                   ← Design system visuel (43 thèmes d'auteur, tokens OKLCH, haptique)
├── server.md                   ← Architecture serveur Bun, double DB Postgres/SQLite, schéma SQL, endpoints
├── milestones.md               ← Feuille de route incrémentale : Les 7 Jalons de Développement SaaS
│
├── features/                   ← "Ce que fait la fonctionnalité et comment elle fonctionne"
│   ├── scaffold-agent.md       ← L'Agent IA natif (conversation naturelle, zéro commande slash)
│   ├── agent-runtime.md        ← Contrat d'exécution agentique, hydratation, Zod mutations, idempotence
│   ├── compilation-engine.md   ← Compilateur déterministe (questions ➔ 6 documents product-plan/)
│   ├── openrouter-model-sync.md← Passerelle OpenRouter, fallback natif, synchronisation dynamique
│   ├── security-anti-bot.md    ← Sécurité défensive : Turnstile, Honeypot, rate-limiting, bans IP
│   ├── billing.md              ← Modèle de monétisation iTunes (9€/6000 FCFA), Adapters Mobile Money (MTN/Moov/Wave) + Cartes & Apple Pay
│   ├── jobs.md                 ← Machine d'état des jobs asynchrones (compilation, export ZIP)
│   ├── soul.md                 ← Standard soul.md (Âme de l'Agent vs Âme du Produit client)
│   ├── deterministic-ui-engine.md ← Moteur UI Déterministe : Zéro-compilation live & registre de primitives
│   ├── code-synthesizer.md     ← Compilateur de code d'export : Gabarits déterministes React 19 propres
│   ├── brownfield-intake.md    ← Pont Zéro-Install & Rétro-ingénierie Scaffold × Agent OS
│   └── export-engine.md        ← Compilateur du package d'export product-plan/
│
└── reference/                  ← Cookbooks courts pour primitives et patterns réutilisables
    ├── capability-catalog.md   ← Catalogue de capacités techniques & étude de cas exhaustive Google Auth
    ├── architecture-tests.md   ← Catalogue de tous les tests de garde-fous structurels (méthode Instatic)
    └── bm-11-questions.md      ← Le protocole des 11 questions exécutif
```

---

## 🧭 Où Regarder en Premier

### 1. "Je veux comprendre la vision et ce qu'est Scaffold™ comme produit"
1. [`product.md`](product.md) — Product OS : Problème résolu, public cible, principes fondamentaux, Greenfield V1 vs exclusions.
2. [`interface.md`](interface.md) — L'ergonomie du Triptyque (Rail 56px, ratio 40/60) et la console Superadmin.
3. [`design.md`](design.md) — La charte Midnight Navy / Vert Électrique, les 43 thèmes d'auteur locaux et les primitives haptiques.

### 2. "Je veux comprendre l'architecture backend et serveur"
1. [`server.md`](server.md) — Le runtime Bun, le double adaptateur BDD (Postgres prod / SQLite local) et les routes HTTP/SSE.
2. [`features/openrouter-model-sync.md`](features/openrouter-model-sync.md) — La passerelle OpenRouter et la synchronisation dynamique des modèles depuis l'admin.
3. [`features/security-anti-bot.md`](features/security-anti-bot.md) — Le blindage Turnstile, Honeypot et les limiteurs de débit.

### 3. "Je veux comprendre comment une réponse devient un document"
1. [`features/compilation-engine.md`](features/compilation-engine.md) — Le moteur de compilation validé par Zod.
2. [`reference/capability-catalog.md`](reference/capability-catalog.md) — L'étude de cas Google Auth détaillée dans les 6 documents cibles.
3. [`features/soul.md`](features/soul.md) — La préservation philosophique du produit via `product/soul.md`.

---

## 📌 Table des Sources de Vérité (*Source-of-Truth Pointers*)

| Concept / Domaine | Source de Vérité (Chemin Réel) | Règle / Invariant |
|---|---|---|
| **Règles d'ingénierie de l'agent** | `CLAUDE.md` / `AGENTS.md` | Priorité absolue sur toute consigne. |
| **Spécification produit canonique** | `docs/product.md` | Frontière stricte V1 vs Hors V1. |
| **Architecture globale** | `docs/architecture.md` | Orientation et flux de données. |
| **Serveur & Base de données** | `docs/server.md` | Double adaptateur `DbClient`, schéma SQL. |
| **Interface & Ergonomie** | `docs/interface.md` | Rail 56px, asymétrie 40/60, SSE on-demand. |
| **Règles de sécurité & Anti-bot** | `docs/features/security-anti-bot.md` | Turnstile + Honeypot + Rate-limit. |
| **Engineering Knowledge Base** | `knowledge/SCAFFOLD_ENGINEERING_KB.md` | 6 règles de sécurité 2026, trade-offs, god-nodes. |
| **Compétence Agent Portable** | `scaffold-agent/SKILL.md` | Conforme aux 17 règles de `bm-skill-builder`. |
| **Tokens CSS & Thèmes (43 presets)** | `src/presets/` & `src/index.css` | Conforme aux 12 tokens sémantiques OKLCH. |
| **Contrats d'Audit Pré-Export** | `src/lib/product-health.ts` | 4 contrats stricts : 0 dérive tolérée. |

---

## 🔗 Liens Utiles

- [`CONVENTIONS.md`](CONVENTIONS.md) — Les règles impératives de rédaction des documents
- [`METHODOLOGIE_DOCUMENTAIRE_INSTATIC.md`](../METHODOLOGIE_DOCUMENTAIRE_INSTATIC.md) — La bible de référence de la méthode Instatic
- [`../knowledge/SCAFFOLD_ENGINEERING_KB.md`](../knowledge/SCAFFOLD_ENGINEERING_KB.md) — La base de connaissance d'ingénierie officielle

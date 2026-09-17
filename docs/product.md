# Product OS — Spécification Produit Canonique

*Date de révision : 16 septembre 2026*  
*Statut : Document de référence absolu*  
*Localisation : `docs/product.md`*

---

## 1. Vue d'Ensemble & Mission

Scaffold™ est le **Visual Workspace & Pre-Code Intelligence Layer** conçu pour les créateurs, solopreneurs et développeurs modernes travaillant avec des agents IA (Claude Code, Cursor, Codex, Antigravity).

### 🔒 Invariant Fondateur : Le « Figma des Développeurs »
* **Flux de travail sacré** :
  $$\text{Idée / Vision} \longrightarrow \textbf{Scaffold™ (Visualisation \& Cadrage Déterministe)} \longrightarrow \text{Développement (Agents IA)}$$
* **Interdiction d'errance externe** : Un développeur ne quitte pas son plan pour improviser sur le web. De la même façon, l'utilisateur ne quitte jamais Scaffold™ pour chercher des thèmes ou inventer son architecture. Tout se conçoit, se personnalise, se prévisualise et s'exporte au cœur de Scaffold.
* **Contrat WYSIWYB (*What You See Is What You Build*)** : Ce que le client visualise, ajuste et valide dans Scaffold est strictement identique aux spécifications injectées dans le livrable d'exportation `product-plan/`.

### 🏗️ Le Socle Fondateur : Design OS (`design-os/`) Promu en SaaS
* **La Réalité Technique Existante** : Nous ne partons pas d'une page blanche. Le projet **Design OS** situé dans `design-os/` constitue notre outil interne opérationnel éprouvé en agence (React 19, Tailwind v4, Vite v7, 43 presets de thèmes d'auteur locaux, moteur d'audit `product-health.ts`, primitives haptiques et loaders).
* **La Transformation en SaaS** : C'est **cet outil interne existant qui est transformé en application SaaS** pour le client final :
  1. Les commandes slash exécutées en terminal (`/product-vision`, `/shape-section`, etc.) sont supprimées pour le client et intégralement remplacées par le dialogue avec l'**Agent IA Scaffold natif**.
  2. Le serveur backend Bun et le double client de données (Postgres prod / SQLite local) sont greffés pour gérer les comptes utilisateurs, les projets multiples et la sécurité anti-bot.
  3. L'interface adopte le rail escamotable 56 px et le pare-brise WYSIWYB 40/60.

---

## 2. La Trinité de Valeur : Ce que Scaffold™ Vend Réellement

Scaffold™ ne vend pas simplement un fichier de log ou un template. Il vend une **solution complète et indissociable en 3 piliers** :

1. **Le « Figma des Développeurs » & La Visualisation Immédiate (WYSIWYB)** :
   - Voir directement son projet prendre forme visuellement (Live Canvas interactif, Shell applicatif, maquettage d'écrans) AVANT d'aller coder la moindre ligne.
   - 43 thèmes d'auteur locaux compilés, 12 tokens sémantiques universels, typographies soignées.
   - **Zéro errance externe** : personne ne quitte Scaffold pour chercher des templates sur le web.
2. **La Structuration Logicielle & Le Cadrage Déterministe** :
   - Transformer une idée brute ou du vibe coding chaotique en architecture logicielle en béton.
   - Définition chirurgicale du périmètre (*Ruthless Scoping* : In-Scope V1 vs Out-of-Scope V2+).
   - Modélisation déterministe des données (Data Shape, entités, relations).
   - 11 décisions exécutives (*recommend-then-confirm*).
   - 5 Stacks d'Auteur certifiées 2026 adaptées logiquement au cas d'usage.
   - Audit santé 100/100 (`product-health.ts`) : zéro incohérence, zéro faille logique avant le passage au code.
3. **La Mémoire Souveraine du Projet & La Continuité Multi-Agents (`milestones.log`)** :
   - Découpage en jalons atomiques digestes pour les LLM (Milestone 1, Milestone 2, ...), chacun apportant une valeur visible et testable à l'écran.
   - Éradication totale du *Context Rot* (agents IA saturés après 20 minutes).
   - Journal de bord universel `milestones.log` : portabilité totale sans lock-in. On commence sur Claude Code, on continue sur Cursor, Codex ou Antigravity sans perdre un seul token ni réexpliquer son projet de zéro.

---

## 3. L'Audience Universelle : Le « Macintosh de la Création Logicielle »

Scaffold™ n'est **en aucun cas réservé aux seuls développeurs ou agences**. Tout comme le Macintosh en 1984 a rendu l'informatique accessible à tous sans avoir à taper des lignes de commande DOS, Scaffold™ démocratise la création logicielle pour tous les profils :

1. **Les Créateurs non-techniques & Solopreneurs** : Ont une vision business ou produit claire mais zéro bagage en programmation. Scaffold leur permet de voir leur idée se matérialiser visuellement en 10 minutes et d'obtenir un plan d'ingénierie parfait sans se faire arnaquer ni dépendre de tiers.
2. **Les Porteurs d'Idée & Founders** : Veulent prototyper, valider le modèle économique et les fonctionnalités clés à la vitesse de la pensée avant d'investir du capital.
3. **Les Vibe Coders & Builders IA** : Utilisent Claude Code, Cursor ou d'autres agents, mais se heurtent systématiquement au mur du « vibe coding » dès que le projet dépasse 3 fichiers (dérives, réécritures non sollicitées, interfaces laides, bugs en cascade). Scaffold leur donne la colonne vertébrale architecturale indispensable.
4. **Les Indie Hackers & Makers** : Veulent concevoir et expédier des micro-SaaS propres, robustes et monétisables en un week-end.
5. **Les Agences & Développeurs Professionnels** : Cadrent les besoins clients en 30 minutes, verrouillent les spécifications visuelles et techniques (*Scope Lock*), et éliminent les réunions de cadrage stériles.

---

## 4. Le Problème Résolu : Le Paradoxe du *Vibe Coding*

Le développement assisté par IA moderne souffre d'un paradoxe violent :
* Lancer une commande en langage naturel est devenu trivial.
* Mais sans spécifications architecturales déterministes, les agents de code :
  - Dérivent après 4 messages (*prompt drift*).
  - Réinventent le schéma de base de données à chaque jalon.
  - Produisent des interfaces visuellement désastreuses basées sur des bibliothèques génériques.
  - Épuisent des millions de tokens dans des boucles de refactorisation stériles.

**Scaffold™ résout ce problème à la source** : il agit comme la couche d'intelligence pré-code. Aucun code source n'est écrit tant que la vision, les données, le design et les jalons ne sont pas mathématiquement verrouillés.

---

## 5. Principes Produit Inviolables

1. **Scoping Impitoyable (*Ruthless Scoping*)** : Une V1 réussie est une V1 ultra-fine. Scaffold force l'utilisateur à scinder son projet en deux colonnes étanches : *In-Scope V1* vs *Out-of-Scope (V2+)*.
2. **Zéro Commande Slash pour l'Utilisateur Final** : Les commandes terminal (`/product-vision`, `/export`) appartiennent à nos outils internes. Le client SaaS dialogue exclusivement avec un **Agent IA natif** qui mène une interview exécutive structurée.
3. **Convention Over Configuration Visuelle** : 43 thèmes d'auteur locaux compilés, 12 tokens sémantiques universels. Aucune dépendance externe CDN au moment de la conception.
4. **Validation par Contrats Déterministes** : Avant tout export, le projet doit satisfaire 4 contrats d'audit stricts (`src/lib/product-health.ts`). Zéro tolérance pour les incohérences entre la vision et les données.

---

## 6. Périmètre Opérationnel SaaS V1

Ce que Scaffold SaaS V1 accomplit de bout en bout dans le navigateur :

* **Paradigme 100% Web SaaS (Zéro Accès Disque Local)** :
  - Scaffold s'exécute dans le cloud et dans le navigateur ; il n'accède jamais au disque dur local du client.
  - **Mode Greenfield (Défaut, 95% des créateurs)** : L'utilisateur part d'une idée pure. L'Agent propose logiquement les architectures d'auteur adaptées.
  - **Mode Brownfield (Code existant)** : L'intake se fait par déclaration conversationnelle ou par glisser-déposer de fichiers de configuration (`package.json`, `pyproject.toml`, schéma SQL) dans la console web.
* **Interview Exécutive Adaptative** : L'Agent conduit les 11 décisions architecturales selon le pattern *recommend-then-confirm*.
* **Moteur d'Architectures d'Auteur** : Sélection parmi les 5 architectures certifiées (SaaS Standard 2026, Hyper-Speed Bun, Mobile/PWA, AI/Data, Custom) validées par schéma Zod.
* **Studio Visuel WYSIWYB** : Choix instantané parmi les 43 thèmes d'auteur locaux compilés, personnalisation et preview responsive.
* **Modélisation Déterministe des Données** : Génération du schéma relationnel (`data-shape.md`).
* **Package d'Exportation `product-plan.zip`** : Archive complète contenant les 6 documents d'architecture ET le journal déterministe `milestones.log` pré-configuré pour piloter les agents de code externes (Claude Code, Cursor).

---

## 7. Ce qui est Strictement Hors V1 (*Out of Scope*)

Pour préserver la pureté et la vitesse de la plateforme, les fonctionnalités suivantes sont formellement exclues de la V1 :

* ❌ **Éditeur de code in-app** : Scaffold n'est pas un IDE web. Le code est développé en local par l'utilisateur avec son agent de prédilection.
* ❌ **Push Git direct depuis l'UI** : Scaffold exporte un package de spécifications audité ; l'initialisation du dépôt git relève de l'environnement de dev local de l'utilisateur.
* ❌ **Hébergement cloud infogéré du produit client** : Scaffold ne déploie pas le produit fini de l'utilisateur sur AWS/Vercel.
* ❌ **Multi-tenant d'entreprise complexe** : Pas de SSO SAML/Okta pour les équipes en V1.

---

## 8. Relation Scaffold ↔ Agents de Code Externes

Scaffold ne remplace pas Claude Code, Cursor ou Codex : il en est le **fournisseur de contexte déterministe**.

```text
[Utilisateur Humain]
       │ (Dialogue naturel & ajustements visuels)
       ▼
 [Scaffold™ SaaS]
       │
       ├─→ Valide la cohérence via Zod & Product Health Audit
       │
       ▼
[product-plan.zip]
 ├── product/product-overview.md
 ├── product/data-shape/data-shape.md
 ├── product/prd.md
 ├── product/product-roadmap.md
 ├── product/milestones/XX/prompt.md
 └── product/soul.md
       │
       ├─→ Donné en pâture à Claude Code / Cursor
       ▼
[Code Source Produit sans dérive ni hallucination]
```

---

## 9. Cycle de Vie d'un Projet Scaffold

Un projet traverse 5 états séquentiels stricts :

```text
[draft] ──→ [interviewing] ──→ [designed] ──→ [locked] ──→ [exported]
```

1. **`draft`** : Projet créé avec son titre et son intention brute.
2. **`interviewing`** : Session active avec l'Agent Scaffold. Les questions et choix de capacités sont résolus.
3. **`designed`** : Le thème d'auteur, le shell applicatif et les composants visuels sont sélectionnés et inspectés sur le canvas.
4. **`locked`** : La matrice de cadrage (*Scope Lock*) est scellée. Les 4 contrats de santé sont au vert (Score 100/100).
5. **`exported`** : Le livrable `product-plan.zip` est généré et téléchargé par l'utilisateur.

---

## 10. Définition Formelle d'un Projet (`Project`)

Dans le système Scaffold, un **Projet** est une entité persistée possédant :
- Un identifiant UUID unique et un slug URL d'accès direct.
- Un propriétaire (`user_id`).
- Un état de cycle de vie (`status`).
- Un modèle de données réactif (`project-model.json`).
- Une configuration de thème (`theme_id`, typographie, palette).
- Un ensemble de capacités techniques activées (`capabilities: string[]`).
- Un historique de messages d'interview et un snapshot des 6 documents de spécification.

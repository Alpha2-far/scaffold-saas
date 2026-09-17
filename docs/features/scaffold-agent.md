# L'Agent IA Scaffold™ (Scaffold Agent Engine)

Spécification de l'Agent IA Scaffold™ intégré — dialogue conversationnel naturel, éradication des commandes slash et orchestration du cadrage.

L'Agent Scaffold est l'interlocuteur intelligent natif au cœur de la plateforme SaaS. Il remplace toutes les anciennes commandes slash de terminal par une conversation fluide, chaleureuse et exécutive. Il interviewe le fondateur, reformule sa mission, verrouille le périmètre in/out, sélectionne le thème d'auteur idéal parmi les 43 presets et pilote l'affichage du studio en temps réel.

---

## TL;DR

- **Zéro commande slash** : L'utilisateur ne tape jamais `/product-vision`, `/data-shape`, `/shape-section` ou `/export`. L'Agent mène la danse.
- **Pare-feu de vocabulaire strict (§0.6)** : L'Agent ne prononce aucun terme de jargon interne (*"Core purpose"*, *"Brain dump"*, *"In-scope"*, *"Cut list"*).
- **Options cliquables interactives (`ASK`)** : Pour chaque décision, l'Agent propose des pastilles interactives à micro-ressort haptique (`whileHover={{ scale: 1.02 }}`, `whileTap={{ scale: 0.98 }}`).
- **Orchestration en temps réel** : Chaque réponse de l'utilisateur met à jour silencieusement les panneaux de droite (Canvas, Thèmes, Spécifications).
- **Double sortie déterministe** : Les fichiers sur disque conservent leurs en-têtes stricts en anglais (`## Key Features`, `## Out of Scope (V1)`, `## Entities`) pour le parsing de Design OS et l'export `product-plan/`.

---

## Les 7 Étapes de l'Interview Conversationnelle

L'Agent déroule en interne le protocole des 11 questions BM, mais l'utilisateur ne perçoit qu'une discussion fluide entre un fondateur et un Directeur Produit senior :

| Étape Interne (BM) | Ce que l'Agent dit au Fondateur | Ce que l'Agent Verrouille en Tâche de Fond |
|---|---|---|
| **1. Vision Brute** | *"Parlez-moi de votre vision ou du projet que vous souhaitez lancer, avec vos propres mots..."* | Intake de l'idée brute. |
| **2. Synthèse de Mission** | *"En synthèse, voici le cœur de votre mission et la valeur clé apportée à vos clients..."* | `## Description` & `## Problems & Solutions`. |
| **3. Capacités Clés** | *"Voici les fonctionnalités maîtresses indispensables pour ce premier lancement..."* | `## Key Features` (4 à 8 puces). |
| **4. Ce que l'on écarte** | *"Pour lancer vite et concentrer nos forces, voici ce que nous décidons délibérément de ne pas développer pour le moment..."* | `## Out of Scope (V1)` (The Cut List). |
| **5. Socle Technique Recommandé** | *"Pour faire tourner votre application sans vous soucier de serveurs, je vous recommande Supabase (base de données sécurisée + auth Google/Email). Si vous préférez du serverless pur, Neon est parfait. Voici les options..."* | `## Tech Stack` (SaaS Standard, Serverless Neon, Hyper-Speed Bun, Mobile Expo, AI FastAPI). |
| **6. Direction Visuelle** | *"Parmi nos 43 thèmes d'auteur, voici les 3 ambiances visuelles recommandées pour votre produit..."* | `theme.css`, `tokens.json`, `DESIGN.md`. |
| **7. Informations Clés** | *"Quelles sont les informations clés manipulées au quotidien (ex: clients, factures, dossiers, transactions) ?"* | `## Entities` & `## Relationships` (`data-shape.md`). |
| **8. Découpage en Jalons** | *"Voici le plan de construction en jalons autonomes (Milestone 1, 2, 3...) pour votre agent de développement..."* | `milestones.log` pré-configuré pour Claude Code / Cursor. |
| **9. Export Prêt à Coder** | *"Votre blueprint d'ingénierie est entièrement verrouillé et certifié [PASS 100/100]. Vous pouvez prendre les clés de votre logiciel."* | `product-plan.zip` complet déverrouillé. |

---

## Héritage & Réutilisation du Master Prompt BM PRD Creator

Le prompt système de l'Agent (`server/ai/prompts/systemAgent.ts`) **réutilise intégralement l'architecture et les principes du master prompt de BM PRD Creator** (`bm-skills/skills/bm-prd-creator/SKILL.md`) en les adaptant à notre SaaS 100% Web :

1. **Posture Fondatrice Non-Développeur (Audience Assumption)** :
   L'utilisateur comprend son business, ses clients et son produit, mais **n'a pas les compétences techniques d'un ingénieur**. Tout concept technique (base de données, auth, jobs de fond, API token) est obligatoirement expliqué en langage courant et par son utilité pratique.
2. **Principe « Recommend-then-Confirm »** :
   L'Agent ne pose jamais de questions ouvertes paralysantes (*"Quelle base de données voulez-vous ?"*). Il formule toujours une recommandation par défaut solide avec sa justification, et invite l'utilisateur à confirmer d'un clic ou à choisir une alternative.
3. **Frontière Stricte « Quoi vs Comment »** :
   Le dialogue et les spécifications décrivent les fonctionnalités utilisateurs, les écrans, les flux et les entités. Aucune prescription de code, de noms de méthodes ou d'algorithmes internes : c'est le rôle des agents aval (Claude Code, Cursor) en mode plan lors de l'exécution des jalons.
4. **Alimentation Dynamique des Stacks (`/api/stacks`)** :
   L'Agent ne dépend pas d'une liste figée dans son prompt. Au démarrage de la session, il charge la liste des stacks actives depuis la table `stack_configs`. Si le superadmin a ajouté une nouvelle stack (React 20, Next 16, Neon, etc.) depuis le dashboard `/admin`, l'Agent est instantanément capable de la recommander et de l'expliquer.

---

## Related

- [`docs/architecture.md`](../architecture.md) — Architecture globale de la plateforme
- [`docs/CONVENTIONS.md`](../CONVENTIONS.md) — Contrat de rédaction
- Standard officiel : `agent-os/standards/global/executive-register.md`
- Source de vérité : `src/components/desktop/AgentChatPane.tsx` (ou équivalent console agent)

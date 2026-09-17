# Architecture de la Plateforme SaaS Scaffold™

Vue d'ensemble du système de la plateforme SaaS Scaffold™ — processus, triptyque de travail, modèle de données et pipeline de cadrage.

Scaffold™ est une plateforme SaaS de *Pre-Code Intelligence* pour créateurs, fondateurs et développeurs IA. Elle transforme une intention brute en un blueprint logiciel et visuel déterministe avant toute écriture de code applicatif. L'utilisateur interagit avec un Agent IA Scaffold intégré sans jamais taper de commande slash dans un terminal : l'agent mène l'interview, verrouille le périmètre, modélise les données, allume les visualisations interactives en temps réel et exporte le package complet `product-plan/`.

---

## TL;DR

- **Socle technique issu de Design OS (`design-os/`)** : La plateforme SaaS est bâtie directement sur notre outil interne opérationnel éprouvé (React 19, Tailwind v4, Vite v7, 43 presets locaux, audit de santé). Le SaaS en est la promotion commerciale avec backend Bun et éradication des commandes slash.
- **Espace de travail en triptyque 3 panneaux** : Rail d'icônes escamotable de 56 px (gauche), Console de l'Agent IA Scaffold en dialogue naturel (centre 40%), et Live Studio Canvas multi-vues (droite 60%).
- **Zéro commande slash pour le client final** : L'Agent Scaffold est l'interlocuteur unique. Il pose les questions, formule les propositions de synthèse et présente des pastilles de choix cliquables à ressort haptique.
- **Moteur de Design System Propriétaire intégré** : 43 thèmes d'auteur locaux compilés, avec contrastes AAA certifiés et bascule Visual Mode / Raw Mode (`DESIGN.md`).
- **Verrou de Périmètre Déterministe (Scope Lock)** : Génération automatique de la matrice In-Scope vs Out-of-Scope (The Cut List) et audit pré-export à 4 contrats.
- **Livrable d'export Scaffold V1** : La V1 exporte le package hermétique `product-plan/` (`prd.md`, `product-overview.md`, `product-roadmap.md`, `data-shape.md`, `milestones/`, `one-shot-prompt.md`, tokens CSS et mock data). L'export de l'arbre `docs/` d'Instatic est réservé à la V2.

---

## Architecture du Poste de Travail (Triptyque Desktop)

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│ SCAFFOLD™ SAAS PLATFORM                                             [Theme: Dark] [● Status OK] │
├──────────────────────┬──────────────────────────────────────────┬───────────────────────────────┤
│ 📁 PROJETS & SESSIONS │ 💬 AGENT CONVERSATIONNEL (SCAFFOLD AI)   │ 👁️ LIVE STUDIO CANVAS & SPECS │
│                      │                                          │                               │
│ [+ Nouveau Projet]   │ « Parlez-moi du projet que vous          │ [ 👁️ Preview ] [ 🎨 Thèmes ]  │
│                      │   souhaitez lancer, avec vos mots... »   │ [ 📑 Spécifications ] [ 🚀 ]  │
│ • InvoicePulse       │                                          │ ───────────────────────────── │
│   [Spécifié]         │ 👤 Fondateur :                           │ [ Desktop | Tablet | Mobile ] │
│ • CryptoVault        │   « Je veux un outil de facturation pour │ ┌───────────────────────────┐ │
│   [En cours]         │     freelances avec relances auto. »     │ │                           │ │
│ • PromptForge        │                                          │ │   RENDU EN DIRECT         │ │
│   [Cadré]            │ 🤖 Agent Scaffold :                      │ │   DE L'APPLICATION        │ │
│ • FloraMarket        │   « En synthèse, voici le cœur de votre  │ │   (Composants vivants,    │ │
│   [Idée]             │     mission... Est-ce bien cela ? »      │ │    Thème Studio actif)    │ │
│ • MindFlow           │   [1. Oui, exactement] [2. Ajuster]      │ │                           │ │
│                      │                                          │ └───────────────────────────┘ │
│ ──────────────────── │ ──────────────────────────────────────── │ 📊 AUDIT & MÉTRIQUES          │
│ ⚙️ 43 Thèmes Actifs  │ [ Répondez ou décrivez votre besoin... ↑]│ 4/4 Checks · Scope Verrouillé │
└──────────────────────┴──────────────────────────────────────────┴───────────────────────────────┘
```

---

## Tableau des Responsabilités des Couches

| Couche | Emplacement | Responsabilité |
|---|---|---|
| **Agent Conversationnel** | `docs/features/scaffold-agent.md` | Accueil, interview d'alignement, questions naturelles, pare-feu §0.6. |
| **Studio Visuel (Canvas)** | `docs/features/visual-studio.md` | Rendu interactif WYSIWYB, sélecteur des 43 thèmes, viewport responsive. |
| **Moteur de Périmètre** | `docs/features/scope-lock.md` | Verrouillage In-Scope / Out-of-Scope, barrière anti-creep. |
| **Modélisateur de Données** | `docs/features/data-modeler.md` | Entités métier, relations, cohérence avec le PRD. |
| **Compilateur d'Export** | `docs/features/export-engine.md` | Génération du package `product-plan/` hermétique pour Claude Code / Cursor. |
| **Audit Pré-Export** | `src/lib/product-health.ts` | Scan déterministe à 4 contrats (`[PASS]` garanti avant export). |

---

## Patterns Interdits & Pièges (Gotchas)

- ❌ **Interdiction des commandes slash dans l'UI SaaS** : Ne jamais afficher d'invite invitant l'utilisateur à taper `/product-vision` ou `/export`. L'Agent IA pose la question directement.
- ❌ **Interdiction des fuites de jargon (§0.6)** : L'Agent ne doit jamais prononcer *"Core purpose"*, *"Brain dump"*, *"In-scope"*, *"Cut list"*.
- ❌ **Interdiction des dépendances externes au runtime** : Les 43 thèmes sont 100% locaux. Aucun appel vers une API tierce de thèmes.

---

## Related

- [`docs/README.md`](README.md) — Index central
- [`docs/CONVENTIONS.md`](CONVENTIONS.md) — Règles d'écriture des documents
- [`docs/features/scaffold-agent.md`](features/scaffold-agent.md) — Spécification de l'Agent IA Scaffold
- Source de vérité du Design System : `src/presets/`

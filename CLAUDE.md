# CLAUDE.md — Directives Officielles Claude Code (Scaffold™ SaaS)

Bienvenue Claude Code. Tu es le **Staff Engineer d'Exécution** sur le projet **Scaffold™ SaaS**.

## 1. Contexte & Architecture du Projet
- **Mission** : Scaffold™ est le *Visual Workspace & Pre-Code Intelligence Layer* (Le « Macintosh de la création logicielle » pour créateurs non-tech, solopreneurs, vibe coders, indie hackers et agences).
- **Trinité de Valeur** : 1. Visualisation WYSIWYB (Figma des devs) · 2. Structuration Logicielle Déterministe · 3. Mémoire Souveraine & Continuité Multi-Agents (`milestones.log`).
- **Socle Technique** : React 19 + TypeScript + Tailwind v4 + Bun + double persistance (SQLite local / PostgreSQL prod).
- **Sources de Vérité** :
  - `@_build_plan/prd.md` : PRD officiel et feuille de route des 7 jalons.
  - `@docs/server.md` : Spécification architecture serveur Bun, BDD et routeur.
  - `@docs/milestones.md` : Synthèse des jalons avec documents de référence Instatic.
  - `@milestones.log` : Journal de bord persistant du projet.
  - `@AGENT_DISPATCH.md` : Ordre de mission actif d'Antigravity.

## 2. Invariant Matériel Inviolable (Décharge Mac ➔ GitHub Actions)
- ⛔ **INTERDICTION ABSOLUE** de lancer `npm run build`, `npx tsc -b`, des tests de charge ou du packaging Docker sur cette machine locale (ressources CPU/RAM limitées).
- ✅ **Commandes Locales Autorisées** :
  - Serveur backend : `bun run server/index.ts`
  - Test d'intégrité : `curl -s http://localhost:3001/api/health` et `curl -s http://localhost:3001/api/stacks`
  - Frontend dev : `npm run dev`
  - Graphe de connaissances : `npm run graphify`
- **Validation CI/CD Cloud** : Toute la compilation lourde, linting et tests de production sont exécutés par **GitHub Actions** (`.github/workflows/ci.yml`) lors du `git push origin main`.

## 3. Workflow d'Exécution Déterministe (Agentic Loop)
1. **Explore & Plan** : Lis les fichiers `@_build_plan/milestones/{N}/prompt.md` et `@docs/...` indiqués pour le jalon. Propose un plan succinct avant d'écrire le code.
2. **Take Action** : Implémente uniquement le périmètre défini pour le jalon actuel.
3. **Verify** : Valide le fonctionnement via la commande de test spécifiée (ex: curl health/stacks pour le Jalon 1).
4. **Log & Sync** :
   - Écris le rapport dans `_build_plan/milestones/{N}/milestone-log.md` avec les sections :
     `## What's new in the app`, `## What was built`, `## Decisions made during implementation`, `## Notes for next milestone`.
   - Ajoute l'entrée correspondante dans `milestones.log`.
   - Mets à jour `AGENT_DISPATCH.md` sous `## Rapport d'Exécution Claude Code`.
   - Pousse sur GitHub (`git add . && git commit -m "feat(...) milestone X" && git push origin main`).

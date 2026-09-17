# Milestone 7 — Garde-Fous Instatic, CI/CD Cloud & Déploiement Production

You are entering plan mode to plan and then build milestone 7 of the Scaffold™ SaaS Platform.

---

## 🎯 1. OBJECTIF
Mettre en place les garde-fous d'architecture Instatic (`scripts/test-architecture.mjs`), le pipeline CI/CD de production cloud (`.github/workflows/ci.yml`), le packaging conteneurisé ultra-léger (`Dockerfile`), et la configuration du reverse proxy sécurisé (`Caddyfile`) pour le déploiement final en production.

---

## 📚 2. CONTEXTE & FICHIERS CONCERNÉS
- **Documents de référence Instatic obligatoires** :
  - `@_build_plan/prd.md` : PRD officiel, Section 10 (Garde-fous d'architecture & Déploiement).
  - `@docs/server.md` : Spécifications de déploiement, reverse proxy et variables d'environnement.
  - `@CLAUDE.md` : Directives d'ingénierie et commandes autorisées.
  - `@milestones.log` : Historique des jalons 1 à 6.
- **Codebase existante** : `design-os/` (React 19 + TypeScript + Tailwind v4 + Bun).
- **Dépôt Git** : `https://github.com/Alpha2-far/scaffold-saas.git`.
- **Fichiers physiques à créer ou modifier** :
  - `scripts/test-architecture.mjs` : Les 6 tests d'architecture Instatic :
    1. Taille maximale des fichiers de documentation (< 600 lignes).
    2. Zéro mention de termes ou dépendances bannies (Brian Casel, FedaPay, LemonSqueezy).
    3. Intégrité des liens relatifs et absolus dans la documentation.
    4. Typage strict sans aucun `any` non documenté.
    5. Protection des god-nodes Graphify (`App.tsx`, `product-health.ts`, `ThemeStudio.tsx`).
    6. Conformité des tokens de couleurs AAA (`presets/`).
  - `Dockerfile` : Conteneur multi-stage ultra-léger basé sur `oven/bun:alpine` pour le runtime serveur et les assets statiques.
  - `Caddyfile` : Reverse proxy haute performance avec TLS / HTTPS automatique pour le domaine de production.
  - `.github/workflows/ci.yml` : Workflow d'intégration et déploiement continus complet (typecheck, lint, presets, bun test, architecture guardrails, build de production).

---

## ⛔ 3. CONTRAINTES
- **Décharge Matérielle Obligatoire** : Ne JAMAIS exécuter de packaging Docker lourd ou de build de conteneur sur cette machine locale.
- **Test Local Limité** : Seul `node scripts/test-architecture.mjs` est autorisé en local pour valider les règles de conformité. Le build conteneurisé complet est exécuté par GitHub Actions.
- **Zéro Régression sur la Trinité de Valeur** : Préserver l'espace de travail visuel (WYSIWYB), la structuration logicielle Zod et la continuité multi-agents (`milestones.log`).
- **Préservation Graphify** : Ne pas altérer `.graphify/`.

---

## ✅ 4. CRITÈRES DE SUCCÈS & VÉRIFICATION
1. **Test local léger** :
   ```bash
   node scripts/test-architecture.mjs
   ```
   Les 6 tests d'architecture Instatic passent avec 100% de succès.
2. **Vérification Dockerfile & Caddyfile** :
   - Fichiers de configuration propres, multi-stage, sans secrets codés en dur.
3. **Consignation & Journalisation Finale** :
   - Rédiger `_build_plan/milestones/7-garde-fous-prod/milestone-log.md` avec les sections :
     - `## What's new in the app`
     - `## What was built`
     - `## Decisions made during implementation`
     - `## Final Verification & Status` (Pipeline GitHub Actions, URL de déploiement)
     - `## Deviations from PRD`
   - Ajouter l'entrée finale dans `milestones.log` et marquer la complétion dans `AGENT_DISPATCH.md`.
4. **Validation CI/CD Cloud** : Commit et push sur `origin/main` (`Alpha2-far/scaffold-saas.git`) avec pipeline GitHub Actions 100% vert.

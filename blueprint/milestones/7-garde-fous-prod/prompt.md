# Milestone 7 — Garde-Fous Instatic, CI/CD Cloud & Déploiement Production

You are entering plan mode to plan and then build milestone 7 of the Scaffold™ SaaS Platform.

## Context

- Read `@blueprint/prd.md` for production deployment requirements.
- Read previous milestone logs: Milestones 1 to 6 in `@blueprint/milestones/` or `@milestones.log`.
- Codebase: `design-os/`.
- Repository: `https://github.com/Alpha2-far/scaffold-saas.git`.

## Invariant Matériel & Règles d'Exécution

> [!CRITICAL]
> **Décharge Matérielle Obligatoire (Mac Local ➔ GitHub Actions)** :
> - ⛔ **NE JAMAIS exécuter** le packaging Docker lourd sur cette machine locale.
> - ✅ **Test local léger autorisé** :
>   ```bash
>   node scripts/test-architecture.mjs
>   ```
> - Le packaging de conteneur, l'analyse de sécurité et les tests de régression sont exécutés par **GitHub Actions** (`.github/workflows/ci.yml`).

## Your Task

1. Plan the implementation for **only** milestone 7 as defined in the PRD.
2. Build the Production Deployment files and Instatic Guardrails:
   - `design-os/scripts/test-architecture.mjs` : Les 6 tests d'architecture Instatic :
     1. Taille des fichiers de documentation stricte (< 600 lignes).
     2. Zéro mention de noms ou dépendances bannies (Brian Casel, FedaPay, LemonSqueezy).
     3. Intégrité des liens relatifs et absolus dans la documentation.
     4. Typage strict sans aucun `any` non documenté.
     5. Protection des god-nodes Graphify (`App.tsx`, `product-health.ts`, `ThemeStudio.tsx`).
     6. Conformité des tokens de couleurs AAA (`presets/`).
   - `design-os/Dockerfile` : Conteneur multi-stage ultra-léger basé sur `oven/bun:alpine` pour le runtime serveur et Vite pour le bundling des assets statiques.
   - `design-os/Caddyfile` : Reverse proxy haute performance avec gestion TLS / HTTPS automatique pour le domaine de production.
   - `design-os/.github/workflows/ci.yml` : Workflow d'intégration et déploiement continus complet (typecheck, lint, presets, bun test, architecture guardrails, build de production).
3. Verify your work against the "Done when" criteria:
   - Exécuter `node scripts/test-architecture.mjs` et constater 100% de tests passants.
   - Effectuer un git commit et push vers `Alpha2-far/scaffold-saas.git`.
   - Constater sur GitHub Actions que le pipeline CI/CD de production s'exécute avec succès (100% vert).
4. When complete, write `blueprint/milestones/7-garde-fous-prod/milestone-log.md` and append the final entry to the root [`milestones.log`](../../milestones.log):
   - **`## What's new in the app`** at the top.
   - `## What was built`.
   - `## Decisions made during implementation`.
   - `## Final Verification & Status` (Pipeline GitHub Actions, URL de déploiement).
   - `## Deviations from PRD`.

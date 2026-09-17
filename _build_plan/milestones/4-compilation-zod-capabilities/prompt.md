# Milestone 4 — Moteur de Structuration Déterministe Zod & `milestones.log` Client

You are entering plan mode to plan and then build milestone 4 of the Scaffold™ SaaS Platform.

## Context

- Read `@_build_plan/prd.md` for compilation contracts and data schemas.
- Read previous milestone logs: Milestones 1, 2, 3 in `@_build_plan/milestones/` or `@milestones.log`.
- Codebase: `design-os/` (TypeScript + Zod).
- Health engine: `design-os/src/lib/product-health.ts`.

## Invariant Matériel & Règles d'Exécution

> [!CRITICAL]
> **Décharge Matérielle Obligatoire (Mac Local ➔ GitHub Actions)** :
> - ⛔ **NE JAMAIS exécuter** `npm run build` ou `npx tsc -b` sur cette machine locale.
> - ✅ **Test local léger autorisé** :
>   ```bash
>   bun test server/compilation
>   ```
> - La vérification de typage complet et la couverture de tests sont exécutées par les runners cloud **GitHub Actions**.

## Your Task

1. Plan the implementation for **only** milestone 4 as defined in the PRD.
2. Build the Compilation Engine and Schema Validators in `design-os/server/compilation/`:
   - `design-os/server/compilation/schema.ts` : Schémas Zod stricts pour les projets, entités de données, champs, relations, et capacités techniques (`auth.google`, `payments.stripe`, `database.postgresql`, etc.).
   - `design-os/server/compilation/engine.ts` : Moteur de compilation déterministe fusionnant les réponses d'interview et les gabarits pour produire les 6 documents de spécifications (`product-overview.md`, `data-shape.md`, `prd.md`, `product-roadmap.md`, `prompts/`, `soul.md`).
   - `design-os/server/compilation/generators/clientMilestonesLog.ts` : Générateur du fichier `milestones.log` sur-mesure pour le projet du client, pré-configuré avec les jalons découpés selon la méthode BM PRD.
   - `design-os/server/compilation/capabilities/` : Définition modulaire des capacités avec injection de schémas de données associés (exemple : `authGoogle.ts` injecte la table `oauth_accounts` et les secrets requis).
   - Mettre à jour `design-os/src/lib/product-health.ts` pour relier le moteur d'audit au modèle de données et garantir le score 100/100 si tous les contrats sont satisfaits.
3. Verify your work against the "Done when" criteria:
   - Exécuter le test de compilation sur un payload JSON témoin représentant une application SaaS typique.
   - Vérifier que les 6 documents markdown et le `milestones.log` généré sont 100% valides et non vides.
   - Vérifier que le score de santé produit calculé par `product-health.ts` atteint 100/100.
   - Commit et push vers `Alpha2-far/scaffold-saas.git`, validation par GitHub Actions.
4. When complete, write `_build_plan/milestones/4-compilation-zod-capabilities/milestone-log.md` and append its content to the root [`milestones.log`](../../milestones.log):
   - **`## What's new in the app`** at the top.
   - `## What was built`.
   - `## Decisions made during implementation`.
   - `## Notes for Milestone 5`.
   - `## Deviations from PRD`.

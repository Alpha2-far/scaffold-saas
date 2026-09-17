# Milestone 3 — Interface Triptyque avec Rail 56px & Live Canvas WYSIWYB

You are entering plan mode to plan and then build milestone 3 of the Scaffold™ SaaS Platform.

## Context

- Read `@blueprint/prd.md` for the visual principles and product invariants.
- Read previous milestone logs: Milestone 1 & 2 in `@blueprint/milestones/` or `@milestones.log`.
- Codebase: `design-os/` (React 19 + Tailwind v4 + Lucide Icons).
- Core UI files: `design-os/src/App.tsx`, `design-os/src/components/ThemeStudio.tsx`, `design-os/src/presets/`.

## Invariant Matériel & Règles d'Exécution

> [!CRITICAL]
> **Décharge Matérielle Obligatoire (Mac Local ➔ GitHub Actions)** :
> - ⛔ **NE JAMAIS exécuter** `npm run build` ou `npx tsc -b` sur cette machine locale.
> - ✅ **Test local léger autorisé** :
>   ```bash
>   npm run dev
>   ```
> - Inspecter visuellement dans Chrome à l'adresse `http://localhost:3000/`.
> - Validation complète (bundle, ESLint, TypeScript) déléguée aux runners cloud **GitHub Actions**.

## Your Task

1. Plan the implementation for **only** milestone 3 as defined in the PRD.
2. Build the visual triptych interface:
   - `design-os/src/components/NavigationRail.tsx` : Rail vertical escamotable de 56 px de large (`w-14`), contenant les icônes de navigation (Projets, Conception, Données, Thèmes, Export) avec infobulles contextuelles.
   - `design-os/src/components/AgentConsole.tsx` : Console de dialogue centrale (40% de largeur sur desktop 13"-14"), connectée au flux SSE du serveur Bun. Intègre les cartes de sélection et confirmation interactives (*recommend-then-confirm*).
   - `design-os/src/components/LiveCanvas.tsx` : Pare-brise WYSIWYB interactif (60% de largeur), affichant en temps réel le Shell de l'application cliente et le maquettage d'écrans. Connecté au sélecteur des 43 thèmes locaux compilés.
   - `design-os/src/components/cards/RecommendationCard.tsx` : Carte d'option interactive permettant au créateur de valider ou modifier un choix sans jamais taper de commande slash.
   - Mettre à jour `design-os/src/App.tsx` pour orchestrer le triptyque (Rail 56px + Console 40% + Canvas 60%) sans aucun défilement horizontal.
3. Verify your work against the "Done when" criteria:
   - Ouvrir Chrome en mode responsive 1280x800 (simulant un MacBook 13"-14").
   - Vérifier que le rail occupe exactement 56 px et que l'asymétrie 40/60 est respectée sans overflow.
   - Changer de thème sur le Live Canvas et vérifier la mise à jour instantanée des couleurs et typographies.
   - Commit et push vers `Alpha2-far/scaffold-saas.git`, validation par GitHub Actions.
4. When complete, write `blueprint/milestones/3-interface-triptyque-canvas/milestone-log.md` and append its content to the root [`milestones.log`](../../milestones.log):
   - **`## What's new in the app`** at the top.
   - `## What was built`.
   - `## Decisions made during implementation`.
   - `## Notes for Milestone 4`.
   - `## Deviations from PRD`.

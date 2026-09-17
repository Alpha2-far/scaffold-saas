# Milestone 3 — Interface Triptyque avec Rail 56px & Live Canvas WYSIWYB

You are entering plan mode to plan and then build milestone 3 of the Scaffold™ SaaS Platform.

---

## 🎯 1. OBJECTIF
Donner vie au « Figma des Développeurs » dans le navigateur avec l'aménagement ergonomique triptyque (Rail 56px + Console 40% + Live Canvas 60%), la suppression des commandes slash et l'intégration interactive des 43 thèmes locaux d'auteur.

---

## 📚 2. CONTEXTE & FICHIERS CONCERNÉS
- **Documents de référence Instatic obligatoires** :
  - `@_build_plan/prd.md` : PRD officiel (Section 1 & Milestone 3).
  - `@_build_plan/milestones/2-openrouter-sse/milestone-log.md` : Streaming et session de chat.
  - `@docs/interface.md` : Spécification triptyque et dimensions responsive.
  - `@docs/design.md` : Tokens sémantiques OKLCH, contrastes AAA, 43 thèmes locaux.
  - `@docs/ux.md` : Cartes interactives *recommend-then-confirm*.
- **Fichiers physiques à créer/modifier dans `design-os/src/`** :
  - `src/components/NavigationRail.tsx` : Rail vertical escamotable de 56 px avec icônes et infobulles.
  - `src/components/AgentConsole.tsx` : Console de chat reliée au flux SSE.
  - `src/components/LiveCanvas.tsx` : Pare-brise WYSIWYB interactif multi-vues avec sélecteur de thème.
  - `src/components/cards/RecommendationCard.tsx` : Cartes de choix à micro-ressort haptique.
  - `src/App.tsx` : Orchestration du layout responsive triptyque.

---

## ⛔ 3. CONTRAINTES
- **Décharge Matérielle Obligatoire** : Ne pas lancer `npm run build` en local. Tester visuellement avec `npm run dev`.
- **Zéro Défilement Horizontal** : L'interface doit être irréprochable sur résolution standard 1280x800 (MacBook 13"-14").
- **Zéro Commande Slash** : Aucune commande terminal ne doit être exposée ou demandée à l'utilisateur final.

---

## ✅ 4. CRITÈRES DE SUCCÈS & VÉRIFICATION
1. **Rendu Visuel 1280x800** : Le rail occupe exactement 56 px, la console et le canvas respectent l'asymétrie 40/60 sans overflow.
2. **Réactivité Thèmes Live Canvas** : Le changement de thème met à jour instantanément les 12 tokens sémantiques.
3. **Consignation & Journalisation** :
   - Rédiger `_build_plan/milestones/3-interface-triptyque-canvas/milestone-log.md`.
   - Ajouter l'entrée dans `milestones.log` et mettre à jour `AGENT_DISPATCH.md`.
4. **Validation CI/CD Cloud** : Push sur `origin/main` validé vert par GitHub Actions.

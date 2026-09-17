# Milestone 4 — Moteur de Structuration Déterministe Zod & `milestones.log` Client

You are entering plan mode to plan and then build milestone 4 of the Scaffold™ SaaS Platform.

---

## 🎯 1. OBJECTIF
Bâtir le moteur de compilation déterministe validé par Zod pour produire automatiquement les 6 documents de spécification et générer le journal `milestones.log` projet personnalisé du client, tout en certifiant le score santé 100/100 (`product-health.ts`).

---

## 📚 2. CONTEXTE & FICHIERS CONCERNÉS
- **Documents de référence Instatic obligatoires** :
  - `@_build_plan/prd.md` : PRD officiel (Section 2 & Milestone 4).
  - `@_build_plan/milestones/3-interface-triptyque-canvas/milestone-log.md` : Interface et Canvas.
  - `@docs/features/compilation-engine.md` : Moteur de compilation et templates markdown.
  - `@docs/features/export-engine.md` : Livrables et injection de `milestones.log`.
  - `@docs/features/brownfield-intake.md` : Intake et format `scaffold-intake.json`.
  - `@src/lib/product-health.ts` : Moteur d'audit de santé à synchroniser.
- **Fichiers physiques à créer/modifier dans `design-os/server/compilation/`** :
  - `server/compilation/schema.ts` : Schémas Zod stricts entités, capacités et périmètres.
  - `server/compilation/engine.ts` : Compilateur déterministe générant les 6 documents.
  - `server/compilation/generators/clientMilestonesLog.ts` : Générateur du `milestones.log` client.
  - `server/compilation/capabilities/authGoogle.ts` : Étude de cas capacité Google Auth.
  - `src/lib/product-health.ts` : Validation des 4 contrats et score 100/100.

---

## ⛔ 3. CONTRAINTES
- **Décharge Matérielle Obligatoire** : Ne pas lancer `npm run build` en local. Tester avec `bun test server/compilation`.
- **Déterminisme Absolu** : Pour un même payload JSON d'interview, le compilateur doit produire des fichiers rigoureusement identiques au caractère près.
- **Zéro Régression Audit** : Le score santé `product-health.ts` doit atteindre 100/100.

---

## ✅ 4. CRITÈRES DE SUCCÈS & VÉRIFICATION
1. **Compilation Test Réussie** : Test unitaire sur payload JSON témoin émettant les 6 documents de spécification et un `milestones.log` client complet.
2. **Score Santé Certifié** : Audit `product-health.ts` validé à 100/100.
3. **Consignation & Journalisation** :
   - Rédiger `_build_plan/milestones/4-compilation-zod-capabilities/milestone-log.md`.
   - Ajouter l'entrée dans `milestones.log` et mettre à jour `AGENT_DISPATCH.md`.
4. **Validation CI/CD Cloud** : Push sur `origin/main` validé vert par GitHub Actions.

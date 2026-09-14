# Scope Lock & BM PRD Integration (Scaffold™)

Ce standard définit le cœur fonctionnel de Scaffold™ : le **verrouillage déterministe du périmètre (Scope Lock)** pour éradiquer le *vibe coding* et le *feature creep*.

---

## 1. La Règle Universelle d'Interrogation `ASK`

Scaffold™ interdit le verrouillage propriétaire (*vendor lock-in*) sur `AskUserQuestion`.
Dans toutes les commandes (`/product-vision`, `/product-roadmap`, `/data-shape`, `/shape-section`, `/design-screen`) :
* Si exécuté par **Claude Code** ➔ utiliser `AskUserQuestion`.
* Si exécuté par **Antigravity** ➔ utiliser `ask_question`.
* Si exécuté par **Cursor / terminal texte / Codex** ➔ poser la question formatée en Markdown avec choix numérotés (`1. Option A`, `2. Option B`).

---

## 2. Double Sortie Déterministe (`/product-vision`)

La commande `/product-vision` (alias `/bm-prd`) génère obligatoirement une double sortie :

1. **Côté Visual Workspace (pour allumer l'UI Design OS)** :
   * `product/product-overview.md` (avec titre, description, `## Problems & Solutions`, `## Key Features`, et obligatoirement `## Out of Scope (V1)`).
   * `product/product-roadmap.md` (sections UI sous format `### N. Title`).
   * `product/data-shape/data-shape.md` (entités et relations).
2. **Côté Architecture & Spec (pour les coding agents)** :
   * `product/prd.md` : Le PRD complet et exhaustif, incluant le Core Purpose et la matrice Out-of-Scope inviolable.

---

## 3. Le Garde-Fou de Synchronisation (PRD Sync Guard)

Dans `/product-roadmap` et `/data-shape` :
* Si `product/prd.md` existe, toute modification d'entité ou de section doit être vérifiée contre le périmètre validé.
* **Règle absolue** : Si l'utilisateur ou l'agent tente d'ajouter une entité ou une section servant une fonctionnalité listée dans `## Out of Scope (V1)`, la commande **doit refuser l'ajout** et exiger une réévaluation explicite via `/product-vision`.

---

## 4. Protection à l'Exportation (`/export-product`)

Lors de la commande `/export-product` :
1. `product/prd.md` est systématiquement copié dans `product-plan/prd.md`.
2. La section `## Out of Scope (V1)` est insérée en tête de `product-plan/product-overview.md`.
3. Les prompts d'entrée (`one-shot-prompt.md` et `section-prompt.md`) intègrent une référence obligatoire `@product-plan/prd.md` avec consigne stricte de refuser toute implémentation hors-périmètre.

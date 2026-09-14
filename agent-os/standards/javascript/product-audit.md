# Product Audit & Live Health Engine (Scaffold™)

Scaffold™ dispose d'un moteur d'audit pré-export déterministe à double face :
1. **En ligne de commande** : `/product-audit` (alias `/scaffold-audit`).
2. **Dans le navigateur** : `src/lib/product-health.ts` affiché en direct par `src/components/StatusConsole.tsx`.

Les deux moteurs exécutent les **mêmes contrats** avec les **mêmes expressions régulières** sur les fichiers Markdown de `product/`.

---

## 🔬 Les 4 Contrats Déterministes d'Audit

| # | Contrat | Fichiers audités | Règle vérifiée |
|---|---|---|---|
| **1** | **Scope Lock** | `product/prd.md`<br>`product/product-overview.md` | `prd.md` existe et `product-overview.md` possède obligatoirement le miroir exact `## Out of Scope (V1)`. Zéro divergence tolérée. |
| **2** | **Overview Contract** | `product/product-overview.md` | Respecte les regex de `product-loader.ts` : `# Titre`, `## Description`, `## Problems & Solutions`, `## Key Features`. |
| **3** | **Roadmap & Ghost Detection** | `product/product-roadmap.md` | `## Sections` présent, chaque section sous forme `### N. Title`. **Anti-Ghost Guard** : vérifie qu'aucun heading `### N.` n'est imbriqué dans une autre section, ce qui créerait des sections fantômes dans l'UI. |
| **4** | **Data Shape Contract** | `product/data-shape/data-shape.md` | Respecte les regex de `data-shape-loader.ts` : `## Entities`, `### NomEntité`, `## Relationships`. |

---

## 📊 États d'Audit du Système (`TileState`)

Le verdict renvoyé par le moteur d'audit est mathématique :
* **`ok` (`[PASS]`)** : Les 4 checks sont validés à 100%. Le périmètre est scellé, l'exportation vers les agents de code est autorisée.
* **`fail` (`[FAIL]`)** : Une incohérence, un contrat regex brisé ou une section fantôme a été détectée. L'export doit être bloqué.
* **`warn` (`[WARN]`)** : Une spec de section contient un terme suspect appartenant à la matrice hors-périmètre.
* **`idle` (`[IDLE]`)** : Aucun fichier produit n'existe encore. L'emblème Scaffold entre en respiration lumineuse douce (`ScaffoldLogoLoader size="sm"`).

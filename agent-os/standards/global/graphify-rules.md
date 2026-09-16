# Graphify Knowledge Graph & Zero-Regression Rules

> **Standard Agent OS — Scaffold™**
> Lecture, navigation et analyse d'impact de la codebase par le graphe de connaissance
> Graphify, et invariant de synchronisation du graphe.

---

## 0. Le contrat de lecture

Avant toute inspection manuelle ou toute implémentation, un agent (Claude Code, Cursor,
Antigravity, Codex) **commence par le graphe**. Le graphe répond en une commande à des
questions qui coûteraient sinon une dizaine de `grep` : qui importe quoi, quel symbole est
un carrefour, quel chemin relie deux modules.

Le graphe vit dans `design-os/.graphify/` et il est **commit-safe** :

| Fichier | Contenu |
|---|---|
| `graph.json` | 398 nœuds, 918 liaisons, 14 communautés. La source de vérité. |
| `GRAPH_REPORT.md` | Rapport lisible : hubs, communautés, connexions inattendues, lacunes. |
| `manifest.json` · `scope.json` | Périmètre d'extraction résolu et fichiers inclus. |

---

## 1. Les commandes réelles (CLI `graphify` ≥ 0.17)

> ⚠️ **`graphify query` et `graphify affected-flows` n'existent pas.** Une version
> antérieure de ce standard les mentionnait ; un agent qui les exécute obtient une erreur.
> La surface réelle est celle ci-dessous — vérifiable par `graphify --help`.

| Besoin | Commande |
|---|---|
| S'orienter dans un dépôt inconnu | `graphify summary` — hubs, communautés, densité, première action suggérée |
| Tout savoir d'un symbole | `graphify explain "<nœud>"` — fichier, ligne, degré, communauté et **toutes** ses liaisons entrantes/sortantes |
| Explorer une zone | `graphify tree "<nœud>" --depth 2` |
| **Analyse d'impact** entre deux points | `graphify path "<source>" "<cible>"` — chemin le plus court |
| Vérifier la fraîcheur | `graphify check-update .` |
| Reconstruire le graphe | `npm run graphify` (= `graphify update . --scope all`) |

Le nœud se désigne par son **label** (`loadProductData`, `ThemeStudio.tsx`) ou son id.

### Requête structurée

Pour tout ce que le CLI n'expose pas directement — « quels fichiers n'ont aucun
consommateur ? », « quels symboles ce fichier exporte-t-il ? » — lire `graph.json`
directement. Sa forme :

```js
const g = JSON.parse(fs.readFileSync('.graphify/graph.json', 'utf8'))
// g.nodes : { id, label, file_type, source_file, source_location, community, community_name }
// g.links : { source, target, relation, confidence, source_file }
//   relation ∈ contains | imports | imports_from | calls | MODIFIES | PARENT_OF | ON_BRANCH
```

**Attention** : les arêtes sont dans `g.links`, pas `g.edges`. Un script qui lit `g.edges`
retourne silencieusement zéro liaison et donne l'illusion d'un graphe vide.

---

## 2. Vérifier la fraîcheur avant de faire confiance au graphe

Le graphe porte le commit sur lequel il a été bâti (`GRAPH_REPORT.md` → *Graph Freshness*).
Avant de s'appuyer sur lui pour une décision :

```bash
git rev-parse HEAD                      # doit correspondre au hash du rapport
graphify check-update .
```

Un graphe périmé est pire qu'aucun graphe : il affirme des dépendances qui n'existent plus.

### Le piège du scope — pourquoi `--scope all`

Le mode par défaut (`auto`) se résout en **`committed`** : seuls les fichiers suivis par Git
sont indexés. Un module créé pendant un jalon et pas encore commité est donc **absent du
graphe**, et un agent qui interroge le graphe avant de toucher au code s'entend répondre
qu'il n'existe pas. C'est exactement l'inverse du service rendu.

`npm run graphify` force donc `--scope all`, qui indexe l'arbre de travail. `node_modules`
et `dist/` restent exclus : ils sont gitignorés. **Le scope n'est pas configurable via
`graphify.yaml` en v0.17** — il n'existe qu'en option de ligne de commande, d'où sa place
dans le script npm.

Vérifier quel scope a réellement été résolu :

```bash
graphify scope inspect .        # ou : cat .graphify/scope.json → resolved_mode
```

---

## 3. Le graphe informe, il ne dispense pas de lire

Le graphe dit **où regarder** et **ce qui casse si on touche**. Il ne dit pas si le code est
correct. La séquence :

1. `graphify summary` / `explain` / `path` — cartographier les dépendances.
2. Lire les fichiers que le graphe a désignés.
3. Modifier.
4. Reconstruire le graphe.

Une conclusion tirée du graphe seul et contredite par le code source : **c'est le code qui
a raison**, et le graphe doit être reconstruit.

---

## 4. Invariant de synchronisation

Après toute modification dans `src/`, `src/presets/` ou `scripts/` :

```bash
npm run graphify        # = graphify update .
```

`graph.json` et `GRAPH_REPORT.md` doivent refléter l'état exact du projet avant que le
jalon soit déclaré terminé.

`graphify update` reconstruit uniquement la partie code. Les descriptions et les noms de
communautés générés par LLM ne sont pas régénérés — `check-update` le signale par
`.graphify_describe_pending`. Ce signal est **attendu** après un rebuild rapide ; il
n'invalide ni la topologie ni les liaisons, qui sont extraites par AST.

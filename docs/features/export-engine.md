# Le Compilateur d'Exportation (Export Engine)

Spécification du moteur d'exportation de la plateforme SaaS Scaffold™ — génération du package développeur déterministe.

Le Compilateur d'Exportation prend les décisions validées lors de l'interview avec l'Agent IA et les composants visuels sculptés dans le studio, pour générer en un clic le package d'instructions hermétique destiné aux agents de code (Claude Code, Cursor, Codex).

---

## TL;DR

- **Livrable V1** : Package hermétique `product-plan/` identique à ce que Scaffold V1 produit (PRD, brief, roadmap, data shape, 43 thèmes, prompts de jalons).
- **Livrable V2 (Futur)** : Génération automatique de l'arborescence `docs/` à 3 niveaux d'Instatic pour les projets créés par les utilisateurs.
- **Porte de compilation pré-export** : L'export est débloqué uniquement si les 4 contrats d'audit (`product-health.ts`) affichent `[PASS]`.
- **Zéro feature creep** : Les prompts d'entrée (`one-shot-prompt.md` et `section-prompt.md`) contiennent l'interdiction contractuelle explicite de coder toute fonctionnalité figurant dans `## Out of Scope (V1)`.

---

## Structure du Package Exporté (V1)

```text
product-plan/
├── README.md                   ← Vue d'ensemble et table d'orientation pour l'agent de code
├── prd.md                      ← Le PRD complet avec matrice Out-of-Scope verrouillée
├── product-overview.md         ← Titre, description, Key Features et miroir Out-of-Scope
├── product-roadmap.md          ← Découpage des sections d'écrans
├── data-shape/
│   └── data-shape.md           ← Dictionnaire des entités et relations métier
├── milestones/
│   ├── 01-foundation/prompt.md ← Prompts séquentiels prêts à exécuter
│   └── ...
├── design-system/
│   ├── DESIGN.md               ← Spécification complète du thème retenu
│   ├── tokens.json             ← Les 19 variables de couleur et élévations
│   └── theme.css               ← Variables CSS Tailwind v4
├── prompts/
│   ├── one-shot-prompt.md      ← Prompt global pour coder l'application entière
│   └── section-prompt.md       ← Prompt pour coder section par section
└── sample-data/                ← Jeux de données factices réalistes
```

---

## Patterns Interdits & Pièges (Gotchas)

- ❌ **Exporter un produit avec des erreurs d'audit** : L'export doit refuser de s'exécuter si le Scope Lock est incomplet ou si des sections fantômes existent.
- ❌ **Oublier la matrice Out-of-Scope dans les prompts de dev** : Les agents de code ont tendance à inventer des fonctionnalités. Citer `@product-plan/prd.md` et la règle de scope stricte dans les prompts est obligatoire.

---

## Related

- [`docs/architecture.md`](../architecture.md) — Vue système
- [`docs/features/scaffold-agent.md`](scaffold-agent.md) — L'Agent IA de cadrage
- Source de vérité du compilateur : `design-os/.claude/commands/design-os/export-product.md`

# Code Synthesizer — Compilateur Déterministe d'Exportation React 19

*Date de création : 18 septembre 2026*  
*Statut : Spécification d'Ingénierie du Compilateur d'Export*  
*Localisation : `docs/features/code-synthesizer.md`*

---

## 1. Vue d'Ensemble & Rôle dans l'Architecture

Le **Code Synthesizer** est le compilateur d'exportation de Scaffold™.  
Il matérialise la promesse de l'Étage 2 défini dans [`docs/features/deterministic-ui-engine.md`](deterministic-ui-engine.md) : **transformer la représentation intermédiaire `UIManifest` en composants React 19 autonomes, lisibles et directement exploitables par des agents de programmation (Claude Code, Cursor).**

> [!IMPORTANT]
> **Zéro Hallucination à l'Export**  
> Le code React exporté **n'est pas improvisé par un modèle LLM lors du téléchargement**.  
> Il est produit par un compilateur déterministe qui substitue les propriétés de l'AST (`UIManifest`) dans des gabarits TypeScript certifiés, garantissant que `npm run build` et `npx tsc` réussissent systématiquement sans avertissement ni bogue de typage.

---

## 2. Le Pipeline de Synthèse en 4 Étapes

```text
[1. UIManifest Validé + Tokens du Thème]
                  │
                  ▼
[2. Traversée de l'Arbre AST (AST Visitor)]
                  │
                  ▼
[3. Injection dans les Gabarits Certifiés React 19]
                  │
                  ▼
[4. Packaging & Empreinte de Sortie (product-plan/components/)]
```

### Étape 1 : Ingestion du Manifeste et Résolution des Tokens
Le compilateur extrait l'identifiant de thème (`theme.presetId`) et charge la table des 12 tokens sémantiques correspondants (`src/presets/`). Les classes Tailwind v4 utilisent les variables CSS natives injectées (ex: `bg-surface-primary`, `text-content-accent`).

### Étape 2 : Traversée de l'Arbre AST
Pour chaque slot présent dans `activeScreen.slots`, le compilateur identifie le type de primitive (`MetricGrid`, `DataTable`, `Chart`, etc.) et extrait les données associées (valeurs, labels, deltas, colonnes, rangées).

### Étape 3 : Injection dans les Gabarits Certifiés
Chaque primitive possède un gabarit TypeScript canonique contenant :
* Les interfaces TypeScript explicites (`Props`).
* La gestion native des états (`empty`, `loading`, `populated`).
* Les balises ARIA et la structure responsive sémantique.
* L'importation ciblée des seules icônes Lucide nécessaires.

### Étape 4 : Écriture dans le Package `product-plan/`
Les fichiers générés sont placés dans le répertoire `product-plan/components/` et référencés dans le journal de guidage `milestones.log`.

---

## 3. Exemple Concret : De l'AST au Code React 19

### Entrée : Fragment d'AST UI-IR
```json
{
  "type": "MetricGrid",
  "state": "populated",
  "columns": 3,
  "metrics": [
    { "label": "Revenu Récurrent Mensuel", "value": "14 250 €", "delta": "+12.4%", "trend": "up" },
    { "label": "Clients Actifs", "value": "412", "delta": "+18", "trend": "up" },
    { "label": "Taux d'Attrition (Churn)", "value": "1.1%", "delta": "-0.3%", "trend": "down" }
  ]
}
```

### Sortie : Fichier Produit `product-plan/components/MetricsGrid.tsx`
```tsx
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface MetricItem {
  label: string;
  value: string;
  delta?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface MetricsGridProps {
  metrics?: MetricItem[];
  state?: 'populated' | 'empty' | 'loading';
}

const DEFAULT_METRICS: MetricItem[] = [
  { label: "Revenu Récurrent Mensuel", value: "14 250 €", delta: "+12.4%", trend: "up" },
  { label: "Clients Actifs", value: "412", delta: "+18", trend: "up" },
  { label: "Taux d'Attrition (Churn)", value: "1.1%", delta: "-0.3%", trend: "down" }
];

export function MetricsGrid({ metrics = DEFAULT_METRICS, state = 'populated' }: MetricsGridProps) {
  if (state === 'loading') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-xl bg-stone-100 dark:bg-stone-800 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((item, idx) => {
        const isUp = item.trend === 'up';
        const isDown = item.trend === 'down';

        return (
          <div
            key={idx}
            className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 shadow-sm flex flex-col justify-between"
          >
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400 truncate">
              {item.label}
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                {item.value}
              </span>
              {item.delta && (
                <div
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                    isUp
                      ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400'
                      : isDown
                      ? 'text-rose-700 bg-rose-50 dark:bg-rose-950/50 dark:text-rose-400'
                      : 'text-stone-600 bg-stone-100 dark:bg-stone-800 dark:text-stone-300'
                  }`}
                >
                  {isUp && <TrendingUp className="w-3 h-3" />}
                  {isDown && <TrendingDown className="w-3 h-3" />}
                  {!isUp && !isDown && <Minus className="w-3 h-3" />}
                  <span>{item.delta}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

---

## 4. Propriétés Inviolables du Code Synthétisé

1. **Autonomie Hermétique** : Chaque composant exporté ne dépend que de React 19, Tailwind CSS v4 et `lucide-react`. Aucune dépendance propriétaire cachée.
2. **Accessibilité Intégrée (a11y)** : Contrastes AAA, balises sémantiques (`<header>`, `<nav>`, `<main>`), attributs `aria-label` sur les icônes interactives.
3. **Pliabilité pour l'Ingénieur Humain** : Le code généré est court (< 120 lignes par composant), commenté et modifiable à la main sans nécessiter d'outillage propriétaire.

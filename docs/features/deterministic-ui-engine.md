# Architecture Decision Record (ADR-004)
# Moteur d'Interface Déterministe & Registre de Primitives Pré-Compilées

*Date de révision : 18 septembre 2026*  
*Statut : Accepté & Normatif*  
*Auteurs : Équipe d'Architecture Scaffold™*  
*Localisation : `docs/features/deterministic-ui-engine.md`*

---

## 1. Contexte & Problème

Dans le prototype initial (`design-os`), l'interface confiait à un agent d'exécution le soin d'écrire des fichiers React/TypeScript bruts (`src/sections/*.tsx`, `src/shell/*.tsx`) à la volée, en comptant sur le serveur de développement Vite (HMR) pour les recompiler dans le navigateur du client.

Cette approche a révélé trois défaillances structurelles majeures :
1. **Pannes de compilation à chaud** : Les modèles de langage hallucinent occasionnellement des imports (icônes Lucide mal orthographiées, dépendances manquantes) ou produisent des balises JSX non fermées. Le navigateur affiche alors un écran d'erreur rouge bloquant.
2. **Latence de re-bundling destructrice** : Même lorsque l'erreur est interceptée en arrière-plan, la boucle « génération (15s) ➔ échec (3s) ➔ relecture & correction (15s) ➔ rebuild (5s) » impose une attente de 40 à 60 secondes par écran, ruinant l'exigence d'un parcours fluide en 3 à 5 minutes chrono.
3. **Collisions spatiales de layout** : L'émission de classes CSS libres avec positionnement non contraint (`absolute`, marges négatives) produit des chevauchements de texte inacceptables sur différentes résolutions.

---

## 2. Décision d'Architecture

Nous découplons formellement la **Visualisation Temps Réel (Live Canvas)** de la **Génération de Code Source (Export)** via une architecture en 2 étages, reliés par une Représentation Intermédiaire typée (**UI-IR**).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ÉTAGE 1 : LE LIVE CANVAS (TEMPS RÉEL DÉTERMINISTE — UI-IR & PRIMITIVES)     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Intention Client ➔ Agent IA ➔ Schéma UI-IR (JSON validé par Zod)          │
│                                       │                                     │
│                                       ▼ (< 1 ms en mémoire)                 │
│                 ┌──────────────────────────────────────────┐                │
│                 │      REGISTRE DE PRIMITIVES PAR FAMILLES │                │
│                 │   (Composants React pré-compilés en RAM) │                │
│                 │   • Foundation / Navigation / Data       │                │
│                 │   • Input / Feedback / Composite         │                │
│                 └──────────────────────────────────────────┘                │
│                                       │                                     │
│                                       ▼ (< 16 ms au DOM)                    │
│                        AFFICHAGE FLUIDE SANS COMPILATION                    │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ ÉTAGE 2 : L'EXPORT COMPILER (SYNTHÈSE STATIQUE DE CODE REACT 19 PROPRE)     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Validation 100/100 ➔ UI-IR Validé ➔ Moteur de Synthèse Déterministe       │
│                                       │                                     │
│                                       ▼                                     │
│                     COMPOSANTS REACT 19 + TAILWIND V4 PURS                  │
│                     • src/components/DashboardShell.tsx                     │
│                     • src/components/MetricsOverview.tsx                    │
│                     • src/components/TransactionsTable.tsx                  │
│                     (Typés, modulaires, exempts de dette technique)         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Garanties Techniques Réelles :
* **Exclusion des erreurs de compilation dynamiques** : Le Live Canvas n'exécute aucun code TSX compilé à la volée. Les composants du registre sont pré-compilés dans le bundle de production de Scaffold.
* **Accélération du streaming** : Émettre un objet JSON structuré consomme 70 à 80 % de tokens en moins qu'un composant TSX brut de 300 lignes, permettant un affichage complet en 2 à 3 secondes.
* **Confinement spatial strict** : Chaque primitive est encapsulée dans une cellule CSS Grid bornée (`minmax(0, 1fr)`) avec troncature systématique des débordements textuels.

---

## 3. Le Registre de Primitives Organisé par Familles

Pour éviter l'écueil d'une interface monolithique trop rigide, le registre de primitives s'organise en 5 familles modulaires :

```
PRIMITIVE REGISTRY
├── 1. FOUNDATION
│   ├── GridSlot          (Grille responsive 1 à 4 colonnes, gap configurable)
│   ├── StackSlot         (Empilement vertical ou horizontal avec espacement contrôlé)
│   └── ContainerSlot     (Boîte avec padding, bordure et fond thématique)
│
├── 2. NAVIGATION
│   ├── SidebarNav        (Rail 56px escamotable avec icônes et badges)
│   ├── TopbarNav         (Barre supérieure avec titre, profil et recherche)
│   └── TabNav            (Navigation par onglets de section)
│
├── 3. DATA & VISUALISATION
│   ├── MetricGrid        (Cartes KPI : label, valeur, delta, tendance colorée)
│   ├── DataTable         (Tableau dynamique : colonnes, pagination, badges de statut)
│   ├── ChartPrimitive    (Courbes / Barres SVG légères pour finance et métriques)
│   ├── ActivityTimeline  (Flux chronologique d'événements et de logs métier)
│   └── StatusKanban      (Colonnes de cartes de suivi de statut)
│
├── 4. INPUT & CONTRÔLE
│   ├── FormDrawer        (Tiroir latéral de saisie : champs typés, switches, validation)
│   └── FilterBar         (Bandeau de recherche textuelle et filtres par statut)
│
└── 5. FEEDBACK & ÉTATS
    ├── EmptyStateCta     (État vierge accueillant avec illustration et bouton d'action)
    ├── AlertBanner       (Bandeau d'information, warning ou succès)
    └── SkeletonSlot      (Animation de chargement préliminaire)
```

---

## 4. Contrat du Schéma UI-IR (`server/schema/ui-manifest.ts`)

L'Agent IA communique exclusivement via une Représentation Intermédiaire JSON validée par Zod.  
Le schéma intègre le versioning, la thématisation, la gestion des états (`state`) et des bornes de longueur réalistes accompagnées d'une politique d'auto-sanitisation.

```typescript
import { z } from 'zod';

// États d'affichage supportés par les primitives de données
export const UIStateSchema = z.enum(['populated', 'empty', 'loading', 'partial']).default('populated');

// 1. Primitive Métriques (KPIs)
export const MetricItemSchema = z.object({
  label: z.string().max(80),
  value: z.string().max(40),
  delta: z.string().max(30).optional(),
  trend: z.enum(['up', 'down', 'neutral']).default('neutral'),
  span: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(1),
  dataPoints: z.array(z.number()).min(2).max(30).optional(),
});

export const MetricGridPrimitiveSchema = z.object({
  type: z.literal('MetricGrid'),
  state: UIStateSchema,
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).default(3),
  metrics: z.array(MetricItemSchema).min(1).max(8),
});

// 2. Primitive Table de Données
export const DataTablePrimitiveSchema = z.object({
  type: z.literal('DataTable'),
  state: UIStateSchema,
  title: z.string().max(100),
  columns: z.array(z.string().max(40)).min(2).max(8),
  rows: z.array(z.record(z.string().max(150))).max(15),
  emptyMessage: z.string().max(120).optional(),
});

// 3. Primitive Graphique SVG Léger
export const ChartPrimitiveSchema = z.object({
  type: z.literal('Chart'),
  state: UIStateSchema,
  title: z.string().max(100),
  chartType: z.enum(['line', 'bar', 'area']),
  dataPoints: z.array(z.object({
    label: z.string().max(30),
    value: z.number(),
  })).min(2).max(12),
});

// 4. Primitive Timeline d'Activité
export const ActivityTimelinePrimitiveSchema = z.object({
  type: z.literal('ActivityTimeline'),
  state: UIStateSchema,
  title: z.string().max(100),
  events: z.array(z.object({
    id: z.string(),
    title: z.string().max(80),
    timestamp: z.string().max(40),
    status: z.enum(['completed', 'pending', 'failed', 'info']),
  })).max(8),
});

// 5. Primitive En-tête Hero
export const HeroHeaderPrimitiveSchema = z.object({
  type: z.literal('HeroHeader'),
  headline: z.string().max(120),
  description: z.string().max(300),
  primaryCta: z.object({
    label: z.string().max(40),
    icon: z.string().optional(),
  }),
});

// 6. Primitive Tiroir de Formulaire
export const FormDrawerPrimitiveSchema = z.object({
  type: z.literal('FormDrawer'),
  title: z.string().max(80),
  fields: z.array(z.object({
    id: z.string(),
    label: z.string().max(60),
    type: z.enum(['text', 'email', 'number', 'select', 'switch']),
    placeholder: z.string().max(80).optional(),
    required: z.boolean().default(false),
  })).max(10),
});

// 7. Primitive État Vierge (Empty State)
export const EmptyStatePrimitiveSchema = z.object({
  type: z.literal('EmptyState'),
  title: z.string().max(80),
  description: z.string().max(200),
  ctaLabel: z.string().max(40),
});

// Discriminated Union de tous les slots supportés
export const SlotPrimitiveSchema = z.discriminatedUnion('type', [
  MetricGridPrimitiveSchema,
  DataTablePrimitiveSchema,
  ChartPrimitiveSchema,
  ActivityTimelinePrimitiveSchema,
  HeroHeaderPrimitiveSchema,
  FormDrawerPrimitiveSchema,
  EmptyStatePrimitiveSchema,
]);

// Contrat Maître UIManifest
export const UIManifestSchema = z.object({
  version: z.enum(['1.0', '1.1']).default('1.0'),
  theme: z.object({
    presetId: z.string().default('midnight-neon'),
    accentColor: z.string().default('emerald'),
    density: z.enum(['compact', 'comfortable']).default('comfortable'),
  }),
  shell: z.object({
    brandName: z.string().min(2).max(50),
    layout: z.enum(['sidebar-rail', 'stacked-header', 'split-view']),
    navItems: z.array(z.object({
      id: z.string(),
      label: z.string().max(40),
      icon: z.string(),
      badge: z.string().max(10).optional(),
      isActive: z.boolean().default(false),
    })).min(1).max(8),
  }),
  activeScreen: z.object({
    id: z.string(),
    title: z.string().max(80),
    description: z.string().max(200).optional(),
    slots: z.array(SlotPrimitiveSchema).min(1).max(6),
  }),
});

export type UIManifest = z.infer<typeof UIManifestSchema>;
```

### Politique de Tolérance & Troncature en Cas de Dépassement :
* Si un modèle génère une chaîne excédant une borne Zod, le validateur d'ingestion applique une **troncature silencieuse avec ellipse** plutôt qu'un rejet fatal d'exception.
* Si le JSON est syntaxiquement corrompu, le système effectue une reprise immédiate vers le dernier état valide en conservant l'écran affiché.

---

## 5. Le Moteur de Composition (Composition Engine)

Pour éviter que l'IA ne combine des primitives de manière absurde (ex: empiler 4 tables de 15 colonnes ou insérer un FormDrawer à l'intérieur d'un en-tête), une couche de règles logiques gouverne la composition avant l'émission du manifeste :

1. **Règle de Densité Verticale** : Un écran comporte au maximum 1 Hero ou 1 MetricGrid au premier niveau, suivi d'au maximum 2 slots de données (Table, Chart ou Timeline).
2. **Règle de Cohérence d'État** : Si une DataTable déclare `state: 'empty'`, le composant substitue automatiquement les rangées par son sous-composant `emptyMessage` ou renvoie vers un `EmptyStateCta`.
3. **Règle de Contextualisation des Données** : L'Agent a l'interdiction d'émettre des données d'exemple génériques (*"Item 1"*, *"0000"*). Les chiffres d'affaires, devises (EUR, FCFA, USD) et libellés d'actions doivent refléter strictement le domaine métier validé dans l'intake.

---

## 6. Synthèse de Code à l'Export (Étage 2)

Le rôle de Scaffold™ n'est pas d'être un hébergeur d'applications ou un générateur monolithique complet. Scaffold est un **Visual Workspace & Pre-Code Intelligence Layer**.

Lors de l'exportation (`product-plan.zip`), le **Code Synthesizer** traduit l'AST validé en composants React 19 autonomes :
* Chaque primitive instanciée est traduite en un fichier TypeScript propre (ex: `src/components/MetricsGrid.tsx`).
* Le style Tailwind v4 dérive directement des 12 tokens sémantiques du thème choisi.
* L'archive contient les interfaces TypeScript explicites, le modèle de données relationnel (`data-shape.md`), les contrats d'API et le journal d'exécution `milestones.log` prêt pour Claude Code ou Cursor.
* *Spécification détaillée du compilateur : [`docs/features/code-synthesizer.md`](code-synthesizer.md).*

---

## 7. Limites Connues & Compromis Assumés (Trade-offs)

| Dimension | Choix Retenu | Compromis Assumé | Justification |
|---|---|---|---|
| **Expressivité Visuelle** | Catalogue borné de 12 primitives d'interface réparties en 5 familles. | Impossibilité de dessiner des interfaces 100% libres ou atypiques (jeux, canvas 3D). | 95% des SaaS B2B/B2C reposent sur ces structures fondamentales. La fiabilité et la vitesse priment sur l'exhaustivité infinie. |
| **Génération Live** | AST JSON structuré sans code TSX. | Pas d'exécution de code arbitraire client dans le navigateur. | Supprime 100 % des crashes de build et garantit un affichage en moins de 3 secondes. |
| **Complexité Interne vs Externe** | Moteur interne sophistiqué (Zod, AST, 5 familles). | Interface externe ultra-courte (3 à 5 minutes chrono, zéro jargon). | L'utilisateur n'a pas à connaître les rouages internes ; il doit seulement voir son produit vivre et repartir avec son blueprint. |

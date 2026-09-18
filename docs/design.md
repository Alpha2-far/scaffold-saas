# Design System & Visual Tokens — Spécification Visuelle

*Date de révision : 16 septembre 2026*  
*Statut : Document de référence du Design System*  
*Localisation : `docs/design.md`*

---

## 1. Identité Visuelle & Signature Scaffold™

Scaffold™ adopte une direction artistique haut de gamme, technique et rassurante, combinant la profondeur d'un bleu nuit spatial et la précision chirurgicale d'un vert électrique haute énergie.

### Palette Maîtresse (Tokens OKLCH 2026) :
* **Midnight Navy (Background Principal)** : `oklch(0.14 0.03 260)` (`#0a0d14`)
  - Fond immersif, éliminant la fatigue visuelle, profondeur sans noir absolu.
* **Surface Concentrique (Cards & Panels)** : `oklch(0.18 0.03 260)` (`#101522`)
  - Surface surélevée avec bordures translucides fines (`border-white/10`).
* **Vert Électrique (Accent & Succès)** : `oklch(0.85 0.22 150)` (`#00f08a`)
  - Signal d'action principale, validation des contrats de santé, badges de statut actifs.
* **Cyan Signal (Focus & Précision)** : `oklch(0.78 0.16 210)` (`#00d2ff`)
  - Accentuation des sélections actives et indicateurs de streaming.

---

## 2. La Matrice des 12 Tokens Sémantiques Universels

Tous les composants de la plateforme consomment strictement ces 12 variables sémantiques définies dans `src/index.css` :

| Token Sémantique | Rôle UI | Valeur Dark Mode | Valeur Light Mode |
|---|---|---|---|
| `--background` | Fond de page principal | `oklch(0.14 0.03 260)` | `oklch(0.98 0.005 260)` |
| `--surface` | Panneaux, sidebar, rail | `oklch(0.18 0.03 260)` | `oklch(0.95 0.01 260)` |
| `--card` | Conteneurs de contenu | `oklch(0.20 0.03 260)` | `oklch(1.0 0 0)` |
| `--primary` | Actions majeures, CTA | `oklch(0.85 0.22 150)` | `oklch(0.45 0.18 150)` |
| `--primary-foreground` | Texte sur bouton primaire | `oklch(0.10 0.03 260)` | `oklch(0.99 0 0)` |
| `--secondary` | Boutons secondaires, tags | `oklch(0.26 0.04 260)` | `oklch(0.92 0.01 260)` |
| `--accent` | Surbrillance, highlights | `oklch(0.78 0.16 210)` | `oklch(0.50 0.15 210)` |
| `--text-primary` | Titres, texte principal | `oklch(0.96 0.01 260)` | `oklch(0.15 0.02 260)` |
| `--text-secondary` | Sous-titres, explications | `oklch(0.70 0.02 260)` | `oklch(0.40 0.02 260)` |
| `--border` | Séparateurs, bordures cards | `rgba(255, 255, 255, 0.10)` | `rgba(0, 0, 0, 0.08)` |
| `--destructive` | Alertes, suppressions | `oklch(0.65 0.22 25)` | `oklch(0.55 0.20 25)` |
| `--ring` | Anneaux de focus accessible | `oklch(0.85 0.22 150)` | `oklch(0.45 0.18 150)` |

---

## 3. Typographie & Lisibilité Technique

Le système typographique combine clarté d'interface et rigueur de code :

* **Police d'Interface (Sans-Serif)** : `InterVariable`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`.
  - Utilisée pour l'ensemble des textes, boutons, dialogues de l'Agent et labels.
  - Graisses : Regular (400), Medium (500), Semibold (600), Bold (700).
* **Police Technique & Données (Monospace)** : `JetBrains Mono`, `Fira Code`, `monospace`.
  - Utilisée pour les noms d'entités, tokens, slugs d'API, métriques d'audit et variables d'environnement.

---

## 4. Le Catalogue des 43 Thèmes d'Auteur Locaux (`src/presets/`)

Scaffold intègre un moteur propriétaire de 43 presets de styles complets compilés en local :
* **Autonomie totale** : Aucun appel réseau externe pour charger des thèmes.
* **Composition d'un preset** :
  - Palette chromatique (5 nuances harmonisées).
  - Paire typographique (Titre + Corps).
  - Rayons de courbure des bordures (`radius`: sm, md, lg, full).
  - Densité d'espacement et ombres portées.
* **Sélection instantanée** : L'utilisateur commute de thème d'un clic dans le Theme Studio, et le Live Canvas met à jour l'intégralité des composants sans aucun clignotement.

---

## 5. Primitives UI & Interactions Haptiques

1. **Boutons Haptiques** :
   - Micro-interaction au clic : `active:scale-[0.98] transition-transform duration-100`.
   - Lueur néon subtile sur focus : `focus-visible:ring-2 focus-visible:ring-[var(--primary)]`.
2. **Badges Pulsants d'État** :
   - Indicateur rond de 8 px avec halo pulsant (`animate-ping`) marquant la session active ou l'audit réussi.
3. **Surfaces Concentriques (Concentric Radii)** :
   - Les cartes imbriquées adaptent leurs arrondis : conteneur externe `rounded-2xl` (16px), carte interne `rounded-xl` (12px), bouton interne `rounded-lg` (8px).
4. **Surfaces Glassmorphism** :
   - Flou d'arrière-plan haute fidélité : `backdrop-blur-md bg-white/5 border border-white/10`.

---

## 6. Design Intelligence & Standards Visuels des Primitives

Pour garantir des interfaces de niveau professionnel adaptées à chaque métier sans tomber dans le piège des recettes uniformes :

1. **Lumière Zénithale & Micro-Biseaux** : Biseau supérieur discret (`border-t border-t-white/15` en dark, `border-t-stone-100` en light), structure intérieure (`ring-1 ring-inset ring-white/5`), et ombre portée douce.
2. **Surfaces Concentriques & Dégradés Subtils** : Voile translucide `bg-gradient-to-b from-white/[0.05] to-transparent` et emboîtement parfait des arrondis (`rounded-2xl` ➔ `rounded-xl` ➔ `rounded-lg`).
3. **Typographie Optique** : Chiffres de métriques denses (`tracking-tight tabular-nums`) et micro-labels en capitales discrètes (`text-[11px] uppercase tracking-wider`).
4. **Visualisation Pertinente & Rigueur Numérique** : Sparklines affichées uniquement si des `dataPoints` réels sont fournis (anti-cargo cult) et balises conformes WCAG (`motion-safe:animate-pulse`, max 2 par écran).
5. **Asymétrie Dynamique Supportée** : Métrique maîtresse (`span: 2`) flanquée de satellites (`span: 1`), avec repli automatique sur mobile.
6. **Tables Métier Rigoureuses** : Alignement gauche pour les entités, alignement droit monospacé pour montants et dates (`font-mono text-right`).
7. **Règle Fondamentale : Le Design Sert le Produit** : Clarté ➔ Hiérarchie ➔ Utilité ➔ Cohérence ➔ Esthétique.

*Document normatif complet : [`docs/reference/design-intelligence.md`](reference/design-intelligence.md).*


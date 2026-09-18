# Manuel de l'Artisanat Visuel des Designers Experts
## Les 6 Lois du Rendu Premium Apple & Linear Grade

*Date de création : 18 septembre 2026*  
*Statut : Standard d'Excellence Esthétique Scaffold™*  
*Localisation : `docs/reference/expert-designer-rules.md`*

---

## 1. Pourquoi les Interfaces IA Sont Fades (Le Constat Sans Concession)

99 % des interfaces générées par IA souffrent d'une indigence visuelle immédiate :
* Des boîtes grises plates avec une bordure uniforme terne (`border-zinc-700`).
* Des textes jetés sans hiérarchie optique, avec une typographie lâche et des chiffres banals.
* Des données fictives creuses (*« Produit 1 »*, *« 100 € »*, *« Description »*).
* Une absence totale de profondeur, d'atmosphère, de reflets de lumière et de rythme spatial.

**Scaffold™ refuse cette médiocrité.**  
Un produit conçu sur Scaffold doit donner l'impression immédiate d'avoir été dessiné par les directeurs de design de **Linear, Stripe, Apple, Raycast ou Vercel**.

---

## 2. Les 6 Lois de l'Artisanat Visuel des Designers Experts

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              LES 6 LOIS DE L'ARTISANAT VISUEL EXPERT (SCAFFOLD™)            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. LUMIÈRE ZÉNITHALE & MICRO-BISEAUX (Reflet blanc 1px sur l'arête haute) │
│  2. SURFACES CONCENTRIQUES & DÉGRADÉS INVISIBLES (from-white/4 to-transparent)│
│  3. TYPOGRAPHIE OPTIQUE (tracking-tight, tabular-nums, micro-capitales)     │
│  4. MICRO-TEXTURES DE DONNÉES (Sparklines SVG, balises pulsantes vivantes)  │
│  5. ASYMÉTRIE DYNAMIQUE DU SQUELETTE (Hero KPI 2 colonnes + satellites)     │
│  6. TABLES ÉLECTROMÉNAGÈRES (Montants alignés à droite, avatars, statuts)   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Loi 1 : La Lumière Zénithale & Les Micro-Biseaux (Hairline Highlights)
Dans le monde physique, un MacBook en aluminium ou un iPhone n'a jamais de bordure unie. La lumière venant du haut crée un **micro-biseau lumineux sur l'arête supérieure**.
* **Implémentation CSS dans nos Primitives** :
  ```css
  /* Arête supérieure lumineuse (lumière zénithale) */
  border-t border-t-white/15 dark:border-t-white/20
  
  /* Anneau de structure intérieur discret */
  ring-1 ring-inset ring-white/5
  
  /* Double ombre portée soyeuse */
  shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]
  ```
* **Effet** : La carte se détache immédiatement du fond avec une élégance chirurgicale.

---

### Loi 2 : Les Surfaces Concentriques & Dégradés Invisibles
Une carte premium n'est jamais un rectangle monochrome plat.
* **Le Dégradé Subtil de Surface** :
  `bg-gradient-to-b from-white/[0.05] via-white/[0.01] to-transparent`
* **Rayons Concentriques (Concentric Radii Rule)** :
  * Panneau conteneur externe : `rounded-2xl` (16 px)
  * Carte intérieure : `rounded-xl` (12 px)
  * Bouton ou badge intérieur : `rounded-lg` (8 px)
  * L'écart entre les arrondis préserve la courbure naturelle de l'œil humain.

---

### Loi 3 : La Typographie Optique & Le Rythme Spatial
La typographie porte 80 % de l'émotion premium d'un produit :
1. **Les Métriques Chiffrées** :
   - `text-3xl font-semibold tracking-tight tabular-nums text-zinc-100`
   - Le serrage des caractères (`tracking-tight`) donne une densité digne de la presse d'art.
   - Les chiffres tabulaires (`tabular-nums`) empêchent tout saut visuel lors des variations.
2. **Les Micro-Labels de Contexte** :
   - `text-[11px] font-medium tracking-wider uppercase text-zinc-400 dark:text-zinc-500`
   - Les libellés ne crient pas : ils guident discrètement l'œil.
3. **Le Ratio 60-30-10** :
   - 60 % de fond neutre apaisant (Midnight Navy ou Warm Ivory).
   - 30 % de cartes contrastées avec hairlines.
   - 10 % d'accents à haute énergie (Vert Électrique, Cyan Précision).

---

### Loi 4 : Les Micro-Textures de Données (Sparklines & Balises Vivantes)
Un dashboard fade affiche un chiffre brut. Un dashboard de designer expert affiche **une histoire** :
* **Sparklines Translucides Intégrées** : Chaque carte KPI comporte en fond de carte une micro-courbe SVG translucide (`stroke-emerald-400/30 fill-emerald-400/5`) retraçant la tendance des 30 derniers jours.
* **Balises de Statut Vivantes (Pulsing Beacons)** :
  Au lieu d'un texte statique *« Actif »*, la balise combine :
  - Un fond bicolore translucide : `bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`.
  - Un point lumineux pulsant : `w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse`.

---

### Loi 5 : L'Asymétrie Dynamique du Squelette (Le Squelette d'Auteur)
Un designer expert ne dispose jamais une grille de 3 carrés identiques et monotones.  
Il crée une **tension visuelle intentionnelle** :
* **Le KPI Vedette (Hero Metric)** : La métrique maîtresse (ex: *Chiffre d'Affaires Récurrent Mensuel*) occupe **2 colonnes**, intégrant la sparkline large et le delta d'accélération.
* **Les Métriques Satellites** : Deux métriques secondaires plus compactes occupent 1 colonne chacune (ex: *Clients Actifs*, *Taux de Rétention*).
* **Hiérarchie Spatiale** : L'œil démarre sur le volume financier en grand, puis scanne la cadence opérationnelle.

---

### Loi 6 : L'Artisanat des Tables & Données Métier
La table de données est le test ultime de crédibilité d'un SaaS :
1. **Alignement Rigoureux** :
   - Textes, identités et descriptions : **alignés à gauche** avec avatar ou pastille d'icône.
   - Volumes, pourcentages, prix et dates : **systématiquement alignés à droite** en police monospacée (`text-right tabular-nums font-mono`).
2. **Micro-En-têtes** :
   - `text-[11px] font-semibold uppercase tracking-wider text-zinc-500 border-b border-white/10 pb-3`.
3. **Zéro Donnée Factice Générique** :
   - L'Agent a l'obligation formelle d'injecter des entités métier réalistes (ex: pour une plateforme logistique : *« Conteneur MSC-9482 »*, *« Port de Cotonou »*, *« Dédouanement validé »*, *« 4 850 000 FCFA »*).

---

## 3. Application Immédiate dans l'Architecture Scaffold™

1. **Dans nos Primitives (`src/components/primitives/`)** :  
   Ces 6 lois sont gravées directement dans le JSX des composants pré-compilés. Dès que l'Agent déclare un `MetricGrid`, la lumière zénithale, la sparkline et la typographie optique s'activent nativement.
2. **Dans le Prompt Système de l'Agent (`docs/reference/scaffold-agent-prompt.md`)** :  
   L'Agent reçoit la consigne de composer les écrans en appliquant l'asymétrie dynamique (Hero Metric) et le réalisme métier absolu.

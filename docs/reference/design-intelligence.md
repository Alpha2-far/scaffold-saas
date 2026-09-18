# Design Intelligence & Standards Visuels des Primitives Scaffold™

*Date de révision : 18 septembre 2026*  
*Statut : Document de référence normatif pour les composants et l'Agent*  
*Localisation : `docs/reference/design-intelligence.md`*

---

## 1. Philosophie : Du « Style Recipe » à la « Design Intelligence »

Une interface d'excellence ne se résume pas à empiler des dégradés sombres ou des lueurs néon sur tous les écrans. Un logiciel logistique, un outil médical, un CRM ou une fintech ont des exigences ergonomiques fondamentalement différentes.

Scaffold™ organise la conception d'interface selon une architecture en **5 niveaux de Design Intelligence** :

```text
NIVEAU 1 : PRINCIPES UNIVERSELS
(Hiérarchie, Contraste, Espacement, Rythme, Typographie optique)
                │
                ▼
NIVEAU 2 : MODÈLES DE DOMAINE (DOMAIN PATTERNS)
(Fintech, SaaS B2B, Logistique, CRM, Analytique, E-commerce)
                │
                ▼
NIVEAU 3 : DIRECTION VISUELLE & THÈMES
(Catalogue des 43 presets : Dark Midnight, Warm Ivory, Swiss Clean, Technical Mono)
                │
                ▼
NIVEAU 4 : COMPOSANTS & STANDARDS DES PRIMITIVES
(MetricGrid, DataTable, ChartPrimitive, ActivityTimeline, FormDrawer)
                │
                ▼
NIVEAU 5 : DONNÉES DE DÉMONSTRATION CONTEXTUALISÉES
(Noms d'entités réels, devises locales, statuts métier cohérents)
```

> [!IMPORTANT]
> **Règle Fondamentale : Le Design Sert le Produit**  
> Aucune décision esthétique ne doit être prise uniquement pour « faire joli » ou « paraître premium ».  
> La hiérarchie décisionnelle est stricte :  
> **Clarté ➔ Hiérarchie ➔ Utilité ➔ Cohérence ➔ Esthétique**.

---

## 2. Standards Visuels des Primitives (Artisanat Électroménager)

Ces standards sont implémentés dans les Primitives pré-compilées de l'Étage 1 (`src/components/primitives/`) et traduits par le Code Synthesizer à l'Étage 2.

### A. Lumière Zénithale & Micro-Biseaux (Double Arête)
Au lieu d'une bordure plate uniforme, les conteneurs de cartes adoptent un contraste directionnel :
* **En Dark Mode** :
  * Arête supérieure subtilement éclairée : `border-t border-t-white/15 dark:border-t-white/20`
  * Anneau structurel intérieur : `ring-1 ring-inset ring-white/5`
  * Ombre douce multi-étages : `shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]`
* **En Light Mode** :
  * Bordure neutre nette : `border border-stone-200/80`
  * Léger reflet supérieur : `border-t-stone-100` avec fond pur `bg-white`
  * Ombre portée douce : `shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.02)]`

### B. Rayons Concentriques (Concentric Radii)
L'emboîtement des composants respecte la courbure naturelle de l'œil :
$$\text{Rayon Intérieur} = \text{Rayon Extérieur} - \text{Marge Interne (Padding)}$$
* Conteneur de section externe : `rounded-2xl` (16 px)
* Carte interne : `rounded-xl` (12 px)
* Bouton, badge ou champ de saisie : `rounded-lg` (8 px)

### C. Typographie Optique & Lisibilité des Données
* **Valeurs Numériques de Métriques** :  
  `text-2xl sm:text-3xl font-semibold tracking-tight tabular-nums text-[var(--text-primary)]`  
  Le crénelage resserré (`tracking-tight`) évite l'effet de dispersion visuelle, et `tabular-nums` garantit l'alignement décimal sans saut visuel.
* **Micro-Labels de Contexte** :  
  `text-[11px] font-medium tracking-wider uppercase text-[var(--text-secondary)]`
* **Alignement Rigoureux en Table** :
  * Noms, titres, badges et descriptions : **alignés à gauche**.
  * Chiffres, prix, volumes et dates : **systématiquement alignés à droite en police monospacée** (`font-mono text-right tabular-nums`).

### D. Visualisation de Tendance Pertinente (Anti-Cargo Cult)
Une sparkline ou un graphique n'est affiché **que si une série temporelle réelle existe** :
* Si `MetricItem.dataPoints` est fourni (ex: `[12, 14, 13, 18, 22]`) : la primitive dessine une sparkline SVG translucide en filigrane sous la métrique (`stroke-[var(--accent)]/40 fill-[var(--accent)]/5`).
* Si `MetricItem.dataPoints` est absent : **aucune fausse courbe décorative n'est injectée**. Seul le badge de delta (+14.2%) avec son icône directionnelle (`TrendingUp` / `TrendingDown`) est affiché.

### E. Asymétrie Spatiale Intentionnelle (Optionnelle)
Le schéma supporte `span: 1 | 2 | 3` sur les métriques :
* Lorsque pertinent (ex: Chiffre d'Affaires principal en Fintech), une métrique majeure peut occuper `span: 2` sur desktop pour former une **Hero Metric**, flanquée de métriques secondaires en `span: 1`.
* Sur écran mobile (< 640px), tous les `span` s'écrasent automatiquement à 1 pour préserver la lisibilité.

---

## 3. Accessibilité & Rigueur Ergonomique (WCAG)

1. **Règle WCAG 2.3.3 (Protection contre les clignotements & fatigue)** :
   * Toute animation pulsante utilise obligatoirement le préfixe Tailwind :
     ```css
     motion-safe:animate-pulse
     ```
   * **Plafond d'animation** : Un écran ne peut jamais comporter plus de **2 éléments animés simultanément**.
2. **Ratios de Contraste** :
   * Contraste texte principal : Ratio **≥ 7:1 (AAA)**.
   * Contraste textes secondaires & badges : Ratio **≥ 4.5:1 (AA)**.
3. **Double Encodage de l'Information (Daltonisme)** :
   * Ne jamais utiliser la couleur comme unique vecteur d'état. Un statut positif associe systématiquement :
     * Une couleur sémantique (vert/émeraude).
     * Un texte explicite (*« Payé »*, *« Livré »*).
     * Une micro-icône vectorielle (`CheckCircle`, `TrendingUp`).

---

## 4. Matrice Responsive par Primitive

| Primitive | Comportement Desktop (≥ 1024px) | Comportement Tablet (640px - 1023px) | Comportement Mobile (< 640px) |
|---|---|---|---|
| **`MetricGrid`** | 2 à 4 colonnes, respect des `span: 2`. | 2 colonnes fixes, `span` limité à 2. | 1 colonne pleine largeur, tous les `span` ramenés à 1. |
| **`DataTable`** | Affichage complet de toutes les colonnes. | Défilement horizontal avec première colonne figée (*sticky*). | Vue transformée en cartes verticales empilées ou affichage des 2 colonnes prioritaires. |
| **`ChartPrimitive`** | Hauteur 280 px avec grille et infobulles au survol. | Hauteur 220 px, labels d'axes simplifiés. | Hauteur 160 px, affichage minimaliste des extrêmes. |
| **`ActivityTimeline`** | Ligne de temps verticale avec dates et statuts alignés. | Ligne verticale compacte. | Ligne verticale avec libellés sur une seule ligne. |
| **`FormDrawer`** | Tiroir coulissant latéral de 440 px (`backdrop-blur`). | Tiroir latéral de 380 px. | Tiroir plein écran basculant depuis le bas (*Bottom Sheet*). |

---

## 5. Pipeline d'Hydratation des Données de Démonstration

Pour éliminer les données génériques sans valeur (*« Produit 1 »*, *« 0000 »*), l'Agent applique un dictionnaire d'hydratation selon le secteur identifié lors de l'intake :

```text
[Intake : Secteur & Devise]
            │
            ▼
[Résolution du Domaine Métier]
  ├── Logistique / Fret   ➔ Noms de navires/ports, codes conteneurs (MSC, Maersk), FCFA/EUR.
  ├── Fintech / B2B       ➔ MRR, Churn, ARR, Factures récurrentes, Virements SEPA/Stripe.
  ├── E-commerce          ➔ Paniers moyens, Commandes expédiées, Retours, Stock disponible.
  └── Médical / Santé     ➔ Dossiers patients, Consultations, Prescriptions, Actes téléconsultation.
            │
            ▼
[Génération de l'UI-IR avec Données Cohérentes]
```

---

## 6. Les 10 Interdictions Formelles (Patterns Prohibés)

1. ⛔ **Jamais de noir pur (`#000000`) ni de blanc pur (`#ffffff`) en fond d'écran** : Toujours utiliser des teintes feutrées issues des tokens (`--background`, `--surface`).
2. ⛔ **Jamais plus de 3 tailles typographiques par composant** : Titre, valeur, métadonnée.
3. ⛔ **Jamais de fausse sparkline sans données réelles** : `dataPoints` absent = zéro courbe décorative.
4. ⛔ **Jamais d'animation sans `motion-safe:`** : Respect systématique des préférences d'accessibilité utilisateur.
5. ⛔ **Jamais plus de 2 animations pulsantes par écran**.
6. ⛔ **Jamais d'ombre noire brute (`rgba(0,0,0,1)`)** : Utiliser des ombres douces et transparentes.
7. ⛔ **Jamais de couleur comme unique indicateur d'information**.
8. ⛔ **Jamais de texte factice générique (*« Lorem Ipsum »*, *« Test »*, *« 0000 »*)**.
9. ⛔ **Jamais de conteneur à largeur fixe cassant sur mobile**.
10. ⛔ **Jamais de décision esthétique qui nuit à la lisibilité de la donnée**.

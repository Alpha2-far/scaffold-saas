# Motion System (Scaffold™)

Scaffold™ utilise le moteur d'animation moderne `motion@13.2.0` sous architecture **`<LazyMotion strict>`**. Le dynamisme est un système paramétrable en un point unique (`src/lib/motion.ts`), avec exécution accélérée par GPU et surcoût de bundle minimal (+57 kB brut / +19 kB gzip).

## Règle Absolue d'Importation : `m.*` uniquement

Sous `<LazyMotion strict>`, tout usage naïf de `motion.div` **lève une erreur au runtime**
(c'est la définition même de `strict`, et non un avertissement de compilation).
Toujours importer `* as m` depuis `motion/react-m` :

```tsx
// ✅ Correct
import * as m from 'motion/react-m'
<m.div animate={{ opacity: 1 }} />

// ❌ Interdit
import { motion } from 'motion/react'
<motion.div ... />
```

### Pourquoi `strict` n'est pas une coquetterie

Un **seul** composant `motion.*` laissé quelque part dans l'arbre fait bundler la totalité
des fonctionnalités et annule le bénéfice de `LazyMotion`. `strict` transforme cette fuite
silencieuse — qui ne se voit que sur la taille du bundle, des semaines plus tard — en une
erreur immédiate et localisée.

### Ce qui vient de `motion/react` et ce qui vient de `motion/react-m`

| Import | Depuis | Nature |
|---|---|---|
| `m` (`* as m`) | `motion/react-m` | **Les composants animés.** Jamais ailleurs. |
| `LazyMotion` | `motion/react` | Le fournisseur, monté une fois à la racine |
| `AnimatePresence` | `motion/react` | Orchestrateur, pas un composant animé — compatible `m.*` |
| `useReducedMotion` | `motion/react` | Hook |
| `type Transition`, `type Variants` | `motion/react` | Types uniquement |
| `domAnimation` | `motion/react` | Isolé dans `src/lib/motion-features.ts` — voir plus bas |

## Le feature bundle est isolé dans son propre module

```tsx
// src/lib/motion-features.ts — le seul fichier qui importe domAnimation
import { domAnimation } from 'motion/react'
export default domAnimation

// src/main.tsx
<LazyMotion features={loadDomAnimation} strict>
```

`domAnimation` couvre animations, variants, sorties et gestes hover/press/focus.
**`domMax` n'est pas utilisé** : il ajoute drag et layout projection, que Scaffold
n'emploie pas, pour un coût supplémentaire. Le module séparé est ce qui permet à Vite de
sortir le bundle dans un chunk asynchrone (`motion-features.js`, 37 kB) au lieu de le
fondre dans `index.js`.

**Ne pas importer `domAnimation` ailleurs** : cela le ramènerait dans le chunk principal et
annulerait le découpage.

## Tokens de Mouvement (`src/lib/motion.ts`)

Toutes les durées, courbes d'accélération et configurations de ressorts proviennent exclusivement de `src/lib/motion.ts` :

* **Durées standard (`DURATION`)** :
  * `instant: 0.1` — feedback immédiat, focus rings.
  * `fast: 0.2` — clics de boutons, pastilles, badges.
  * `normal: 0.35` — entrées de cartes, déploiement de panneaux.
  * `slow: 0.6` — transitions de page, masthead.
* **Courbes bézier** :
  * `EASE_OUT: [0.16, 1, 0.3, 1]` — expo-out naturel pour toute entrée.
  * `EASE_SOFT: [0.25, 0.1, 0.25, 1]` — transitions douces et continues.
* **Ressorts (`SPRING`)** :
  * `press`: `{ stiffness: 500, damping: 30 }` — pour le micro-feedback tactile (`Tappable`).
  * `lift`: `{ stiffness: 350, damping: 25 }` — pour la micro-élévation au survol (`Lift`).
  * `status`: `{ stiffness: 200, damping: 20 }` — pour les checkmarks et radars de statut.

## Primitives d'Animation Dédiées (`src/components/motion-primitives.tsx`)

Ne pas recréer d'animations ad-hoc dans les composants : utiliser les 4 primitives :
1. `<Reveal>` : Fondu ascendant au montage (`initial y: 15px`).
2. `<Stagger>` + `<StaggerItem>` : Cascade d'apparition séquentielle pour listes et grilles de cartes.
3. `<Lift>` : Micro-élévation (-3px) + halo néon lime au survol sur les cartes maîtresses.
4. `<Tappable>` : Micro-feedback tactile (`whileHover: 1.02`, `whileTap: 0.98`).

## Animated Logo Loader (`src/components/ScaffoldLogoLoader.tsx`)

Le symbole Scaffold™ (les 4 barres de l'emblème) est animé par GPU :
* Vague séquentielle lumineuse descendante décalée (`stagger wave`).
* Aucune animation de propriétés lourdes (`width`, `height` sont interdits). Seuls `transform` et `opacity` sont animés.
* Tailles disponibles : `sm` (inline dans la console), `md`, `lg`, `fullscreen` (splashscreen).

## Respect Strict de `prefers-reduced-motion`

Chaque composant animé appelle `useReducedMotion()`. Si l'utilisateur demande moins de mouvement :
* Les translations (`y`, `x`) et les échelles (`scale`) sont désactivées.
* Seuls les fondus d'opacité discrets sont conservés. L'interface ne casse jamais.

C'est une **réduction, pas une suppression** : l'utilisateur garde le retour d'information
(l'état change, le fondu le dit), il perd seulement le déplacement qui lui coûte.

## Ce qu'on anime, et ce qu'on n'anime jamais

Seuls `transform` et `opacity` sont animés : ce sont les deux propriétés que le compositeur
traite sans relayout ni repaint. Animer `width`, `height`, `top`, `left` ou `margin` force
un layout à chaque frame et fait tomber l'animation sous les 60 fps sur les machines
modestes — un mouvement saccadé est pire que pas de mouvement.

Pour faire varier une taille, animer `scaleX` / `scaleY`, ou faire varier la taille d'un
conteneur en CSS et animer l'opacité du contenu.

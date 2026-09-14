# Motion System (Scaffold™)

Scaffold™ utilise le moteur d'animation moderne `motion@13.2.0` sous architecture **`<LazyMotion strict>`**. Le dynamisme est un système paramétrable en un point unique (`src/lib/motion.ts`), avec exécution accélérée par GPU et surcoût de bundle minimal (+57 kB brut / +19 kB gzip).

## Règle Absolue d'Importation : `m.*` uniquement

Sous `<LazyMotion strict>`, tout usage naïf de `motion.div` provoque une erreur de compilation ou de runtime immédiate.
Toujours importer `* as m` depuis `motion/react-m` :

```tsx
// ✅ Correct
import * as m from 'motion/react-m'
<m.div animate={{ opacity: 1 }} />

// ❌ Interdit
import { motion } from 'motion/react'
<motion.div ... />
```

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

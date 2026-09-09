/**
 * Motion tokens for the Scaffold design system.
 *
 * Animation is a system, not a decoration: every surface in the app draws its
 * timing, easing and travel distance from this file. Change a value here and
 * the whole product changes with it — that is the point.
 *
 * Rules of the system:
 * - Entrances travel a short distance (15px) and fade. Never slide from off-screen.
 * - Interaction feedback is a spring; entrances and exits are eased curves.
 * - Nothing animates for longer than half a second. This is a tool, not a title sequence.
 * - Every consumer honours `useReducedMotion()`; see `motion-primitives.tsx`.
 */
import type { Transition, Variants } from 'motion/react'

/** Expo-out. Fast departure, long settle — reads as "responsive", not "floaty". */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

/** Standard ease-out for small, frequent transitions (hover, color, opacity). */
export const EASE_SOFT: [number, number, number, number] = [0.4, 0, 0.2, 1]

export const DURATION = {
  /** Hover, focus, color shifts. */
  fast: 0.18,
  /** Card and block entrances. */
  base: 0.34,
  /** Full-console entrance, the slowest thing allowed. */
  slow: 0.5,
} as const

/** Distance an entering element travels, in pixels. */
export const TRAVEL = 15

export const SPRING = {
  /** Tactile press feedback: tight, no overshoot to speak of. */
  press: { type: 'spring', stiffness: 420, damping: 30, mass: 0.6 },
  /** Hover elevation: a little overshoot, so the surface feels physical. */
  lift: { type: 'spring', stiffness: 280, damping: 22, mass: 0.7 },
  /** Status changes (a step turning green): visible, celebratory, still quick. */
  status: { type: 'spring', stiffness: 500, damping: 24, mass: 0.5 },
} satisfies Record<string, Transition>

/** The entrance every card, tile and block in the app uses. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: TRAVEL },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT },
  },
}

/** Same entrance without vertical travel — for reduced-motion consumers. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE_SOFT } },
}

/**
 * Parent of a staggered group. Children inheriting `fadeUp` cascade in order.
 * 60ms is the sweet spot: legible as a sequence, never a queue you wait through.
 */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
}

/** Interaction feedback, applied uniformly to every pressable surface. */
export const HOVER_SCALE = 1.02
export const TAP_SCALE = 0.98

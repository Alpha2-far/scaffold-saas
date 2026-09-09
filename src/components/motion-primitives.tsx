/**
 * The four motion primitives the whole app composes from.
 *
 * Every one of them honours `prefers-reduced-motion`: travel and scale are
 * dropped, opacity fades are kept. A user who asked the OS for less movement
 * gets less movement, not a broken layout.
 */
import type { ReactNode } from 'react'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { DURATION, EASE_OUT, EASE_SOFT, HOVER_SCALE, SPRING, TAP_SCALE, TRAVEL } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Position in a manual cascade, when not inside a <Stagger>. */
  index?: number
  /** Extra delay in seconds, on top of the index cascade. */
  delay?: number
  id?: string
}

/**
 * A block that fades and rises into place. Inside a <Stagger> it inherits the
 * cascade; standalone, it animates itself using `index` and `delay`.
 */
export function Reveal({ children, className, index = 0, delay = 0, id }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <m.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : TRAVEL }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: DURATION.base,
        ease: reduce ? EASE_SOFT : EASE_OUT,
        delay: delay + index * 0.06,
      }}
    >
      {children}
    </m.div>
  )
}

interface StaggerProps {
  children: ReactNode
  className?: string
  /** Seconds between each child's entrance. */
  gap?: number
  delay?: number
}

/** Parent of a cascade. Children must be <StaggerItem> to inherit it. */
export function Stagger({ children, className, gap = 0.06, delay = 0.04 }: StaggerProps) {
  return (
    <m.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </m.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  id?: string
}

/** One step of a cascade. Only meaningful inside a <Stagger>. */
export function StaggerItem({ children, className, id }: StaggerItemProps) {
  const reduce = useReducedMotion()

  return (
    <m.div
      id={id}
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : TRAVEL },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.base, ease: reduce ? EASE_SOFT : EASE_OUT },
        },
      }}
    >
      {children}
    </m.div>
  )
}

interface LiftProps {
  children: ReactNode
  className?: string
  /** Turn the hover elevation off for surfaces that are purely informational. */
  interactive?: boolean
}

/**
 * Wraps a card in hover elevation and a luminous accent border.
 *
 * The glow is a separate inset layer rather than a border-color change, so the
 * card's own border keeps its job and the light can bleed outward on hover.
 */
export function Lift({ children, className, interactive = true }: LiftProps) {
  const reduce = useReducedMotion()

  return (
    <m.div
      className={cn('relative rounded-xl', className)}
      initial={false}
      whileHover={interactive ? 'hover' : undefined}
      animate="rest"
      variants={{
        rest: { y: 0, transition: SPRING.lift },
        hover: { y: reduce || !interactive ? 0 : -3, transition: SPRING.lift },
      }}
    >
      {/* Luminous border + halo, revealed on hover */}
      <m.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-xl ring-1 ring-lime-500/40 dark:ring-lime-400/30 shadow-[0_0_28px_-8px_rgba(132,204,22,0.45)] dark:shadow-[0_0_32px_-8px_rgba(163,230,53,0.35)]"
        initial={{ opacity: 0 }}
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: DURATION.fast, ease: EASE_SOFT }}
      />
      {/* Depth shadow, revealed on hover */}
      <m.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl shadow-[0_20px_45px_-30px_rgba(28,25,23,0.75)] dark:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.9)]"
        initial={{ opacity: 0 }}
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: DURATION.fast, ease: EASE_SOFT }}
      />
      {children}
    </m.div>
  )
}

interface TappableProps {
  children: ReactNode
  className?: string
}

/**
 * Micro-feedback for anything pressable: buttons, badges, nav pills.
 * Scale only — never opacity, which reads as "disabled" rather than "pressed".
 */
export function Tappable({ children, className }: TappableProps) {
  const reduce = useReducedMotion()

  return (
    <m.div
      className={className}
      whileHover={reduce ? undefined : { scale: HOVER_SCALE }}
      whileTap={reduce ? undefined : { scale: TAP_SCALE }}
      transition={SPRING.press}
    >
      {children}
    </m.div>
  )
}

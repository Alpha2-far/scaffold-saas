import { Check, ArrowRight, AlertTriangle } from 'lucide-react'
import type { ReactNode } from 'react'
import { AnimatePresence, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { DURATION, EASE_OUT, SPRING } from '@/lib/motion'
import { cn } from '@/lib/utils'

export type StepStatus = 'completed' | 'current' | 'upcoming' | 'skipped'

interface StepIndicatorProps {
  step: number
  status: StepStatus
  children: ReactNode
  isLast?: boolean
}

export function StepIndicator({ step, status, children, isLast = false }: StepIndicatorProps) {
  const reduce = useReducedMotion()

  return (
    <div className="relative">
      {/* Vertical connecting line — draws itself downward, and turns live once the step is done */}
      {!isLast && (
        <m.div
          className={cn(
            'absolute left-[10px] top-[28px] w-[2px] h-[calc(100%+16px)] origin-top',
            status === 'completed'
              ? 'bg-gradient-to-b from-lime-500/60 to-stone-200 dark:from-lime-400/40 dark:to-stone-700'
              : 'bg-stone-200 dark:bg-stone-700'
          )}
          initial={{ scaleY: reduce ? 1 : 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: DURATION.slow, ease: EASE_OUT, delay: 0.1 }}
          aria-hidden="true"
        />
      )}

      {/* Step badge positioned at top-left */}
      <div className="absolute -left-[2px] top-0 z-10">
        <StepBadge step={step} status={status} />
      </div>

      {/* Card content with left padding to accommodate the step indicator */}
      <div className="pl-10">
        {children}
      </div>
    </div>
  )
}

interface StepBadgeProps {
  step: number
  status: StepStatus
}

const badgeBase =
  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold'

function StepBadge({ step, status }: StepBadgeProps) {
  const reduce = useReducedMotion()

  return (
    <div className="relative w-6 h-6">
      {/* Radar ping — only while this is the step the user is on */}
      {status === 'current' && !reduce && (
        <m.span
          className="absolute inset-0 rounded-full bg-stone-900/40 dark:bg-stone-100/30"
          animate={{ scale: [1, 1.9], opacity: [0.45, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          aria-hidden="true"
        />
      )}

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={status}
          initial={{ scale: reduce ? 1 : 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: reduce ? 1 : 0.6, opacity: 0 }}
          transition={SPRING.status}
          className="absolute inset-0"
        >
          {status === 'completed' && (
            <m.div
              className={cn(badgeBase, 'bg-lime-500/15 dark:bg-lime-400/15 text-lime-700 dark:text-lime-400 ring-1 ring-lime-500/30 dark:ring-lime-400/25')}
              initial={reduce ? false : { rotate: -25 }}
              animate={{ rotate: 0 }}
              transition={SPRING.status}
            >
              <Check className="w-3 h-3" strokeWidth={2.5} />
            </m.div>
          )}

          {status === 'current' && (
            <m.div
              className={cn(badgeBase, 'bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900')}
              animate={
                reduce
                  ? undefined
                  : {
                      boxShadow: [
                        '0 0 0 0 rgba(28,25,23,0.0)',
                        '0 0 14px 2px rgba(132,204,22,0.35)',
                        '0 0 0 0 rgba(28,25,23,0.0)',
                      ],
                    }
              }
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
            </m.div>
          )}

          {status === 'skipped' && (
            <div className={cn(badgeBase, 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400')}>
              <AlertTriangle className="w-3 h-3" strokeWidth={2.5} />
            </div>
          )}

          {status === 'upcoming' && (
            <div className={cn(badgeBase, 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400 transition-colors duration-200')}>
              {step}
            </div>
          )}
        </m.div>
      </AnimatePresence>
    </div>
  )
}

import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { Activity, Boxes, Map, ShieldCheck } from 'lucide-react'
import type { ProductData } from '@/types/product'
import type { ProductHealth } from '@/lib/product-health'
import { DURATION, EASE_OUT, EASE_SOFT } from '@/lib/motion'
import { Stagger, StaggerItem } from '@/components/motion-primitives'
import { cn } from '@/lib/utils'

type TileState = 'ok' | 'pending' | 'warn' | 'fail'

const tileTone: Record<TileState, { dot: string; value: string; ring: string }> = {
  ok: {
    dot: 'bg-lime-500 dark:bg-lime-400',
    value: 'text-stone-900 dark:text-stone-50',
    ring: 'group-hover:ring-lime-500/40 dark:group-hover:ring-lime-400/30',
  },
  pending: {
    dot: 'bg-stone-300 dark:bg-stone-600',
    value: 'text-stone-400 dark:text-stone-500',
    ring: 'group-hover:ring-stone-300 dark:group-hover:ring-stone-600',
  },
  warn: {
    dot: 'bg-amber-500 dark:bg-amber-400',
    value: 'text-amber-700 dark:text-amber-400',
    ring: 'group-hover:ring-amber-500/40 dark:group-hover:ring-amber-400/30',
  },
  fail: {
    dot: 'bg-rose-500 dark:bg-rose-400',
    value: 'text-rose-700 dark:text-rose-400',
    ring: 'group-hover:ring-rose-500/40 dark:group-hover:ring-rose-400/30',
  },
}

interface MetricTileProps {
  icon: typeof Activity
  label: string
  value: string
  detail: string
  state: TileState
  /** Render the value in mono — used for the audit verdict token. */
  mono?: boolean
}

function MetricTile({ icon: Icon, label, value, detail, state, mono = false }: MetricTileProps) {
  const tone = tileTone[state]

  return (
    <StaggerItem className="h-full">
      <div
        className={cn(
          'group h-full rounded-lg border border-stone-200/70 dark:border-stone-700/60',
          'bg-white/60 dark:bg-stone-900/40 backdrop-blur-sm px-4 py-3',
          'ring-1 ring-transparent transition-[box-shadow,border-color] duration-200',
          tone.ring
        )}
      >
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
          <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-stone-500 dark:text-stone-400">
            {label}
          </span>
          <span className={cn('ml-auto w-1.5 h-1.5 rounded-full', tone.dot)} aria-hidden="true" />
        </div>
        <p className={cn('text-lg leading-none font-semibold', mono && 'font-mono text-base', tone.value)}>
          {value}
        </p>
        <p className="mt-1.5 text-xs text-stone-500 dark:text-stone-400 truncate">{detail}</p>
      </div>
    </StaggerItem>
  )
}

interface StatusConsoleProps {
  data: ProductData
  health: ProductHealth
}

/**
 * The Product page masthead: what Scaffold is, what this product is, and the
 * live state of its scope lock — read straight from the parsed markdown, so the
 * verdict here is the same verdict `/product-audit` prints in the terminal.
 */
export function StatusConsole({ data, health }: StatusConsoleProps) {
  const reduce = useReducedMotion()

  const featureCount = data.overview?.features.length ?? 0
  const sectionCount = data.roadmap?.sections.length ?? 0
  const entityCount = data.dataShape?.entities.length ?? 0
  const relationshipCount = data.dataShape?.relationships.length ?? 0

  const auditToken =
    health.state === 'pass' ? '[PASS]' : health.state === 'warn' ? '[WARN]' : health.state === 'fail' ? '[FAIL]' : '[IDLE]'
  const auditTone: TileState =
    health.state === 'pass' ? 'ok' : health.state === 'warn' ? 'warn' : health.state === 'fail' ? 'fail' : 'pending'

  return (
    <m.section
      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.slow, ease: reduce ? EASE_SOFT : EASE_OUT }}
      className={cn(
        'relative overflow-hidden rounded-2xl mb-10',
        'border border-stone-200/80 dark:border-stone-700/50',
        'bg-gradient-to-b from-white/90 via-white/60 to-stone-50/30',
        'dark:from-stone-800/70 dark:via-stone-800/40 dark:to-stone-900/30',
        'backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset,0_18px_40px_-32px_rgba(28,25,23,0.5)]',
        'dark:shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_20px_50px_-32px_rgba(0,0,0,0.8)]'
      )}
    >
      {/* Accent bloom, top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 w-72 h-72 rounded-full bg-lime-400/10 dark:bg-lime-400/[0.07] blur-3xl"
      />

      {/* One-pass sheen on mount — the console "powering up" */}
      {!reduce && (
        <m.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 dark:via-white/[0.06] to-transparent"
          initial={{ x: '-120%' }}
          animate={{ x: '320%' }}
          transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.15 }}
        />
      )}

      <div className="relative px-6 sm:px-8 py-7 sm:py-8">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 flex-wrap mb-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 dark:border-stone-700 bg-white/70 dark:bg-stone-900/50 px-3 py-1">
            <span className="relative flex w-1.5 h-1.5" aria-hidden="true">
              {!reduce && (
                <m.span
                  className="absolute inset-0 rounded-full bg-lime-500 dark:bg-lime-400"
                  animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <span className="relative w-1.5 h-1.5 rounded-full bg-lime-500 dark:bg-lime-400" />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-600 dark:text-stone-300">
              Scaffold™ Pre-Code Intelligence Layer
            </span>
          </span>

          {data.overview?.name && (
            <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400 truncate max-w-[14rem]">
              {data.overview.name}
            </span>
          )}
        </div>

        {/* Masthead */}
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-stone-900 dark:text-stone-50 mb-3">
          Product Definition
        </h1>
        <p className="text-stone-600 dark:text-stone-400 max-w-xl leading-relaxed mb-7">
          Lock the vision, the scope and the shape of the data — before a single line of code is written.
        </p>

        {/* Live metrics */}
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-3" delay={0.18}>
          <MetricTile
            icon={ShieldCheck}
            label="Vision"
            value={data.overview ? 'Locked' : 'Pending'}
            detail={data.overview ? `${featureCount} key features` : 'Run /product-vision'}
            state={data.overview ? 'ok' : 'pending'}
          />
          <MetricTile
            icon={Map}
            label="Roadmap"
            value={sectionCount > 0 ? `${sectionCount} sections` : 'Pending'}
            detail={sectionCount > 0 ? 'Build order set' : 'Run /product-roadmap'}
            state={sectionCount > 0 ? 'ok' : 'pending'}
          />
          <MetricTile
            icon={Boxes}
            label="Entities"
            value={entityCount > 0 ? String(entityCount) : '—'}
            detail={entityCount > 0 ? `${relationshipCount} relationships` : 'Run /data-shape'}
            state={entityCount > 0 ? 'ok' : 'pending'}
          />
          <MetricTile
            icon={Activity}
            label="Audit"
            value={auditToken}
            detail={
              health.evaluated === 0
                ? 'Nothing to audit yet'
                : `${health.passed}/${health.evaluated} checks${health.scopeLocked ? ' · scope locked' : ''}`
            }
            state={auditTone}
            mono
          />
        </Stagger>
      </div>
    </m.section>
  )
}

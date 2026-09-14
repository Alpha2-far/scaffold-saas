import { useId } from 'react'
import { useReducedMotion, type Transition } from 'motion/react'
import * as m from 'motion/react-m'
import { EASE_OUT, EASE_SOFT } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * The Scaffold™ emblem as a loading state: four planks under a single travelling
 * band of light.
 *
 * The geometry below was measured off the master artwork (public/scaffold/scaffold-mark.png)
 * and normalised into a 100 × 79.68 box. Row pitch is 20.47, every end cap is a full
 * semicircle (rx = h / 2), and the long / short-left / short-right / long-left rhythm
 * is the mark itself — these numbers are not to be tidied up.
 *
 * Two rules shape the implementation:
 *
 * 1. **The light moves, the planks do not.** One `<rect>` filled with a soft gradient
 *    travels through a `<clipPath>` cut from the four bars. Clip and band share the
 *    mark's user space, so the sweep is one continuous wavefront crossing the whole
 *    emblem rather than four bars each running their own little gradient.
 * 2. **Only `transform` and `opacity` ever animate.** motion routes those into `style`
 *    for SVG children and hands them to the browser's accelerated path; everything else
 *    (`fill`, `stop-offset`, `gradientTransform`) would be a per-frame `setAttribute` on
 *    the main thread. The neon is not animated either — a pre-painted lit copy of each
 *    plank is cross-faded over the resting one, which buys a glow at zero per-frame paint.
 */

const VIEW_W = 100
const VIEW_H = 79.68

const BARS = [
  { x: 14.38, y: 0, w: 85.62, h: 18.26 },
  { x: 6.51, y: 20.43, w: 49.09, h: 18.38 },
  { x: 37.1, y: 40.98, w: 49.09, h: 18.26 },
  { x: 0, y: 61.42, w: 78.31, h: 18.26 },
]

/**
 * Mini-charte values as literals rather than `var(--color-scaffold-*)`: SVG presentation
 * attributes are attributes, not CSS declarations, so a custom property inside a `fill`
 * or `stop-color` attribute resolves to nothing at all — silently.
 */
const GREEN = '#22c55e'
const LIME = '#84cc16'
const EMERALD = '#064e3b'

/** One full pass of the light. Every timing below is a fraction of this. */
const SWEEP_PERIOD = 2.2

/**
 * The band only ever travels straight down. The shear on its parent group tilts the
 * wavefront up to the right, so inside any one plank the light reaches the left cap
 * first — left-to-right and top-to-bottom out of a single translation.
 */
const BEAM_SKEW = -16

/**
 * y in the mark's own user units. −34 puts the band's lowest edge above the top plank;
 * 140 puts its highest edge below the bottom one. Both ends sit outside the clip, so the
 * wrap from 140 back to −34 repaints nothing and the loop has no seam.
 *
 * The middle pair is the point: the band decelerates as it enters the mark, crosses at a
 * constant 124 units/second, then accelerates away. A light source that lingers reads as
 * deliberate; one that flies past reads as a spinner.
 */
const BEAM_Y = [-34, 10, 92, 140, 140]

const beamTransition: Transition = {
  duration: SWEEP_PERIOD,
  times: [0, 0.09, 0.39, 0.47, 1],
  ease: ['easeOut', 'linear', 'easeIn', 'linear'],
  repeat: Infinity,
  // No `repeatDelay` — motion disqualifies any animation carrying one from the browser's
  // accelerated path. The 1.16s of rest is baked into `times` instead.
}

/**
 * Each plank flushes as the beam's centre line reaches its centre, solving
 * `Y = y_centre + tan(16°) · x_centre` for each bar. The onsets are therefore uneven —
 * 110ms, 230ms, 120ms — because that syncopation is the staircase's own geometry rather
 * than a metronome laid over it.
 */
const BEAT_ONSET = [0.28, 0.39, 0.62, 0.74]
const BEAT_RISE = 0.16
const BEAT_FALL = 0.3
const BEAT_PEAK = 0.55

/** Rest at 0, so the mark between passes is exactly the brand gradient and nothing else. */
const BEAT_OPACITY = [0, 0, BEAT_PEAK, 0, 0]

const BEAT_TRANSITIONS: Transition[] = BEAT_ONSET.map((onset) => ({
  duration: SWEEP_PERIOD,
  times: [
    0,
    onset / SWEEP_PERIOD,
    (onset + BEAT_RISE) / SWEEP_PERIOD,
    (onset + BEAT_RISE + BEAT_FALL) / SWEEP_PERIOD,
    1,
  ],
  // Expo attack, soft decay: a filament catching, then cooling.
  ease: ['linear', EASE_OUT, EASE_SOFT, 'linear'],
  repeat: Infinity,
}))

/**
 * 3.6s against the sweep's 2.2s. The ratio is 18:11, so breath and sweep only realign
 * every 39.6 seconds — long enough that the loop never announces itself.
 */
const HALO_OPACITY = [0.3, 0.62, 0.3]
const HALO_SCALE = [0.96, 1.06, 0.96]
const haloTransition: Transition = { duration: 3.6, ease: 'easeInOut', repeat: Infinity }

/**
 * Reduced motion: the mark fades, never moves, and never drops below 0.62 — a calm,
 * plainly legible emblem rather than a frozen one or a hidden one.
 */
const CALM_OPACITY = [1, 0.62, 1]
const calmTransition: Transition = { duration: 2.8, ease: EASE_SOFT, repeat: Infinity }

const SIZES = {
  sm: {
    w: 16,
    h: 12.75,
    halo: 0,
    showLabel: false,
    wrap: 'inline-flex items-center align-middle',
    text: '',
  },
  md: {
    w: 28,
    h: 22.31,
    halo: 46,
    showLabel: true,
    wrap: 'inline-flex flex-col items-center justify-center gap-2.5',
    text: 'text-[11px]',
  },
  lg: {
    w: 44,
    h: 35.06,
    halo: 74,
    showLabel: true,
    wrap: 'inline-flex flex-col items-center justify-center gap-3',
    text: 'text-xs',
  },
  fullscreen: {
    w: 96,
    h: 76.49,
    halo: 190,
    showLabel: true,
    wrap: 'fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-background',
    text: 'text-sm',
  },
} as const

/** The official baseline, verbatim in French — it is the brand's line, not UI copy. */
const DEFAULT_LABEL = 'De l’idée floue au projet structuré.'

export interface ScaffoldLogoLoaderProps {
  /** `sm` is an inline glyph; `fullscreen` is a splash screen. Default `md`. */
  size?: 'sm' | 'md' | 'lg' | 'fullscreen'
  /** Shown under the mark, and always announced to assistive tech. */
  label?: string
  className?: string
}

export function ScaffoldLogoLoader({ size = 'md', label = DEFAULT_LABEL, className }: ScaffoldLogoLoaderProps) {
  const reduce = useReducedMotion()

  // Unique per instance and stable across SSR. The delimiters React wraps it in are
  // stripped so the result is safe inside a `url(#...)` reference.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const s = SIZES[size]

  const clipId = `scaffold-${uid}-clip`
  const restLightId = `scaffold-${uid}-rest`
  const restDarkId = `scaffold-${uid}-rest-dark`
  const beamLightId = `scaffold-${uid}-beam`
  const beamDarkId = `scaffold-${uid}-beam-dark`

  return (
    // A <span> rather than a <div>, so the `sm` variant is legal inside a paragraph.
    <span role="status" className={cn(s.wrap, className)}>
      <span className="relative block" style={{ width: s.w, height: s.h }}>
        {s.halo > 0 && (
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {/* The breathing glow. A radial gradient rather than a blurred solid: no
                filter to re-rasterise every frame it scales. */}
            <m.span
              className="block rounded-full [--bloom:rgba(34,197,94,0.24)] dark:[--bloom:rgba(34,197,94,0.55)]"
              style={{
                width: s.halo,
                height: s.halo,
                background: 'radial-gradient(closest-side, var(--bloom), rgba(34,197,94,0))',
              }}
              initial={{ opacity: 0.34, scale: 1 }}
              animate={reduce ? { opacity: 0.34, scale: 1 } : { opacity: HALO_OPACITY, scale: HALO_SCALE }}
              transition={reduce ? { duration: 0 } : haloTransition}
            />
          </span>
        )}

        <svg
          width={s.w}
          height={s.h}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          fill="none"
          aria-hidden="true"
          className="relative block"
        >
          <defs>
            {/* The mark's silhouette. Everything painted below is clipped to it, so light
                can never spill outside a plank. */}
            <clipPath id={clipId}>
              {BARS.map((b) => (
                <rect key={b.y} x={b.x} y={b.y} width={b.w} height={b.h} rx={b.h / 2} />
              ))}
            </clipPath>

            {/* Resting mark on light surfaces: the artwork's own diagonal, deep emerald
                bottom-left to lime top-right. `userSpaceOnUse` spans the whole viewBox,
                so the ramp runs across all four planks instead of restarting in each. */}
            <linearGradient id={restLightId} gradientUnits="userSpaceOnUse" x1="0" y1={VIEW_H} x2={VIEW_W} y2="0">
              <stop offset="0" stopColor={EMERALD} />
              <stop offset="0.52" stopColor={GREEN} />
              <stop offset="1" stopColor={LIME} />
            </linearGradient>

            {/* On Midnight Navy the official mark is white — deep emerald would sink into
                the ground. The green lives in the travelling light instead. */}
            <linearGradient id={restDarkId} gradientUnits="userSpaceOnUse" x1="0" y1={VIEW_H} x2={VIEW_W} y2="0">
              <stop offset="0" stopColor="#e6f7ee" />
              <stop offset="1" stopColor="#ffffff" />
            </linearGradient>

            {/* The band. Vertical in the beam rect's own bounding box, which the parent
                shear turns into a diagonal wavefront. */}
            <linearGradient id={beamLightId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="0.34" stopColor={LIME} stopOpacity="0.45" />
              <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="0.66" stopColor={GREEN} stopOpacity="0.42" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            <linearGradient id={beamDarkId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={GREEN} stopOpacity="0" />
              <stop offset="0.34" stopColor={GREEN} stopOpacity="0.5" />
              <stop offset="0.5" stopColor={LIME} stopOpacity="0.95" />
              <stop offset="0.66" stopColor={GREEN} stopOpacity="0.5" />
              <stop offset="1" stopColor={GREEN} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Reduced motion collapses the whole mark to this one opacity fade; at full
              motion the group is inert and costs nothing. */}
          <m.g
            initial={{ opacity: 1 }}
            animate={reduce ? { opacity: CALM_OPACITY } : { opacity: 1 }}
            transition={reduce ? calmTransition : { duration: 0 }}
          >
            <g clipPath={`url(#${clipId})`}>
              <rect className="dark:hidden" x="0" y="0" width={VIEW_W} height={VIEW_H} fill={`url(#${restLightId})`} />
              <rect
                className="hidden dark:block"
                x="0"
                y="0"
                width={VIEW_W}
                height={VIEW_H}
                fill={`url(#${restDarkId})`}
              />

              {/* The four-beat. At 16px the travelling band is barely three pixels of
                  ramp, so this per-plank flush is what carries the sequence at small
                  sizes — and it is a cross-fade of a pre-painted copy, not an animated
                  shadow. */}
              {!reduce &&
                BARS.map((b, i) => (
                  <m.rect
                    key={b.y}
                    x={b.x}
                    y={b.y}
                    width={b.w}
                    height={b.h}
                    rx={b.h / 2}
                    fill={LIME}
                    className="dark:fill-[#22c55e]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: BEAT_OPACITY }}
                    transition={BEAT_TRANSITIONS[i]}
                  />
                ))}

              {/* The travelling band. The static shear lives on the outer group so
                  motion's CSS transform on the inner one has nothing to fight over. */}
              {!reduce && (
                <g transform={`skewY(${BEAM_SKEW})`}>
                  <m.g initial={{ y: BEAM_Y[0] }} animate={{ y: BEAM_Y }} transition={beamTransition}>
                    <rect className="dark:hidden" x="-30" y="-26" width="170" height="52" fill={`url(#${beamLightId})`} />
                    <rect
                      className="hidden dark:block"
                      x="-30"
                      y="-26"
                      width="170"
                      height="52"
                      fill={`url(#${beamDarkId})`}
                    />
                  </m.g>
                </g>
              )}
            </g>
          </m.g>
        </svg>
      </span>

      {s.showLabel ? (
        <span
          className={cn(
            'block text-center font-medium tracking-[-0.01em]',
            'text-scaffold-emerald dark:text-scaffold-green',
            s.text
          )}
        >
          {label}
        </span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </span>
  )
}

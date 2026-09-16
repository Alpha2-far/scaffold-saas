/**
 * The Scaffold Theme Studio — the visual half of the WYSIWYB contract.
 *
 * Everything on this screen is read from `src/presets/`, which was ingested
 * once from designmd.ai through MCP and compiled locally. At runtime there is
 * no network call and no API key: the user browses, switches and inspects
 * every theme without leaving Scaffold.
 *
 * Three axes, all independent:
 *   · which theme          — the gallery, filterable by tag
 *   · light / dark         — scoped to the preview, not the app chrome
 *   · Visual / Raw         — live haptic components, or the DESIGN.md bytes
 *                            that `/export-product` will copy verbatim
 */
import { useEffect, useMemo, useState } from 'react'
import { Check, Code2, Eye, Moon, Search, Sun, ExternalLink, ShieldCheck } from 'lucide-react'
import {
  themes,
  themeTags,
  getTheme,
  loadTokens,
  loadDesignDoc,
  DEFAULT_THEME_ID,
  type Theme,
  type ThemeMode,
  type PresetTokens,
  type ContrastReport as ContrastReportData,
} from '@/presets'
import { Tappable } from '@/components/motion-primitives'
import { ScaffoldLogoLoader } from '@/components/ScaffoldLogoLoader'
import { cn } from '@/lib/utils'
import '@/presets/preview.css'

const STORAGE_KEY = 'scaffold.theme-studio'

type ViewMode = 'visual' | 'raw'

interface StudioState {
  themeId: string
  mode: ThemeMode
  view: ViewMode
}

/** localStorage can throw (private mode, blocked site data) — never let it
    take the page down with it. */
function readState(): StudioState {
  const fallback: StudioState = {
    themeId: DEFAULT_THEME_ID,
    mode: 'light',
    view: 'visual',
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as Partial<StudioState>
    return {
      themeId: getTheme(parsed.themeId) ? parsed.themeId! : fallback.themeId,
      mode: parsed.mode === 'dark' ? 'dark' : 'light',
      view: parsed.view === 'raw' ? 'raw' : 'visual',
    }
  } catch {
    return fallback
  }
}

export function ThemeStudio() {
  const [state, setState] = useState<StudioState>(readState)
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<string | null>(null)

  const theme = getTheme(state.themeId) ?? themes[0]

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* preference only — the studio works fine without persistence */
    }
  }, [state])

  const tags = useMemo(() => themeTags().slice(0, 12), [])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return themes.filter((t) => {
      if (tag && !t.tags.includes(tag)) return false
      if (!q) return true
      return (
        t.name.toLowerCase().includes(q) ||
        t.author.toLowerCase().includes(q) ||
        t.tags.some((x) => x.includes(q))
      )
    })
  }, [query, tag])

  if (!theme) return null

  return (
    <div className="space-y-5">
      {/* ---- Masthead ------------------------------------------------ */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-lime-600 dark:text-lime-400">
              Scaffold Theme Engine
            </span>
            <span className="h-px w-8 bg-gradient-to-r from-lime-500/60 to-transparent" />
          </div>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            {themes.length} thèmes internes
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            Ingérés une fois depuis designmd.ai, compilés localement. Zéro appel
            réseau à l'exécution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <SegmentedToggle
            options={[
              { value: 'light', label: 'Light', Icon: Sun },
              { value: 'dark', label: 'Dark', Icon: Moon },
            ]}
            value={state.mode}
            onChange={(mode) => setState((s) => ({ ...s, mode: mode as ThemeMode }))}
          />
          <SegmentedToggle
            options={[
              { value: 'visual', label: 'Visual', Icon: Eye },
              { value: 'raw', label: 'Raw', Icon: Code2 },
            ]}
            value={state.view}
            onChange={(view) => setState((s) => ({ ...s, view: view as ViewMode }))}
          />
        </div>
      </div>

      {/* ---- Filters ------------------------------------------------- */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400"
            strokeWidth={2}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un thème…"
            className="w-full h-8 pl-9 pr-3 rounded-lg text-xs bg-stone-100/70 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800/80 text-stone-700 dark:text-stone-200 placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/40 focus-visible:border-lime-500/60 transition-colors"
          />
        </div>

        <TagPill active={tag === null} onClick={() => setTag(null)}>
          Tous · {themes.length}
        </TagPill>
        {tags.map(({ tag: t, count }) => (
          <TagPill key={t} active={tag === t} onClick={() => setTag(tag === t ? null : t)}>
            {t} · {count}
          </TagPill>
        ))}
      </div>

      {/* ---- Gallery ------------------------------------------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {visible.map((t) => (
          <ThemeCard
            key={t.id}
            theme={t}
            selected={t.id === theme.id}
            onSelect={() => setState((s) => ({ ...s, themeId: t.id }))}
          />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="text-xs text-stone-500 dark:text-stone-400 py-4 text-center">
          Aucun thème ne correspond à ce filtre.
        </p>
      )}

      {/* ---- Stage --------------------------------------------------- */}
      {state.view === 'visual' ? (
        <VisualStage theme={theme} mode={state.mode} />
      ) : (
        <RawStage theme={theme} />
      )}
    </div>
  )
}

/* ==================================================================
   Chrome
   ================================================================== */

function TagPill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-8 px-2.5 rounded-lg text-[11px] font-medium transition-colors border cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/40',
        active
          ? 'bg-lime-500/15 text-lime-700 dark:text-lime-300 border-lime-500/40'
          : 'bg-stone-100/60 dark:bg-stone-900/50 text-stone-600 dark:text-stone-400 border-stone-200/60 dark:border-stone-800/70 hover:text-stone-900 dark:hover:text-stone-100',
      )}
    >
      {children}
    </button>
  )
}

function SegmentedToggle({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string; Icon: React.ComponentType<{ className?: string }> }[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div
      role="radiogroup"
      className="inline-flex items-center gap-0.5 rounded-xl border border-stone-200/60 dark:border-stone-800/80 bg-stone-100/70 dark:bg-stone-900/60 p-0.5"
    >
      {options.map(({ value: v, label, Icon }) => {
        const active = value === v
        return (
          <Tappable key={v}>
            <button
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(v)}
              className={cn(
                'inline-flex h-7 items-center gap-1.5 px-2.5 rounded-lg text-[11px] font-medium cursor-pointer transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/40',
                active
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100',
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          </Tappable>
        )
      })}
    </div>
  )
}

function ThemeCard({
  theme,
  selected,
  onSelect,
}: {
  theme: Theme
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'group text-left rounded-xl border p-2 cursor-pointer',
        'transition-[border-color,background-color,transform] duration-150',
        'active:scale-[0.98] motion-reduce:active:scale-100',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/40',
        selected
          ? 'border-lime-500/60 bg-lime-500/5 dark:bg-lime-500/10'
          : 'border-stone-200/60 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/40 hover:border-stone-300 dark:hover:border-stone-700',
      )}
    >
      <div className="flex h-8 rounded-md overflow-hidden border border-black/5 dark:border-white/10">
        {theme.swatches.map((hex, i) => (
          <div key={i} className="flex-1" style={{ backgroundColor: hex }} />
        ))}
      </div>
      <div className="flex items-start justify-between gap-1.5 mt-1.5">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-stone-900 dark:text-stone-100 truncate">
            {theme.name}
          </p>
          <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate">
            @{theme.author}
          </p>
        </div>
        {selected && (
          <Check className="w-3.5 h-3.5 shrink-0 text-lime-600 dark:text-lime-400 mt-0.5" strokeWidth={2.5} />
        )}
      </div>
    </button>
  )
}

/* ==================================================================
   Visual mode — the living components
   ================================================================== */

/**
 * Loads one theme's full token document. The preview's colors are already
 * correct before this resolves — theme.css is eager — so the fallback here
 * only ever covers the numbers and the specimen text, never the palette.
 */
function useThemeDetail(id: string): PresetTokens | null {
  // The loaded document is stored *with the id it belongs to*, and staleness
  // is decided during render. Resetting to null in the effect would work too,
  // but it costs a second render pass on every theme switch and shows the
  // previous theme's numbers for one frame in between.
  const [loaded, setLoaded] = useState<{ id: string; tokens: PresetTokens | null } | null>(null)

  useEffect(() => {
    let live = true
    loadTokens(id).then((tokens) => {
      if (live) setLoaded({ id, tokens })
    })
    return () => {
      live = false
    }
  }, [id])

  return loaded?.id === id ? loaded.tokens : null
}

function VisualStage({ theme, mode }: { theme: Theme; mode: ThemeMode }) {
  const detail = useThemeDetail(theme.id)

  if (!detail) {
    return (
      <div className="space-y-3">
        <ThemeHeader theme={theme} mode={mode} />
        <div
          data-scaffold-preset={theme.id}
          data-scaffold-mode={mode}
          className="ds-root flex items-center justify-center py-24 border border-stone-200/60 dark:border-stone-800/80"
        >
          <ScaffoldLogoLoader label={`Chargement de ${theme.name}…`} />
        </div>
      </div>
    )
  }

  const tokens = detail.modes[mode]
  const ratios = detail.contrast[mode]
  const corrected = detail.contrastCorrections.filter((c) => c.mode === mode)

  const SEMANTIC: [string, keyof typeof tokens][] = [
    ['Page', 'page'],
    ['Surface', 'surface'],
    ['Hairline', 'hairline'],
    ['Ink display', 'ink-display'],
    ['Ink body', 'ink-body'],
    ['Ink muted', 'ink-muted'],
    ['Accent', 'accent'],
    ['Accent faded', 'accent-faded'],
    ['Accent display', 'accent-display'],
    ['On accent', 'on-accent'],
    ['Signal', 'signal'],
    ['Danger', 'danger'],
  ]

  return (
    <div className="space-y-3">
      <ThemeHeader theme={theme} mode={mode} />

      <div
        data-scaffold-preset={theme.id}
        data-scaffold-mode={mode}
        className="ds-root p-5 sm:p-6 border border-stone-200/60 dark:border-stone-800/80 space-y-6"
      >
        {/* Type specimen */}
        <section className="space-y-2">
          <p className="ds-display text-2xl">{theme.name}</p>
          <p className="ds-body text-sm max-w-prose">
            {detail.description || 'Système de design ingéré depuis designmd.ai.'}
          </p>
          <p className="ds-muted text-xs">
            {detail.typography.display || '—'} · {detail.typography.body || '—'} ·{' '}
            <span className="ds-num">{detail.typography.mono || '—'}</span>
          </p>
        </section>

        {/* The 12 semantic tokens */}
        <section>
          <SectionLabel>Les 12 tokens sémantiques</SectionLabel>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {SEMANTIC.map(([label, key]) => (
              <div key={key}>
                <div className="ds-swatch" style={{ backgroundColor: tokens[key] }} />
                <p className="ds-muted text-[10px] mt-1 truncate">{label}</p>
                <p className="ds-num ds-muted text-[10px] uppercase">{tokens[key]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Haptic components */}
        <section>
          <SectionLabel>Composants haptiques</SectionLabel>
          <div className="flex flex-wrap items-center gap-2">
            <button className="ds-btn ds-btn-primary">Primary</button>
            <button className="ds-btn ds-btn-secondary">Secondary</button>
            <button className="ds-btn ds-btn-soft">Soft</button>
            <button className="ds-btn ds-btn-ghost">Ghost</button>
            <button className="ds-btn ds-btn-danger">Delete</button>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="ds-badge ds-badge-accent">
              <span className="ds-dot ds-dot-live" /> Live
            </span>
            <span className="ds-badge ds-badge-signal">Pending</span>
            <span className="ds-badge ds-badge-danger">Failed</span>
            <span className="ds-badge ds-badge-neutral">Draft</span>
            <span className="ds-badge ds-badge-solid">Locked</span>
          </div>
          <div className="mt-3 max-w-xs">
            <input className="ds-field" placeholder="Focus me — anneau accent" />
          </div>
        </section>

        {/* Tabular data */}
        <section>
          <SectionLabel>Tableau dense · tabular-nums</SectionLabel>
          <div className="ds-inner overflow-hidden">
            <table className="ds-table">
              <thead>
                <tr>
                  <th>Entité</th>
                  <th>Statut</th>
                  <th className="ds-td-num">Écrans</th>
                  <th className="ds-td-num">Couverture</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Project', 'Live', 12, '98.40'],
                  ['Milestone', 'Pending', 7, '74.05'],
                  ['Artifact', 'Draft', 3, '9.25'],
                ].map(([name, status, screens, cover]) => (
                  <tr key={String(name)}>
                    <td>{name}</td>
                    <td>
                      <span
                        className={cn(
                          'ds-badge',
                          status === 'Live'
                            ? 'ds-badge-accent'
                            : status === 'Pending'
                              ? 'ds-badge-signal'
                              : 'ds-badge-neutral',
                        )}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="ds-td-num">{screens}</td>
                    <td className="ds-td-num">{cover} %</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Radii + elevation, straight from the DESIGN.md */}
        {(detail.radii.length > 0 || detail.elevation.length > 0) && (
          <section className="grid sm:grid-cols-2 gap-5">
            {detail.radii.length > 0 && (
              <div>
                <SectionLabel>Rayons</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {detail.radii.slice(0, 6).map((r, i) => (
                    <div key={i} className="text-center">
                      <div
                        className="w-12 h-12 border"
                        style={{
                          borderRadius: r.value,
                          borderColor: tokens.hairline,
                          background: tokens.surface,
                        }}
                      />
                      <p className="ds-num ds-muted text-[10px] mt-1">{r.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {detail.elevation.length > 0 && (
              <div>
                <SectionLabel>Élévation</SectionLabel>
                <div className="flex flex-wrap gap-3">
                  {detail.elevation.slice(0, 3).map((shadow, i) => (
                    <div
                      key={i}
                      className="w-20 h-12 ds-inner"
                      style={{ boxShadow: shadow, background: tokens.surface }}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>

      <ContrastReport ratios={ratios} corrected={corrected} accessible={theme.accessible} />
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="ds-muted text-[10px] font-semibold uppercase tracking-[0.14em] mb-2.5">
      {children}
    </h4>
  )
}

function ThemeHeader({ theme, mode }: { theme: Theme; mode: ThemeMode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
      <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400">
        <span className="font-mono text-[10px] uppercase tracking-wider">
          {theme.id}
        </span>
        <span className="text-stone-300 dark:text-stone-700">·</span>
        <span>
          ramp <span className="font-mono">{theme.neutralRamp}</span>
        </span>
        <span className="text-stone-300 dark:text-stone-700">·</span>
        <span>
          natif <span className="font-mono">{theme.nativeMode}</span>
          {theme.nativeMode !== mode && (
            <span className="text-stone-400"> (mode dérivé)</span>
          )}
        </span>
      </div>
      <a
        href={theme.url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 text-[11px] text-stone-500 dark:text-stone-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
      >
        {theme.identifier}
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  )
}

function ContrastReport({
  ratios,
  corrected,
  accessible,
}: {
  ratios: ContrastReportData
  corrected: PresetTokens['contrastCorrections']
  accessible: boolean
}) {
  return (
    <div className="rounded-xl border border-stone-200/60 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/40 px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 text-[11px] font-medium',
            accessible
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-red-600 dark:text-red-400',
          )}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          {accessible ? 'WCAG AAA · 7:1 sur toutes les encres' : 'Contraste insuffisant'}
        </span>
        {Object.entries(ratios).map(([token, ratio]) => (
          <span key={token} className="text-[11px] text-stone-500 dark:text-stone-400">
            {token}{' '}
            <span className="font-mono tabular-nums text-stone-700 dark:text-stone-300">
              {ratio.toFixed(2)}:1
            </span>
          </span>
        ))}
      </div>
      {corrected.length > 0 && (
        <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-2 pt-2 border-t border-stone-200/50 dark:border-stone-800/60">
          {corrected.length} encre{corrected.length > 1 ? 's' : ''} du DESIGN.md
          d'origine remontée{corrected.length > 1 ? 's' : ''} à la barre :{' '}
          {corrected
            .map(
              (c) =>
                `${c.token} ${c.authored} (${c.authoredRatio.toFixed(2)}:1) → ${c.corrected} (${c.correctedRatio.toFixed(2)}:1)`,
            )
            .join(' · ')}
        </p>
      )}
    </div>
  )
}

/* ==================================================================
   Raw mode — the exact bytes that get exported
   ================================================================== */

function RawStage({ theme }: { theme: Theme }) {
  // Same pattern as useThemeDetail: the document carries the id it was loaded
  // for, so switching themes shows the loader rather than the previous
  // theme's markdown, without a reset render.
  const [loaded, setLoaded] = useState<{ id: string; doc: string | null } | null>(null)

  useEffect(() => {
    let live = true
    loadDesignDoc(theme.id).then((text) => {
      if (live) setLoaded({ id: theme.id, doc: text })
    })
    return () => {
      live = false
    }
  }, [theme.id])

  const loading = loaded?.id !== theme.id
  const doc = loading ? null : loaded.doc

  return (
    <div className="space-y-3">
      <ThemeHeader theme={theme} mode={theme.nativeMode} />
      <div className="rounded-2xl border border-stone-200/60 dark:border-stone-800/80 bg-stone-50/60 dark:bg-stone-950/60 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-stone-200/50 dark:border-stone-800/60">
          <span className="font-mono text-[11px] text-stone-500 dark:text-stone-400">
            product-plan/DESIGN.md
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
            source verbatim
          </span>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <ScaffoldLogoLoader />
          </div>
        ) : (
          <pre className="p-4 overflow-x-auto max-h-[32rem] text-[11px] leading-relaxed font-mono text-stone-700 dark:text-stone-300 whitespace-pre-wrap">
            {doc ?? 'DESIGN.md introuvable pour ce thème.'}
          </pre>
        )}
      </div>
    </div>
  )
}

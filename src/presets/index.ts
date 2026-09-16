/**
 * The Scaffold theme registry.
 *
 * Every theme here was ingested from designmd.ai once, through the `designmd`
 * MCP server, and compiled locally by `scripts/compile-presets.mjs`. At
 * runtime this module reads nothing but its own folder: no fetch, no API key,
 * no network. The user switches themes inside Scaffold and never leaves it.
 *
 * Three tiers of loading, chosen so the selector is instant and the bundle
 * stays small:
 *
 *   _registry.json  eager  — one ~11 kB index: names, authors, tags, swatches.
 *                            Enough to paint the whole gallery at once.
 *   theme.css       eager  — CSS custom properties, scoped per preset, so a
 *                            switch is one attribute change and the preview
 *                            repaints before any JSON has resolved.
 *   tokens.json     lazy   — the full token document for ONE theme, fetched
 *                            when it is selected. Eager-importing all 43 put
 *                            140 kB in the main bundle and broke the 500 kB
 *                            budget; the raw kit palettes alone run to 89
 *                            entries on the largest of them.
 *   DESIGN.md       lazy   — the ~6 kB source, only for Raw mode.
 */

// Side-effect import: each file declares [data-scaffold-preset="<id>"] blocks.
import.meta.glob('./*/theme.css', { eager: true })

import registryJson from './_registry.json'

const tokenLoaders = import.meta.glob('./*/tokens.json', {
  import: 'default',
}) as Record<string, () => Promise<PresetTokens>>

const designDocLoaders = import.meta.glob('./*/DESIGN.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

/* ------------------------------------------------------------------ */

/** What the gallery needs, and nothing more. */
export interface Theme {
  id: string
  name: string
  author: string
  identifier: string
  url: string
  tags: string[]
  nativeMode: ThemeMode
  neutralRamp: string
  /** Every token clears its contrast bar. Asserted by the compiler. */
  accessible: boolean
  /** Six representative colors for the selector card. */
  swatches: string[]
}

/** The 12 semantic tokens plus `on-accent` and the danger trio. */
export interface SemanticTokens {
  page: string
  surface: string
  hairline: string
  'ink-display': string
  'ink-body': string
  'ink-muted': string
  accent: string
  'accent-faded': string
  'accent-display': string
  'on-accent': string
  signal: string
  'signal-faded': string
  'signal-display': string
  danger: string
  'danger-faded': string
  'danger-display': string
}

export type ThemeMode = 'light' | 'dark'

export interface ContrastReport {
  'ink-display': number
  'ink-body': number
  'ink-muted': number
  'accent-display': number
  'signal-display': number
  'danger-display': number
  'on-accent': number
}

export interface ContrastCorrection {
  token: string
  mode: ThemeMode
  authored: string
  corrected: string
  authoredRatio: number
  correctedRatio: number
  floor: number
}

export interface PresetTokens {
  id: string
  name: string
  description: string
  source: { registry: string; identifier: string; author: string; url: string }
  nativeMode: ThemeMode
  neutralRamp: string
  palette: { label: string; hex: string }[]
  typography: { display: string | null; body: string | null; mono: string | null }
  radii: { value: string; usage: string }[]
  elevation: string[]
  spacing: { base: string | null; scale: string[] }
  modes: Record<ThemeMode, SemanticTokens>
  contrast: Record<ThemeMode, ContrastReport>
  contrastCorrections: ContrastCorrection[]
  contrastFailures: { mode: ThemeMode; token: string; ratio: number; bar: number }[]
}

/* ------------------------------------------------------------------ */

const idFromPath = (path: string) => path.split('/')[1]

/** Every ingested theme, sorted by display name. Frozen — this is a registry. */
export const themes: readonly Theme[] = Object.freeze(
  (registryJson as Theme[])
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name)),
)

const byId = new Map(themes.map((t) => [t.id, t]))

/** The theme Scaffold opens on when the user has not chosen one. */
export const DEFAULT_THEME_ID = byId.has('genesis') ? 'genesis' : themes[0]?.id

export function getTheme(id: string | null | undefined): Theme | undefined {
  return id ? byId.get(id) : undefined
}

/** All tags across the registry, with counts, most common first. */
export function themeTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const theme of themes) {
    for (const tag of theme.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

/**
 * The full token document for one theme — the 12 semantic tokens in both
 * modes, the measured ratios, the corrections the compiler applied, and the
 * typography / radii / elevation the kit declared. Loaded on selection.
 *
 * Results are memoized: re-selecting a theme the user already looked at is
 * instant, and the module is in the browser cache regardless.
 */
const tokenCache = new Map<string, Promise<PresetTokens | null>>()

export function loadTokens(id: string): Promise<PresetTokens | null> {
  const cached = tokenCache.get(id)
  if (cached) return cached

  const entry = Object.entries(tokenLoaders).find(
    ([path]) => idFromPath(path) === id,
  )
  const promise = entry ? entry[1]() : Promise.resolve(null)
  tokenCache.set(id, promise)
  return promise
}

/**
 * The raw DESIGN.md for a theme — the exact bytes designmd.ai served, which
 * is what Raw mode shows and what `/export-product` copies into
 * `product-plan/DESIGN.md`. Loaded on demand.
 */
export async function loadDesignDoc(id: string): Promise<string | null> {
  const entry = Object.entries(designDocLoaders).find(
    ([path]) => idFromPath(path) === id,
  )
  if (!entry) return null
  return entry[1]()
}

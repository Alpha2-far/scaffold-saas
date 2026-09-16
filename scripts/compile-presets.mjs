#!/usr/bin/env node
/**
 * compile-presets.mjs — the DESIGN.md → Scaffold tokens compiler.
 *
 * Reads every `src/presets/<slug>/DESIGN.md` ingested from designmd.ai and
 * compiles it, locally and deterministically, into:
 *
 *   src/presets/<slug>/tokens.json   the 12 semantic tokens (light + dark),
 *                                    typography, radii, elevation, spacing,
 *                                    and the measured contrast ratios
 *   src/presets/<slug>/theme.css     scoped CSS custom properties
 *
 * Nothing here calls the network. Run it once after ingestion; the app only
 * ever reads the compiled output.
 *
 * The derivation follows `bm-skills/skills/bm-design-system/references/
 * derive-palette.md` exactly: OKLCH lightness search for the *-display
 * tokens, 12%/18% mixing for the *-faded pair, and a 7:1 (AAA) bar on every
 * ink. A DESIGN.md usually declares only one mode; the other is synthesized
 * on the neutral ramp whose hue is closest to the kit's own neutrals.
 *
 *   node scripts/compile-presets.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PRESETS = join(ROOT, 'src', 'presets')

/* ==================================================================
   Color math — sRGB ⇄ linear ⇄ OKLab ⇄ OKLCH, and WCAG contrast
   ================================================================== */

const clamp = (n, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n))

function hexToRgb(hex) {
  let h = hex.trim().replace(/^#/, '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  if (h.length !== 6 || !/^[0-9a-f]{6}$/i.test(h)) return null
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

const rgbToHex = ([r, g, b]) =>
  '#' +
  [r, g, b]
    .map((c) => Math.round(clamp(c, 0, 255)).toString(16).padStart(2, '0'))
    .join('')

const toLinear = (c) => {
  const s = c / 255
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

const fromLinear = (l) => {
  const s = l <= 0.0031308 ? l * 12.92 : 1.055 * Math.pow(clamp(l), 1 / 2.4) - 0.055
  return s * 255
}

/** WCAG 2.x relative luminance. */
function luminance(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0
  const [r, g, b] = rgb.map(toLinear)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG contrast ratio, rounded to 2dp. */
function contrast(a, b) {
  const la = luminance(a)
  const lb = luminance(b)
  const [hi, lo] = la > lb ? [la, lb] : [lb, la]
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100
}

// Björn Ottosson's OKLab matrices.
function hexToOklch(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return null
  const [r, g, b] = rgb.map(toLinear)

  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)

  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s

  return {
    L,
    C: Math.sqrt(A * A + B * B),
    H: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360,
  }
}

function oklchToRgbRaw({ L, C, H }) {
  const a = C * Math.cos((H * Math.PI) / 180)
  const b = C * Math.sin((H * Math.PI) / 180)

  const l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s_ = (L - 0.0894841775 * a - 1.291485548 * b) ** 3

  return [
    +4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ]
}

/**
 * OKLCH → hex, reducing chroma until the color lands inside sRGB. Clipping
 * channels instead would shift the hue, which is the exact artifact the
 * perceptual space was chosen to avoid.
 */
function oklchToHex({ L, C, H }) {
  let c = C
  for (let i = 0; i < 40; i++) {
    const lin = oklchToRgbRaw({ L, C: c, H })
    if (lin.every((v) => v >= -0.0005 && v <= 1.0005)) break
    c *= 0.94
  }
  return rgbToHex(oklchToRgbRaw({ L, C: c, H }).map(fromLinear))
}

/** Mix foreground over background at ratio p (0..1), per derive-palette §3.3. */
function mix(fg, bg, p) {
  const f = hexToRgb(fg)
  const b = hexToRgb(bg)
  if (!f || !b) return fg
  return rgbToHex(f.map((c, i) => Math.round(c * p + b[i] * (1 - p))))
}

/**
 * Move a color along its own OKLCH lightness axis until it clears `target`
 * against `bg`, keeping hue and chroma — so the result is still recognizably
 * the same color, just legible.
 *
 * The whole L range is scanned rather than one guessed direction, and among
 * the candidates that clear we keep the one *closest to the original
 * lightness*. That is what preserves the kit's character: we move the color
 * the minimum distance that legality requires, not the maximum that contrast
 * allows.
 *
 * If nothing clears, the highest-contrast candidate is returned and the
 * caller records the shortfall — never a silent failure.
 */
function deriveDisplay(color, bg, target = 7) {
  const base = hexToOklch(color)
  if (!base) return { hex: color, ratio: contrast(color, bg) }

  const asIs = contrast(color, bg)
  if (asIs >= target) return { hex: color, ratio: asIs }

  let clearing = null   // closest-to-original among those that clear
  let fallback = { hex: color, ratio: asIs }

  for (let L = 0.02; L <= 0.99; L += 0.005) {
    const hex = oklchToHex({ ...base, L })
    const ratio = contrast(hex, bg)
    if (ratio > fallback.ratio) fallback = { hex, ratio }
    if (ratio >= target) {
      const drift = Math.abs(L - base.L)
      if (!clearing || drift < clearing.drift) clearing = { hex, ratio, drift }
    }
  }
  return clearing ? { hex: clearing.hex, ratio: clearing.ratio } : fallback
}

/**
 * The foreground for a solid accent fill. White first — it is right for most
 * accents and keeps buttons feeling standard. If white cannot clear 4.5:1,
 * walk the accent's own hue down to a near-black of the same family, which
 * keeps the button feeling like one color rather than two.
 */
function deriveOnAccent(accent) {
  const white = contrast('#ffffff', accent)
  if (white >= 4.5) return { hex: '#ffffff', ratio: white }

  const base = hexToOklch(accent)
  let best = { hex: '#ffffff', ratio: white }
  for (let i = 1; i <= 120; i++) {
    const L = clamp(base.L - i * 0.005, 0.02, 0.99)
    const hex = oklchToHex({ ...base, L, C: base.C * 0.6 })
    const ratio = contrast(hex, accent)
    if (ratio > best.ratio) best = { hex, ratio }
    if (ratio >= 4.5) return { hex, ratio }
    if (L <= 0.02) break
  }
  return best
}

/* ==================================================================
   Neutral ramps — derive-palette.md §3.4
   ================================================================== */

const RAMPS = {
  zinc:    { 50:'#fafafa',100:'#f4f4f5',200:'#e4e4e7',400:'#a1a1aa',600:'#52525b',700:'#3f3f46',800:'#27272a',900:'#18181b',950:'#09090b' },
  slate:   { 50:'#f8fafc',100:'#f1f5f9',200:'#e2e8f0',400:'#94a3b8',600:'#475569',700:'#334155',800:'#1e293b',900:'#0f172a',950:'#020617' },
  stone:   { 50:'#fafaf9',100:'#f5f5f4',200:'#e7e5e4',400:'#a8a29e',600:'#57534e',700:'#44403c',800:'#292524',900:'#1c1917',950:'#0c0a09' },
  gray:    { 50:'#f9fafb',100:'#f3f4f6',200:'#e5e7eb',400:'#9ca3af',600:'#4b5563',700:'#374151',800:'#1f2937',900:'#111827',950:'#030712' },
  neutral: { 50:'#fafafa',100:'#f5f5f5',200:'#e5e5e5',400:'#a3a3a3',600:'#525252',700:'#404040',800:'#262626',900:'#171717',950:'#0a0a0a' },
}

/** Pick the ramp whose hue is closest to the kit's own neutral tone. */
function pickRamp(sampleHex) {
  const s = sampleHex && hexToOklch(sampleHex)
  if (!s || s.C < 0.012) return 'zinc' // achromatic → the pure ramp
  let best = 'zinc'
  let bestDelta = Infinity
  for (const [name, ramp] of Object.entries(RAMPS)) {
    const r = hexToOklch(ramp[600])
    let d = Math.abs(r.H - s.H)
    if (d > 180) d = 360 - d
    if (d < bestDelta) { bestDelta = d; best = name }
  }
  return best
}

/* ==================================================================
   DESIGN.md parsing
   ================================================================== */

const HEX = /#[0-9a-fA-F]{6}\b/

/** Slice out a section by heading, tolerating `## 2. Color Palette` forms. */
function section(md, pattern) {
  const lines = md.split('\n')
  let start = -1
  let level = 0
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(#{2,4})\s*(?:\d+\.\s*)?(.+?)\s*$/)
    if (m && pattern.test(m[2])) { start = i + 1; level = m[1].length; break }
  }
  if (start === -1) return ''
  const out = []
  for (let i = start; i < lines.length; i++) {
    const m = lines[i].match(/^(#{2,4})\s/)
    if (m && m[1].length <= level) break
    out.push(lines[i])
  }
  return out.join('\n')
}

/**
 * Pull labelled colors out of a DESIGN.md. The ingested corpus uses four
 * shapes and every one of them appears in the 43 kits:
 *
 *   - **Primary** (#6366F1): CTAs and links          bullet, hex in parens
 *   - **Primary**: `#6366F1`                          bullet, hex after colon
 *   | Primary | `#0A0A0A` | Headings |                markdown table row
 *   primary: "#fe6e00"                                YAML front matter
 *
 * First label wins, so a kit's own ordering decides which of two synonymous
 * entries becomes the role.
 */
function parseColors(md) {
  const scope =
    section(md, /^colou?rs?$|colou?r palette|design tokens|colou?r/i) || md
  const found = []
  const seen = new Set()

  const push = (rawLabel, rawHex) => {
    const rgb = hexToRgb(rawHex)
    if (!rgb) return
    const label = rawLabel.replace(/[`*|]/g, '').trim()
    if (!label || label.length > 48) return
    const key = label.toLowerCase()
    if (key === 'hex' || key === 'token' || seen.has(key)) return
    seen.add(key)
    found.push({ label, hex: rgbToHex(rgb) })
  }

  for (const line of scope.split('\n')) {
    // Bullet, with the colon inside or outside the bold and the hex either
    // parenthesised or immediate:
    //   - **Primary** (#6366F1): …
    //   - **Primary**: `#6366F1`
    //   - **Background Primario:** `#121212` (…)
    let m = line.match(
      /^\s*[-*]\s+\*\*\s*(.+?)\s*:?\s*\*\*\s*:?\s*(?:\(\s*`?(#[0-9a-fA-F]{3,6})`?\s*\)|`?(#[0-9a-fA-F]{3,6})`?)/,
    )
    if (m) { push(m[1], m[2] || m[3]); continue }

    // Markdown table row: `| Label | `#hex` | role |`
    m = line.match(/^\s*\|\s*([^|]+?)\s*\|\s*`?(#[0-9a-fA-F]{3,6})`?\s*\|/)
    if (m) { push(m[1], m[2]); continue }
  }

  // Fallbacks, scanned over the whole document — these kits carry no
  // recognizable `## Colors` section at all.
  if (found.length === 0) {
    // YAML front matter: `primary: "#fe6e00"`
    for (const line of md.split('\n')) {
      const m = line.match(
        /^\s{0,4}([a-z][a-z0-9-]{1,40})\s*:\s*["'`]?(#[0-9a-fA-F]{3,6})["'`]?\s*$/i,
      )
      if (m) push(m[1], m[2])
    }
  }
  if (found.length === 0) {
    // Token named inline in prose: `` `surface-container-lowest` (#ffffff) ``.
    // Last resort — it reads the design vocabulary out of the writing itself.
    const re = /`([a-z][a-z0-9-]{1,40})`\s*\(\s*(#[0-9a-fA-F]{3,6})\s*\)/gi
    let m
    while ((m = re.exec(md))) push(m[1], m[2])
  }

  return found
}

/** Map a kit's free-form color labels onto Scaffold's semantic roles. */
// Labels are matched hyphen- and space-insensitively, because the corpus
// writes the same role as `Text Primary`, `text-primary` and `on-surface`.
const ROLE_RULES = [
  ['accent',      /^(primary|accent|brand)(?![- ]?(hover|strong|warm|focus))/i],
  ['accentAlt',   /^(primary|accent)[- ](hover|strong)/i],
  ['page',        /^(background|bg|page|canvas)\b|page background/i],
  ['surface',     /^(surface|card|panel|elevated)\b(?![- ]?(soft|muted))/i],
  ['hairline',    /^(border|outline|divider|stroke|rule)\b(?![- ]?strong)/i],
  ['inkDisplay',  /^text[- ]primary\b|^(heading|ink|foreground)\b|^on[- ]background\b|^on[- ]surface$|primary text/i],
  ['inkBody',     /^text[- ]secondary\b|body text|^body\b|secondary text/i],
  ['inkMuted',    /^(muted|tertiary|placeholder|subtle)\b|text[- ]muted|on[- ]surface[- ]muted|text[- ]tertiary|^neutral\b/i],
  ['signal',      /^(warning|caution|pending|attention)\b/i],
  ['danger',      /^(error|danger|destructive|critical|negative)\b/i],
  ['success',     /^(success|positive|confirm|published)\b/i],
]

function assignRoles(colors) {
  const roles = {}
  for (const [role, re] of ROLE_RULES) {
    const hit = colors.find((c) => re.test(c.label))
    if (hit) roles[role] = hit.hex
  }
  return roles
}

function parseTypography(md) {
  const scope = section(md, /typography|fonts?$/i) || md
  const grab = (re) => {
    const m = scope.match(re)
    if (!m) return null
    // Strip trailing provenance: "DM Sans — loaded from Google Fonts".
    return m[1].split(/\s+[—–-]\s+/)[0].replace(/[`*]/g, '').trim() || null
  }
  return {
    display:
      grab(/\*\*(?:display|heading|headline|title)\s*font\*\*\s*:?\s*(.+)/i) ||
      grab(/\*\*font\s*(?:family|stack)\*\*\s*:?\s*(.+)/i),
    body: grab(/\*\*(?:body|text|ui)\s*font\*\*\s*:?\s*(.+)/i),
    mono: grab(/\*\*(?:code|mono(?:space)?)\s*font\*\*\s*:?\s*(.+)/i),
  }
}

function parseRadii(md) {
  const scope = section(md, /border radius|radius|radii|borders? (?:&|and) radii|shapes/i)
  if (!scope) return []
  const out = []
  for (const line of scope.split('\n')) {
    const m = line.match(/^\s*[-*]\s+`?(\d+(?:\.\d+)?)(px|rem)`?\s*:\s*(.+)/)
    if (m) out.push({ value: `${m[1]}${m[2]}`, usage: m[3].replace(/[`*]/g, '').trim() })
    else {
      const b = line.match(/^\s*[-*]\s+\*\*(.+?)\*\*\s*\(?\s*`?(\d+(?:\.\d+)?)(px|rem)`?/)
      if (b) out.push({ value: `${b[2]}${b[3]}`, usage: b[1].trim() })
    }
  }
  return out
}

function parseElevation(md) {
  const scope = section(md, /elevation|shadows?|depth/i)
  if (!scope) return []
  const shadows = scope.match(/(?:inset\s+)?-?\d[\d.]*px[^,;)\n]*rgba?\([^)]*\)/gi) || []
  return [...new Set(shadows.map((s) => s.trim()))].slice(0, 8)
}

function parseSpacing(md) {
  const scope = section(md, /spacing|layout (?:&|and) spacing|layout/i)
  if (!scope) return { base: null, scale: [] }
  const base = scope.match(/base\s*unit\s*:?\s*`?(\d+)(px|rem)?/i)
  const scaleLine = scope.match(/scale\s*:?\s*([\d,\s]+)(px|rem)?/i)
  return {
    base: base ? `${base[1]}${base[2] || 'px'}` : null,
    scale: scaleLine
      ? scaleLine[1].split(',').map((n) => n.trim()).filter(Boolean).slice(0, 16)
      : [],
  }
}

function parseMeta(md) {
  const h1 = md.match(/^#\s+(.+)$/m)
  const overview = section(md, /overview|visual theme|visual tone|atmosphere/i)
  const firstPara = overview
    .split('\n')
    .map((l) => l.trim())
    .find((l) => l && !l.startsWith('#') && !l.startsWith('-') && !l.startsWith('>'))
  return {
    name: h1 ? h1[1].replace(/^DESIGN\.md\s*[-–—]\s*/i, '').replace(/["']/g, '').trim() : null,
    description: firstPara ? firstPara.replace(/[`*]/g, '').slice(0, 400) : null,
  }
}

/* ==================================================================
   Token derivation — build both modes from whatever the kit gave us
   ================================================================== */

function buildMode({ accent, signal, danger, ramp, dark }) {
  const R = RAMPS[ramp]
  const page = dark ? R[950] : '#ffffff'
  const surface = dark ? R[900] : R[50]
  const hairline = dark ? R[800] : R[200]
  const inkDisplay = dark ? R[50] : R[950]
  const inkBody = dark ? R[200] : R[700]
  const inkMuted = dark ? R[400] : R[600]

  const mixP = dark ? 0.18 : 0.12
  const accentFaded = mix(accent, page, mixP)
  const accentDisplay = deriveDisplay(accent, page, 7)
  const onAccent = deriveOnAccent(accent)

  const signalFaded = mix(signal, page, mixP)
  const signalDisplay = deriveDisplay(signal, page, 7)

  const dangerFaded = mix(danger, page, mixP)
  const dangerDisplay = deriveDisplay(danger, page, 7)

  return {
    tokens: {
      page, surface, hairline,
      'ink-display': inkDisplay,
      'ink-body': inkBody,
      'ink-muted': inkMuted,
      accent,
      'accent-faded': accentFaded,
      'accent-display': accentDisplay.hex,
      'on-accent': onAccent.hex,
      signal,
      'signal-faded': signalFaded,
      'signal-display': signalDisplay.hex,
      danger,
      'danger-faded': dangerFaded,
      'danger-display': dangerDisplay.hex,
    },
    contrast: {
      'ink-display': contrast(inkDisplay, page),
      'ink-body': contrast(inkBody, page),
      'ink-muted': contrast(inkMuted, page),
      'accent-display': accentDisplay.ratio,
      'signal-display': signalDisplay.ratio,
      'danger-display': dangerDisplay.ratio,
      'on-accent': onAccent.ratio,
    },
  }
}

/* ==================================================================
   Emit
   ================================================================== */

function cssBlock(selector, tokens, indent = '  ') {
  const body = Object.entries(tokens)
    .map(([k, v]) => `${indent}--ds-${k}: ${v};`)
    .join('\n')
  return `${selector} {\n${body}\n}`
}

/** Ladder violations found during compilation — fails the run if non-empty. */
const ladderErrors = []

function compile(slug, source) {
  const md = readFileSync(join(PRESETS, slug, 'DESIGN.md'), 'utf8')

  const colors = parseColors(md)
  const roles = assignRoles(colors)
  const meta = parseMeta(md)

  // Fall back through the kit's own palette before reaching for a default,
  // so a kit that names its accent something unexpected still gets its own
  // color rather than ours.
  const accent = roles.accent || colors[0]?.hex || '#22c55e'
  const signal = roles.signal || '#fcd34d'
  const danger = roles.danger || '#dc2626'
  const ramp = pickRamp(roles.hairline || roles.inkMuted || roles.surface)

  // Which mode did the kit actually author? Its own page color tells us.
  const nativeDark = roles.page ? luminance(roles.page) < 0.18 : false

  const light = buildMode({ accent, signal, danger, ramp, dark: false })
  const dark = buildMode({ accent, signal, danger, ramp, dark: true })

  // Honor the kit's authored surfaces in its native mode — that is the part
  // of its identity a ramp cannot reproduce. The other mode stays derived.
  const native = nativeDark ? dark : light
  const corrections = []

  for (const token of ['page', 'surface', 'hairline']) {
    const role = { page: 'page', surface: 'surface', hairline: 'hairline' }[token]
    if (roles[role]) native.tokens[token] = roles[role]
  }

  // Authored ink is adopted only if it clears the bar. A DESIGN.md written
  // by hand rarely targets AAA — Genesis's `Text Secondary #6B6B6B` on
  // `#FAFAFA` is a pleasant 5.1:1 and an inaccessible body color. Rather than
  // drop the kit's ink for a ramp step, we walk it along its own hue until it
  // clears, and record the move. The kit keeps its tone; the user keeps their
  // eyesight.
  //
  // The three inks are then held apart. Correcting each one independently
  // collapses the ladder — Genesis's body (5.11) and muted (2.63) both land
  // on the same #555555 the moment 7:1 is the only rule, and the difference
  // between a paragraph and its timestamp disappears. So each step up the
  // hierarchy must clear 1.25x the step below it. Muted is corrected first
  // and moves least, because it is the one the reader needs to recede.
  {
    const page = native.tokens.page
    const ladder = [
      ['inkMuted', 'ink-muted'],
      ['inkBody', 'ink-body'],
      ['inkDisplay', 'ink-display'],
    ]

    // Sanity guard: a "muted" ink that out-contrasts the body ink is not
    // muted — the label was mis-assigned by the kit or by us. ThoughtStream
    // names a near-black `#1c1917` in a position our rules read as muted;
    // adopting it makes the ladder unsatisfiable and both inks clamp to pure
    // black. When the order is inverted, fall back to the ramp step, which is
    // muted by construction.
    const usable = { ...roles }
    if (usable.inkMuted && usable.inkBody) {
      const pg = native.tokens.page
      if (contrast(usable.inkMuted, pg) > contrast(usable.inkBody, pg)) {
        delete usable.inkMuted
      }
    }

    let floor = 7
    for (const [role, token] of ladder) {
      const authored = usable[role] || native.tokens[token]
      const fixed = deriveDisplay(authored, page, floor)
      native.tokens[token] = fixed.hex
      if (usable[role] && fixed.hex.toLowerCase() !== authored.toLowerCase()) {
        corrections.push({
          token,
          mode: nativeDark ? 'dark' : 'light',
          authored,
          corrected: fixed.hex,
          authoredRatio: contrast(authored, page),
          correctedRatio: fixed.ratio,
          floor,
        })
      }
      // The next rung up must out-contrast this one. No cap: capping the
      // floor (at 13:1, say) lets an inversion through whenever a kit's
      // authored display ink is already above the cap but *below* its own
      // body ink — Atmospheric Glass ships exactly that, display 14.34:1
      // under body 14.58:1, and a capped floor waves it past because 14.34
      // clears 13. The step is 1.15 rather than 1.25 so the top of the
      // ladder has somewhere to go.
      floor = Math.max(7, fixed.ratio * 1.15)
    }

    // Assert what the loop was supposed to produce. A collapsed or inverted
    // ladder is a silent, page-wide legibility bug — every paragraph and
    // every timestamp rendering as the same weight of grey — so it fails the
    // compile rather than shipping.
    const rungs = ['ink-muted', 'ink-body', 'ink-display'].map((t) =>
      contrast(native.tokens[t], page),
    )
    if (!(rungs[0] < rungs[1] && rungs[1] < rungs[2])) {
      ladderErrors.push(
        `${slug} ${nativeDark ? 'dark' : 'light'}: muted ${rungs[0].toFixed(2)} ` +
          `body ${rungs[1].toFixed(2)} display ${rungs[2].toFixed(2)}`,
      )
    }
  }

  // A card has to be findable. Eight of the ingested kits paint `surface` the
  // same color as `page` — RawBlock and Broadsheet do it deliberately, and
  // flattening that would erase the thing that makes them themselves. So the
  // rule is not "surface must differ from page"; it is "a card must be
  // separable from the page by *something*". When the fill does not do it,
  // the hairline must.
  for (const mode of ['light', 'dark']) {
    const m = mode === 'light' ? light.tokens : dark.tokens
    const fill = contrast(m.surface, m.page)
    const edge = contrast(m.hairline, m.page)
    if (fill < 1.03 && edge < 1.2) {
      ladderErrors.push(
        `${slug} ${mode}: card is invisible — surface/page ${fill.toFixed(3)} ` +
          `and hairline/page ${edge.toFixed(3)}, neither separates it`,
      )
    }
  }

  // Re-mix and re-measure against the authored page, not the ramp's.
  {
    const page = native.tokens.page
    const p = nativeDark ? 0.18 : 0.12
    native.tokens['accent-faded'] = mix(accent, page, p)
    native.tokens['signal-faded'] = mix(signal, page, p)
    native.tokens['danger-faded'] = mix(danger, page, p)
    const ad = deriveDisplay(accent, page, 7)
    const sd = deriveDisplay(signal, page, 7)
    const dd = deriveDisplay(danger, page, 7)
    native.tokens['accent-display'] = ad.hex
    native.tokens['signal-display'] = sd.hex
    native.tokens['danger-display'] = dd.hex
    native.contrast = {
      'ink-display': contrast(native.tokens['ink-display'], page),
      'ink-body': contrast(native.tokens['ink-body'], page),
      'ink-muted': contrast(native.tokens['ink-muted'], page),
      'accent-display': ad.ratio,
      'signal-display': sd.ratio,
      'danger-display': dd.ratio,
      'on-accent': native.contrast['on-accent'],
    }
  }

  const failures = []
  for (const mode of ['light', 'dark']) {
    const c = mode === 'light' ? light.contrast : dark.contrast
    for (const [token, ratio] of Object.entries(c)) {
      const bar = token === 'on-accent' ? 4.5 : 7
      if (ratio < bar) failures.push({ mode, token, ratio, bar })
    }
  }

  const tokens = {
    id: slug,
    name: meta.name || source.name || slug,
    description: meta.description || '',
    source: {
      registry: 'designmd.ai',
      identifier: source.identifier,
      author: source.author,
      url: source.url,
    },
    nativeMode: nativeDark ? 'dark' : 'light',
    neutralRamp: ramp,
    palette: colors,
    typography: parseTypography(md),
    radii: parseRadii(md),
    elevation: parseElevation(md),
    spacing: parseSpacing(md),
    modes: { light: light.tokens, dark: dark.tokens },
    contrast: { light: light.contrast, dark: dark.contrast },
    contrastCorrections: corrections,
    contrastFailures: failures,
  }

  writeFileSync(
    join(PRESETS, slug, 'tokens.json'),
    JSON.stringify(tokens, null, 2) + '\n',
  )

  const css = `/* Generated by scripts/compile-presets.mjs from DESIGN.md — do not edit.
   Source: ${source.url} */

${cssBlock(`[data-scaffold-preset="${slug}"]`, light.tokens)}

${cssBlock(`[data-scaffold-preset="${slug}"][data-scaffold-mode="dark"]`, dark.tokens)}
`
  writeFileSync(join(PRESETS, slug, 'theme.css'), css)

  return {
    slug,
    colors: colors.length,
    failures: failures.length,
    corrections: corrections.length,
    ramp,
    nativeDark,
  }
}

/* ==================================================================
   Catalog — provenance for every ingested kit
   ================================================================== */

const CATALOG = JSON.parse(readFileSync(join(PRESETS, '_catalog.json'), 'utf8'))

const slugs = readdirSync(PRESETS).filter(
  (d) => statSync(join(PRESETS, d)).isDirectory(),
)

let totalFailures = 0
const rows = []
for (const slug of slugs.sort()) {
  const source = CATALOG[slug]
  if (!source) {
    console.error(`  ! ${slug} — missing from _catalog.json, skipped`)
    continue
  }
  const r = compile(slug, source)
  totalFailures += r.failures
  rows.push(r)
}

/* ------------------------------------------------------------------
   The registry index.

   Written as ONE small file rather than letting the app eager-import 43
   tokens.json: the full token documents carry each kit's raw palette (up to
   89 entries), radii, elevation and spacing, and importing them all eagerly
   put 140 kB into the main bundle and pushed it past the 500 kB budget.
   Only what the gallery paints belongs here; the rest loads when a theme is
   actually selected.
   ------------------------------------------------------------------ */

const registry = rows.map(({ slug }) => {
  const t = JSON.parse(readFileSync(join(PRESETS, slug, 'tokens.json'), 'utf8'))
  const native = t.modes[t.nativeMode]
  return {
    id: t.id,
    name: t.name,
    author: t.source.author,
    identifier: t.source.identifier,
    url: t.source.url,
    tags: CATALOG[slug].tags ?? [],
    nativeMode: t.nativeMode,
    neutralRamp: t.neutralRamp,
    accessible: t.contrastFailures.length === 0,
    swatches: [
      native.accent,
      native['accent-display'],
      native.page,
      native.surface,
      native['ink-display'],
      native.signal,
    ],
  }
})

writeFileSync(
  join(PRESETS, '_registry.json'),
  JSON.stringify(registry, null, 2) + '\n',
)

console.log(`\ncompiled ${rows.length} presets`)
let noColors = 0
let totalCorrections = 0
for (const r of rows) {
  if (r.colors === 0) noColors++
  totalCorrections += r.corrections
  const flags =
    (r.corrections ? `  ${r.corrections} ink corrected` : '') +
    (r.failures ? `  ⚠ ${r.failures} BELOW BAR` : '')
  console.log(
    `  ${r.slug.padEnd(24)} ${String(r.colors).padStart(2)} colors  ` +
      `${r.ramp.padEnd(8)} ${r.nativeDark ? 'dark ' : 'light'}${flags}`,
  )
}
console.log(
  `\n${totalCorrections} authored ink(s) walked up to the 7:1 bar ` +
    `(see contrastCorrections)`,
)
if (noColors) console.log(`${noColors} preset(s) parsed 0 colors — check the format`)
console.log(
  totalFailures
    ? `${totalFailures} token(s) STILL below the bar — see contrastFailures`
    : 'every token clears its contrast bar',
)

if (ladderErrors.length) {
  console.error(`\n${ladderErrors.length} inverted or collapsed ink ladder(s):`)
  for (const e of ladderErrors) console.error(`  ✗ ${e}`)
  process.exit(1)
}
console.log('every ink ladder is strictly ordered: display > body > muted')
console.log('every card is separable from its page, by fill or by hairline')

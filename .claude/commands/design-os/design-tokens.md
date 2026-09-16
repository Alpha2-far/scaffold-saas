# Design Tokens

You are helping the user lock the visual identity of their product.

Scaffold does not send the user anywhere to find a design system. The 43
themes in `src/presets/` were ingested once from designmd.ai and compiled
locally; the user browses them on `/design`, and this command records the
choice. There is no API call here, no key, and no external service — the whole
catalog is on disk.

The output is a single pivot file, `product/DESIGN.md`, plus the two JSON
token files the Design OS parsers already read. That pivot file is what
`/export-product` copies verbatim into `product-plan/DESIGN.md` and what the
downstream coding agent builds from. **What the user saw on `/design` is what
gets exported — byte for byte.** That is the WYSIWYB contract.

---

## §0. The universal interrogation rule (`ASK`)

Whenever this command needs a decision with discrete options, use `ASK`:

- **Claude Code** → `AskUserQuestion`
- **Antigravity** → `ask_question`
- **Cursor / Codex / any text terminal** → a formatted numbered list:
  `1. Option A`, `2. Option B`, …

Never hardcode a single host's tool. For free-form input (a custom hex, a font
name) use a normal chat message.

---

## Step 1: Check prerequisites

Read `product/product-overview.md` to understand what the product is.

If it does not exist:

> "Before defining your design system, you'll need to establish your product
> vision. Please run `/product-vision` first."

Stop here if the prerequisite is missing.

Also read `product/prd.md` if present, and specifically its
`## Out of Scope (V1)` matrix. A design system cannot introduce surface area —
if a theme's DESIGN.md documents components for capabilities the product has
explicitly cut, those components are not carried into `product/DESIGN.md`.

---

## Step 2: Present the two paths

> "Let's lock the visual identity for **[Product Name]**.
>
> Two ways to get there:
>
> 1. **Pick an ingested theme** — 43 complete design systems are already in
>    Scaffold, compiled and contrast-verified. Browse them on `/design`.
> 2. **Derive a custom palette** — give me an accent color and I'll derive the
>    full 12-token system mathematically.
>
> Either way you end up with the same thing: a `DESIGN.md` your coding agent
> can build from without guessing."

Use `ASK`:

- Question: "How do you want to set the visual identity?"
- Options:
  - `Pick an ingested theme (recommended)` — browse the 43 on `/design`
  - `Derive a custom palette from one accent color`
  - `Keep it minimal — Tailwind palette names only`

---

## Step 3a: Picking an ingested theme

Read `src/presets/_registry.json`. It carries, for every theme: `id`, `name`,
`author`, `identifier`, `url`, `tags`, `nativeMode`, `neutralRamp`,
`accessible`, and six representative `swatches`.

Narrow the field before presenting it — 43 options is not a choice, it is a
catalog. Infer 3–4 candidates from the product's own character (its overview,
its domain, its audience) and present those with `ASK`, each with one line
saying *why it fits this product*:

> - **Violet Issue** — dark, dense, keyboard-first. Fits a tool people live in
>   for hours.
> - **Genesis** — editorial precision, generous spacing. Fits a product whose
>   content is the point.
> - **Crypto Blue** — data-rich and trustworthy. Fits anything holding money.

Always include a fourth option: `Show me the full catalog on /design`.

Once chosen, read `src/presets/<id>/tokens.json` and
`src/presets/<id>/DESIGN.md`. Go to Step 4.

---

## Step 3b: Deriving a custom palette

Ask for one accent hex in a normal chat message, then use `ASK` for the
neutral family (`zinc` / `slate` / `stone` / `gray` / `neutral`).

Run §5 of
`bm-skills/skills/bm-design-system/references/derive-palette.md` — the same
arithmetic `scripts/compile-presets.mjs` runs:

1. Fill surfaces and ink off the neutral ramp.
2. `accent` is the input hex, in both modes.
3. `accent-faded` = accent mixed 12% on `#ffffff` (light), 18% on
   `neutral.950` (dark).
4. `accent-display` = the accent's own hue walked along OKLCH lightness until
   it clears **7:1** against the page.
5. `on-accent` = `#ffffff` if it clears 4.5:1 on the accent; otherwise the
   accent's own near-black.
6. **Measure every value before writing it.** Report the ratios.

If a custom accent cannot produce a compliant `accent-display`, say so and
offer the nearest hue that can. Do not lower the bar.

Alternatively, offer the 5 Scaffold author palettes — Titanium, Hyper Indigo,
Emerald Cyber, Amber Solar, Rose Quartz — which are pre-derived and
pre-measured in §4 of the same file.

---

## Step 3c: Minimal

Pick Tailwind palette names only (`primary` / `secondary` / `neutral`) and a
Google Fonts trio. Write only the two JSON files in Step 5, skip
`product/DESIGN.md`, and tell the user that `/export-product` will ship tokens
without a design system document.

This path exists for speed. Say plainly that it gives the coding agent less to
work from.

---

## Step 4: Confirm

Present the resolved system and its measurements:

> "Here's your design system — **[Theme Name]**, by [author]:
>
> **Surfaces** · page `#…` · surface `#…` · hairline `#…`
> **Ink** · display `#…` (N.N:1) · body `#…` (N.N:1) · muted `#…` (N.N:1)
> **Accent** · `#…` · faded `#…` · display `#…` (N.N:1) · on-accent `#…`
> **Signal** `#…` · **Danger** `#…`
>
> **Type** · [display] / [body] / [mono]
>
> Every ink clears WCAG AAA (7:1) in both light and dark.
>
> Ready to lock it in?"

If the compiler recorded `contrastCorrections` for this theme, say so, plainly:

> "Two inks in the original DESIGN.md sat below the bar —
> `ink-muted #9c9c9c` measured 2.63:1. Scaffold walked them along their own
> hue until they cleared 7:1 (`#555555`). The theme keeps its tone; your users
> keep their eyesight."

Do not hide this. The user chose a theme and is getting something slightly
different from what its author wrote — they are entitled to know why.

---

## Step 5: Write the files

Write all three. The JSON pair keeps the existing Design OS UI lit; the
`DESIGN.md` is what the coding agent actually builds from.

**File 1 — `product/design-system/colors.json`**

```json
{
  "primary": "[tailwind palette name closest to the accent]",
  "secondary": "[tailwind palette name closest to the signal]",
  "neutral": "[the neutral ramp: zinc | slate | stone | gray | neutral]"
}
```

These stay Tailwind *names*, not hex — `src/lib/design-system-loader.ts` and
`DesignPage`'s `colorMap` both key off names, and writing a hex here breaks
the swatch preview.

**File 2 — `product/design-system/typography.json`**

```json
{
  "heading": "[Google Font name]",
  "body": "[Google Font name]",
  "mono": "[Google Font name]"
}
```

**File 3 — `product/DESIGN.md`** — the pivot file.

When a theme was picked, start from `src/presets/<id>/DESIGN.md` and keep its
structure and prose. Then:

- Replace the `## Colors` section with the **compiled** 12 semantic tokens
  from `tokens.json`, both modes, with their measured ratios. The compiled
  values are the ones that are accessible; the kit's originals are not
  necessarily.
- Add a `## Provenance` section naming the source (`author/slug`, its
  designmd.ai URL, the license) and listing any `contrastCorrections`.
- Drop any component documented for a capability in the product's
  `## Out of Scope (V1)` matrix.

Use this skeleton:

```markdown
# [Product Name] — Design System

## Overview
[One paragraph: the visual character, in the product's own terms.]

## Colors

### Light
| Token | Value | Contrast |
|---|---|---|
| page | `#ffffff` | — |
| surface | `#fafafa` | — |
| hairline | `#e4e4e7` | — |
| ink-display | `#09090b` | 20.4:1 |
| ink-body | `#3f3f46` | 10.4:1 |
| ink-muted | `#52525b` | 7.6:1 |
| accent | `#22c55e` | — |
| accent-faded | `#e5f8ec` | — |
| accent-display | `#065f46` | 7.7:1 |
| on-accent | `#052e16` | 6.5:1 |
| signal | `#fcd34d` | — |
| signal-faded | `#fffaea` | — |
| signal-display | `#92400e` | 7.1:1 |
| danger | `#dc2626` | — |
| danger-faded | `#fbe5e5` | — |
| danger-display | `#991b1b` | 8.3:1 |

### Dark
[Same table, dark values.]

**`on-accent` is not `page`.** It is the foreground for a solid accent fill.
A bright accent under white text is unreadable — use `on-accent` on
`bg-accent`, always.

## Typography
- **Display Font**: [name]
- **Body Font**: [name]
- **Code Font**: [name]

[Scale, weights, letter-spacing.]

## Motion
- Spring: `cubic-bezier(0.16, 1, 0.3, 1)`
- Press: `scale(0.98)` on every clickable surface; `scale(0.95)` on small controls
- Exit is faster than entrance (100–150ms `ease-in`)
- All of it gated on `prefers-reduced-motion`

## Border Radius
[The ladder, and the concentric rule: R_outer = R_inner + padding.]

## Elevation
[Shadow tokens.]

## Spacing
[Base unit and scale.]

## Components
[Buttons, badges, inputs, tables, dialogs — each with its token bindings.]

## Do's and Don'ts
[Carried from the source theme, plus the product's own constraints.]

## Provenance
Ingested from [designmd.ai/author/slug](url) · license: [license]
Compiled locally by `scripts/compile-presets.mjs`. No runtime dependency on
any external service.

[If applicable:]
Contrast corrections applied: `ink-muted` `#9c9c9c` (2.63:1) → `#555555`
(7.14:1) to meet the WCAG AAA floor.
```

---

## Step 6: Confirm completion

> "Design system locked:
> - `product/DESIGN.md` — the pivot file your coding agent builds from
> - `product/design-system/colors.json`
> - `product/design-system/typography.json`
>
> Visit `/design` to see it rendered — the live components there are painted
> from exactly these tokens, and `/export-product` will ship exactly what you
> see.
>
> Next: run `/design-shell` to design your application's navigation and layout."

---

## Notes

- `colors.json` and `typography.json` keep the **existing contracts**. Do not
  change their shape — `design-system-loader.ts` validates the exact keys
  `primary` / `secondary` / `neutral` and `heading` / `body` / `mono`.
- Design tokens apply to the **product's** screen designs. Scaffold's own
  console keeps its stone/lime chrome and its Midnight Navy dark mode — the
  theme studio's preview is scoped to `[data-scaffold-preset]` precisely so it
  cannot leak into the app around it.
- Re-running this command is non-destructive: read the existing
  `product/DESIGN.md` first and offer to refresh tokens, swap the theme, or
  leave it.
- To re-ingest or extend the catalog, run the MCP ingestion again and then
  `node scripts/compile-presets.mjs`. The registry is regenerated from the
  `DESIGN.md` files on disk; nothing is fetched at build or at runtime.

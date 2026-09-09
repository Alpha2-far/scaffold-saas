# Section IDs

A section's ID is `slugify(roadmap title)`. `slugify()` in
`src/lib/product-loader.ts` is the single source of truth — anything creating a
section folder must reproduce its output exactly. When unsure, read the
function; don't guess.

## The rules, in order

```ts
str.normalize('NFD').replace(/[̀-ͯ]/g, '')  // é→e, ü→u
   .toLowerCase()
   .replace(/\s+&\s+/g, '-and-')                      // " & " → "-and-"
   .replace(/['’]/g, '')                              // straight and curly, no hyphen
   .replace(/[^a-z0-9]+/g, '-')
   .replace(/(^-|-$)/g, '')
```

| Title | ID |
|---|---|
| `Invoices` | `invoices` |
| `Composants & UI` | `composants-and-ui` |
| `Paramètres du compte` | `parametres-du-compte` |
| `What's New` | `whats-new` |
| `What’s New` | `whats-new` |

The two order-sensitive steps: `&` becomes `-and-` *before* the catch-all
replace (otherwise it would become a bare `-`), and apostrophes are removed
*without* inserting a hyphen.

Both apostrophe forms are stripped: ASCII `'` (`U+0027`) and curly `’`
(`U+2019`), the one macOS and most editors insert automatically. Any other
quote-like character falls through to the catch-all and becomes a hyphen.

## The same ID in three places

```
product-roadmap.md   ### 1. Composants & UI
product/sections/composants-and-ui/
src/sections/composants-and-ui/
```

## Mismatches fail silently

Nothing throws. `getAllSectionIds()` unions the IDs found across both trees, so
a divergent slug produces a **phantom section** that isn't in the roadmap, while
the real one stays empty.

Symptoms: a section page reading `Section not found: …`, or a `spec.md` that
never appears in the UI. Check the folder name against the slugified title first.

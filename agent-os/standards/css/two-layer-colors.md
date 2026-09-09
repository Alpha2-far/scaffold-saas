# Two-Layer Color System

Which layer you're in is decided by the folder, not by the kind of color.

## `src/components/ui/` — semantic tokens only

These are shadcn primitives and must stay replaceable by `npx shadcn add`.
Editing them means losing updates.

```tsx
"bg-card text-card-foreground border-input"   // ✅
"bg-stone-100 dark:bg-stone-800"              // ❌ never a literal here
```

Tokens already flip with `.dark`, so they need no `dark:` variant. The `dark:`
you do see here only adjusts token opacity (`dark:bg-input/30`) — never
introduces a hue.

Tokens are defined once as oklch in `src/index.css`, under `:root` and `.dark`,
each annotated with the Tailwind color it mirrors:

```css
--card: oklch(0.268 0.007 34.298); /* stone-800 */
```

## Everywhere else in `src/components/` — stone/lime literals

Design OS chrome is fixed on stone/lime and is not meant to be themeable.
Literals keep the hue readable in place.

Every literal carries its `dark:` counterpart on the same class:

```tsx
"text-stone-900 dark:text-stone-100"
"border-stone-200 dark:border-stone-800"
"bg-stone-100 dark:bg-stone-800"
```

A literal without a `dark:` pair is a bug — it disappears in one of the themes.

# Icons

`lucide-react` only. No other icon library, no inline SVG except one-offs
already in the codebase.

## Size and stroke

```tsx
<Layout className="w-4 h-4" strokeWidth={1.5} />   // default
<Icon  className="w-5 h-5" strokeWidth={1.5} />    // CTA buttons
<Check className="w-3 h-3" strokeWidth={2.5} />    // inside badges/pills
```

| Size | strokeWidth | Where |
|---|---|---|
| `w-4 h-4` | `1.5` | Default — buttons, list rows, headers |
| `w-5 h-5` | `1.5` | Full-width CTAs, empty-state circles |
| `w-3 h-3` | `2` – `2.5` | Step badges, completion pills |

`1.5` is the Refined Utility weight — thin and editorial. Below `w-4` a 1.5
stroke disappears, so small icons thicken to stay legible. Stroke weight
compensates for size; it never signals importance.

Always set `strokeWidth` explicitly — lucide's default is `2` and reads heavy.
Add `shrink-0` to any icon inside a flex row that can overflow.

## Icons in config maps

Store the component, never its name. No name→component registry.

```tsx
const config: Record<Phase, { icon: typeof FileText; label: string }> = {
  product: { icon: FileText, label: 'Product' },
}

const Icon = config[phase].icon        // capitalized to be usable as JSX
return <Icon className="w-4 h-4" strokeWidth={1.5} />
```

`typeof FileText` is the type for any lucide icon — import one real icon to
express it rather than reaching for `LucideIcon`.

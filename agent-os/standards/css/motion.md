# Motion

Motion is subtle and uniform: **200ms ease-out, no bounce**. One place to define
it, so durations and curves can't drift component by component.

## Where animations live

Declare every animation in `@layer utilities` in `src/index.css`:

```css
@layer utilities {
  .animate-fade-in { animation: fade-in 200ms ease-out; }
  @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
}
```

Never use arbitrary animation classes (`animate-[wiggle_1s]`) or inline
`style={{ animation }}`.

## Which library

- **Radix state transitions** → `tw-animate-css` (already imported), inside
  `ui/` primitives: `data-[state=open]`, dialog and dropdown enter/exit.
- **Everything else** → hand-written in `index.css`. That covers the page
  fade-in and the collapsibles driven by `--radix-collapsible-content-height`.

## In components

```tsx
<div className="min-h-screen bg-background animate-fade-in">   {/* page root */}
<button className="transition-colors">                          {/* hover */}
<div className="transition-all duration-200">                   {/* multi-prop */}
```

- Page roots get `animate-fade-in`. Nothing else does.
- Hover and focus use `transition-colors` — the default 150ms is fine, don't
  set a duration.
- Only set `duration-200` when animating several properties at once.
- Transform-on-hover is limited to a small nudge: `group-hover:translate-x-1`,
  `group-hover:scale-110`.

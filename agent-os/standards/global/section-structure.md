# Section Structure

A section lives in two trees under the same `[section-id]`.

```
product/sections/[section-id]/     # portable definition — no React
├── spec.md
├── data.json
├── types.ts
└── *.png

src/sections/[section-id]/
├── [ViewName].tsx                 # preview wrapper — Design OS renders this
└── components/
    ├── [ViewName].tsx             # exportable component
    ├── [SubComponent].tsx
    └── index.ts
```

`product/` is the product definition: readable, versionable, and copyable to
another clone without carrying any of Design OS with it. `src/` is code that
only ever runs inside the tool. Keeping them apart is what makes a plan portable.

## Depth decides what a file is

The loader globs one level only:

```ts
import.meta.glob('/src/sections/*/*.tsx')   // matches the root, not components/
```

So `components/` is invisible to Design OS by construction — nothing to declare,
nothing to register:

- `src/sections/invoices/InvoiceList.tsx` → a screen design, listed and routable
- `src/sections/invoices/components/InvoiceList.tsx` → a part, never listed

Moving a file between the two changes its nature. A screen design that stopped
appearing in the UI was almost certainly moved into `components/`.

## Configuration

Section screen designs render inside the app shell by default. Opt out in
`spec.md`:

```markdown
## Configuration
- shell: false
```

Matched case-insensitively anywhere in the file. Use it for public pages,
landing pages, and embeds.

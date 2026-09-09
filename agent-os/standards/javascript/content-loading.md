# Content Loading

All `product/` content is discovered at build time with `import.meta.glob`.
Design OS has no backend — the files an agent writes are the only data source,
and Vite's HMR reloads the UI the moment one changes.

Never `fetch()` product files or read them at runtime.

## Paths are root-absolute

```ts
import.meta.glob('/product/sections/*/spec.md', { ... })      // ✅
import.meta.glob('../../product/sections/*/spec.md', { ... }) // ❌
```

## Eager for everything except `.tsx`

```ts
// Markdown — eager + raw
const specFiles = import.meta.glob('/product/sections/*/spec.md', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>

// JSON — eager, default-wrapped
const dataFiles = import.meta.glob('/product/sections/*/data.json', {
  eager: true,
}) as Record<string, { default: Record<string, unknown> }>

// Assets — eager + ?url (URLs, not content)
const screenshotFiles = import.meta.glob('/product/sections/*/*.png', {
  query: '?url', import: 'default', eager: true,
}) as Record<string, string>

// Components — lazy, so designs stay out of the initial bundle
const screenDesignModules = import.meta.glob('/src/sections/*/*.tsx') as Record<
  string, () => Promise<{ default: ComponentType }>
>
```

- Data must be eager: `has*()` checks and phase progress are synchronous, with no async state.
- Always cast the glob result — `import.meta.glob` returns `unknown` values.
- One glob per file type, declared at module top level, never inside a function.

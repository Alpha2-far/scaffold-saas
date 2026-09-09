# Loader Contract

Missing content is the normal state, not an error — Design OS is a progressive
flow where most files don't exist yet. Loaders answer with `null` so the UI can
render an `EmptyState` naming the command to run.

## `parse*()` returns `T | null` — never throws, never partial

```ts
export function parseDataShape(md: string): DataShape | null {
  if (!md || !md.trim()) return null      // 1. guard empty input

  try {
    // ...extract
    if (entities.length === 0 && relationships.length === 0) {
      return null                          // 2. nothing meaningful → null
    }
    return { entities, relationships }
  } catch {
    return null                            // 3. malformed input → null, silently
  }
}
```

All three exits are required. A half-parsed object is worse than `null`: the UI
would render a card with empty slots instead of the empty state.

## `has*()` vs `null` — two different questions

- `has*()` — **does the file exist?** Key lookup in the glob map.
- `parse*() === null` — **does it have usable content?**

```ts
export function hasDataShape(): boolean {
  return '/product/data-shape/data-shape.md' in dataShapeFiles
}
```

A file that exists but is empty gives `hasDataShape() === true` and
`loadDataShape() === null`. That gap is the point: it separates *not started*
from *written but unparseable*.

- `has*()` never parses, never reads content — just `in`.
- Use `has*()` when there is nothing to parse (export zip, `.tsx` components).
- Aggregate loaders return `null` when every child is `null`:

```ts
if (!colors && !typography) return null
```

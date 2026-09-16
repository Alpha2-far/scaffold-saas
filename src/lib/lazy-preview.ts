import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

/**
 * A module-level registry of lazily-loaded preview components.
 *
 * `React.lazy()` must be called outside render. Calling it inside a component — even
 * behind `useMemo` — creates a brand-new component type whenever the memo is discarded,
 * and React discards memos freely: it is a performance hint, not a guarantee. A new
 * component type is a different type, so React unmounts the old subtree and remounts the
 * new one. In a screen-design preview that means the design re-suspends and every piece
 * of local state inside it is thrown away, for no reason the user can see.
 *
 * Keying the registry by the loader's identity gives each distinct preview exactly one
 * component type for the lifetime of the page, which is the property `React.lazy` is
 * documented to require.
 */
const registry = new Map<string, unknown>()

/**
 * Return the single lazy component for `key`, creating it on first use.
 *
 * `key` must identify the module being loaded (section + screen design name, or the
 * shell's identity) — two different keys must never resolve to the same module, and the
 * same module must always be asked for under the same key.
 */
export function cachedLazy<P extends object>(
  key: string,
  load: () => Promise<{ default: ComponentType<P> }>
): LazyExoticComponent<ComponentType<P>> {
  const existing = registry.get(key)
  if (existing) {
    return existing as LazyExoticComponent<ComponentType<P>>
  }

  const created = lazy(load)
  registry.set(key, created)
  return created
}

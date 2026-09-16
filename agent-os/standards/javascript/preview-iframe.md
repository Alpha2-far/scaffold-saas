# Preview Pages

Preview pages ship as a twin: `XPage` (chrome + controls) and `XFullscreen`
(the design alone), both exported from one file, each with its own flat route.

```
/sections/:sectionId/screen-designs/:name             → ScreenDesignPage
/sections/:sectionId/screen-designs/:name/fullscreen  → ScreenDesignFullscreen
```

## The Page embeds the Fullscreen route in an iframe

```tsx
<iframe
  src={`/sections/${sectionId}/screen-designs/${screenDesignName}/fullscreen`}
  className="w-full h-full border-0"
/>
```

Never render the design component directly in the Page. The design and the
Design OS chrome share one Tailwind stylesheet, so without the iframe the chrome
leaks in — and responsive prefixes (`sm:`, `md:`) would resolve against the
window width instead of the preview width, making the resize handles test
nothing.

The fullscreen route doubles as a standalone URL for `/screenshot-design`.

## Theme crosses the boundary via localStorage + poll

The iframe is same-origin but gets no notification, and the `storage` event
never fires in the document that wrote the value. Both mechanisms are required:

```tsx
window.addEventListener('storage', handleStorageChange)  // other documents
const interval = setInterval(applyTheme, 100)            // same-document writes
```

Keep both. Removing the poll silently breaks the theme toggle inside previews.

## Lazy components must be validated — and created outside render

Screen designs are user-authored, so the loader guards the shape and renders an
inline message instead of crashing the preview. Wrap the guarded loader in
`cachedLazy` (`@/lib/lazy-preview`), never in a bare `React.lazy` call:

```tsx
const ScreenDesignComponent = useMemo(() => {
  const loader = loadScreenDesignComponent(sectionId, name)
  if (!loader) return null
  return cachedLazy(`screen:${sectionId}/${name}`, async () => {
    try {
      const module = await loader()
      if (module && typeof module.default === 'function') return module
      return { default: () => <div>Invalid screen design: {name}</div> }
    } catch (e) {
      return { default: () => <div>Failed to load: {name}</div> }
    }
  })
}, [sectionId, name])
```

`React.lazy` must be called outside render. Inside a component — **even behind
`useMemo`** — it creates a new component type whenever the memo is discarded, and
React discards memos freely: a memo is a performance hint, not a guarantee. A new
type is a different type, so React unmounts the preview and remounts it: the design
re-suspends and every piece of state inside it is thrown away, for no reason the
user can see. `cachedLazy` keys a module-level registry so each preview has exactly
one component type for the lifetime of the page.

## Dynamically-chosen components are rendered with `createElement`

The preview and the shell are picked at runtime, so they cannot be statically-bound
JSX tags:

```tsx
{createElement(AppShellComponent, null, createElement(ScreenDesignComponent))}
```

A locally-bound capitalized identifier used as a JSX tag is what
`react-hooks/static-components` flags — rightly, since it cannot tell a stable
registry lookup from a fresh component built during render. `createElement` states
the dynamic dispatch explicitly; `cachedLazy` is what actually makes it safe.

Always wrap the result in `<Suspense>` with a fallback.

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

## Lazy components must be validated

Screen designs are user-authored, so the loader guards the shape and renders an
inline message instead of crashing the preview:

```tsx
return React.lazy(async () => {
  try {
    const module = await loader()
    if (module && typeof module.default === 'function') return module
    return { default: () => <div>Invalid screen design: {name}</div> }
  } catch (e) {
    return { default: () => <div>Failed to load: {name}</div> }
  }
})
```

Always wrap the result in `<Suspense>` with a fallback.

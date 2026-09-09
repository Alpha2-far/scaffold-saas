# Derived Progress

Progress is always recomputed from loaded data. Never persist it.

Agents write to `product/` outside the UI, so any stored progress diverges
immediately — a deleted file would leave its phase marked complete. Deriving
means the UI cannot lie about what exists.

```tsx
const hasOverview = !!productData.overview      // ✅ derived
const hasSections = sectionIds.filter(id => getSectionScreenDesigns(id).length > 0).length > 0

const [done, setDone] = useState(false)          // ❌ never for progress
localStorage.setItem('phase-1-complete', 'true') // ❌
```

Completion rules live in one place per consumer:

```tsx
const phaseComplete: Record<Phase, boolean> = {
  'product':    hasOverview && hasRoadmap,
  'data-shape': hasDataShape,
  'design':     hasDesignSystem || hasShell,
  'sections':   hasSections,
  'export':     exportZipExists,
}
```

Current phase is derived from `useLocation().pathname`, not from state.

## localStorage — view preferences only

Allowed: theme, dismissed banner. Anything a viewer chose about *how they look
at* the product, never anything about the product itself.

- Prefix keys with `design-os-`.
- Product-scoped keys include the slugified product name:
  `design-os-phase-warning-dismissed-${slug}`.
- Read in `useEffect`, not during render — `PhaseWarningBanner` initializes
  `isDismissed` to `true` so the banner can't flash before the read lands.

# Page Composition

Routes in `src/lib/router.tsx` are a flat table — no layout routes. Each page
composes its own chrome, because pages don't share one: `*Fullscreen` pages
render no chrome at all, and sub-pages pass `title`/`backTo` to `AppLayout`.
A layout route would impose a wrapper every preview page then has to escape.

## The recipe

```tsx
// 1. Loaders in useMemo, empty deps — glob data is build-time constant
const productData = useMemo(() => loadProductData(), [])

// 2. Presence booleans
const hasOverview = !!productData.overview

// 3. Then render
return (
  <AppLayout>                                {/* or backTo/title for sub-pages */}
    <div className="space-y-6">
      <div className="mb-8">                 {/* intro: h1 + p, always */}
        <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-2">…</h1>
        <p className="text-stone-600 dark:text-stone-400">…</p>
      </div>

      <StepIndicator step={1} status={stepStatuses[0]}>
        {productData.overview ? <ProductOverviewCard … /> : <EmptyState type="overview" />}
      </StepIndicator>

      {allStepsComplete && (                 {/* next-phase CTA is the last step */}
        <StepIndicator step={3} status="current" isLast>
          <NextPhaseButton nextPhase="data-shape" />
        </StepIndicator>
      )}
    </div>
  </AppLayout>
)
```

- Steps are numbered from 1 and contiguous. `isLast` goes on the final rendered
  step — it suppresses the connector line.
- Every step renders either a `Card` or an `EmptyState`. Never a bare `<div>`.

## `get*StepStatuses()` stays local and pure

Each phase has different completion rules — screenshots are optional on
`SectionPage`, `DesignPage` chains tokens→shell. Don't factor them into a shared
helper; keep one per page, above the component:

```tsx
function getProductPageStepStatuses(hasOverview: boolean, hasRoadmap: boolean): StepStatus[]
```

- Takes booleans only. No hooks, no loader calls, no `productData` object.
- Returns one `StepStatus` per step, in render order.

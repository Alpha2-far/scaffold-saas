import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, X } from 'lucide-react'
import { loadProductData } from '@/lib/product-loader'

/**
 * Get a storage key based on the product name to track dismissed warnings per product
 * Converts " & " to "-and-" to maintain semantic meaning
 */
function getStorageKey(productName: string): string {
  const sanitized = productName
    .toLowerCase()
    .replace(/\s+&\s+/g, '-and-') // Convert " & " to "-and-" first
    .replace(/[^a-z0-9]+/g, '-')
  return `design-os-phase-warning-dismissed-${sanitized}`
}

/**
 * Read the dismissal flag. Fails closed (dismissed) rather than throwing: there is no
 * `localStorage` under the headless render harness, and accessing it throws outright in
 * a private window or with site data blocked. A missing preference must never be the
 * reason a page fails to render.
 */
function readDismissed(storageKey: string): boolean {
  if (typeof window === 'undefined') return true
  try {
    return window.localStorage.getItem(storageKey) === 'true'
  } catch {
    return true
  }
}

export function PhaseWarningBanner() {
  const productData = useMemo(() => loadProductData(), [])

  const hasDataShape = !!productData.dataShape
  const hasDesignSystem = !!(productData.designSystem?.colors || productData.designSystem?.typography)
  const hasShell = !!productData.shell?.spec
  const hasDesign = hasDesignSystem || hasShell

  const productName = productData.overview?.name || 'default-product'
  const storageKey = getStorageKey(productName)

  /*
    The preference is read in the state initialiser, not in an effect. Reading it in an
    effect meant the first paint always showed the dismissed state and a second render
    corrected it — a cascading render that React 19 flags, and the reason the initial
    value had to be hardcoded to `true` "to avoid flash". Read once, synchronously, and
    the very first paint is already right.

    `dismissedFor` carries the key the value was read under, so that a product rename
    (a different storage key) re-reads during render instead of in another effect. This
    is React's documented "adjusting state when a prop changes" pattern: React discards
    the render and retries immediately, without ever committing the stale value.
  */
  const [dismissedFor, setDismissedFor] = useState(() => ({
    key: storageKey,
    value: readDismissed(storageKey),
  }))

  let isDismissed = dismissedFor.value
  if (dismissedFor.key !== storageKey) {
    isDismissed = readDismissed(storageKey)
    setDismissedFor({ key: storageKey, value: isDismissed })
  }

  const setIsDismissed = (value: boolean) => setDismissedFor({ key: storageKey, value })

  const handleDismiss = () => {
    try {
      window.localStorage.setItem(storageKey, 'true')
    } catch {
      // Storage blocked: the dismissal still applies for this session.
    }
    setIsDismissed(true)
  }

  // Don't show if both phases are complete or if dismissed
  if ((hasDataShape && hasDesign) || isDismissed) {
    return null
  }

  // Build the warning message
  const missingPhases: { name: string; path: string }[] = []
  if (!hasDataShape) {
    missingPhases.push({ name: 'Data Shape', path: '/data-shape' })
  }
  if (!hasDesign) {
    missingPhases.push({ name: 'Design', path: '/design' })
  }

  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-3 mb-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" strokeWidth={2} />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            Consider completing{' '}
            {missingPhases.map((phase, index) => (
              <span key={phase.path}>
                {index > 0 && ' and '}
                <Link
                  to={phase.path}
                  className="font-medium underline hover:no-underline"
                >
                  {phase.name}
                </Link>
              </span>
            ))}{' '}
            before designing sections.
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 transition-colors shrink-0"
        >
          <X className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}

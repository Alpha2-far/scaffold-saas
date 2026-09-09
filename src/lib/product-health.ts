/**
 * Live conformance health for the product definition.
 *
 * This is the browser-side counterpart of the `/product-audit` command: the same
 * contracts, evaluated at build time against the same markdown, so the console on
 * the Product page reports the real state of the scope lock rather than a
 * decorative badge. Checks that the browser cannot see — the `product-plan/`
 * export copy, section-level scope breaches — belong to the command and are
 * deliberately absent here.
 *
 * Contract source: src/lib/product-loader.ts, src/lib/data-shape-loader.ts.
 */

import { loadProductData } from './product-loader'

const productFiles = import.meta.glob('/product/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export type CheckState = 'pass' | 'warn' | 'fail' | 'skip'
export type HealthState = 'pass' | 'warn' | 'fail' | 'idle'

export interface HealthCheck {
  id: string
  label: string
  state: CheckState
  detail: string
}

export interface ProductHealth {
  /** Aggregate: `fail` if any check failed, `warn` if any warned, `idle` if nothing is defined. */
  state: HealthState
  checks: HealthCheck[]
  passed: number
  /** Checks actually evaluated — skipped ones are excluded. */
  evaluated: number
  /** True when a PRD and its out-of-scope mirror are both in place. */
  scopeLocked: boolean
}

function section(md: string, heading: string): string | null {
  const match = md.match(
    new RegExp(`## ${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\n+([\\s\\S]*?)(?=\\n## |\\n#[^#]|$)`)
  )
  return match?.[1] ?? null
}

/**
 * Evaluate the product definition against the Design OS parser contracts and
 * the scope lock. Pure and synchronous — the markdown is inlined at build time.
 */
export function computeProductHealth(): ProductHealth {
  const data = loadProductData()
  const overviewRaw = productFiles['/product/product-overview.md']?.replace(/\r\n/g, '\n')
  const roadmapRaw = productFiles['/product/product-roadmap.md']?.replace(/\r\n/g, '\n')
  const prdRaw = productFiles['/product/prd.md']?.replace(/\r\n/g, '\n')

  const checks: HealthCheck[] = []

  // 1. Product overview parses into something the card can render.
  if (!overviewRaw) {
    checks.push({ id: 'overview', label: 'Overview contract', state: 'skip', detail: 'No product-overview.md yet' })
  } else if (!data.overview) {
    checks.push({ id: 'overview', label: 'Overview contract', state: 'fail', detail: 'product-overview.md parses to nothing' })
  } else {
    const problems = data.overview.problems.length
    const features = data.overview.features.length
    const starBullets = (section(overviewRaw, 'Key Features') ?? '')
      .split('\n')
      .filter((line) => line.trim().startsWith('* ')).length

    if (starBullets > 0) {
      checks.push({
        id: 'overview',
        label: 'Overview contract',
        state: 'fail',
        detail: `${starBullets} \`*\` bullet(s) under Key Features parse as nothing`,
      })
    } else if (!data.overview.description || (problems === 0 && features === 0)) {
      checks.push({ id: 'overview', label: 'Overview contract', state: 'warn', detail: 'Overview is missing a description, problems or features' })
    } else {
      checks.push({ id: 'overview', label: 'Overview contract', state: 'pass', detail: `${problems} problems · ${features} features` })
    }
  }

  // 2. Roadmap parses, and no numbered heading outside `## Sections` becomes a phantom section.
  if (!roadmapRaw) {
    checks.push({ id: 'roadmap', label: 'Roadmap contract', state: 'skip', detail: 'No product-roadmap.md yet' })
  } else {
    const globalCount = [...roadmapRaw.matchAll(/### (\d+)\.\s*(.+)/g)].length
    const inBlock = [...(section(roadmapRaw, 'Sections') ?? '').matchAll(/### (\d+)\.\s*(.+)/g)].length
    const parsed = data.roadmap?.sections.length ?? 0

    if (parsed === 0) {
      checks.push({ id: 'roadmap', label: 'Roadmap contract', state: 'fail', detail: 'No `### N.` section headings found' })
    } else if (globalCount !== inBlock) {
      checks.push({
        id: 'roadmap',
        label: 'Roadmap contract',
        state: 'fail',
        detail: `${globalCount - inBlock} phantom section(s): numbered heading outside \`## Sections\``,
      })
    } else {
      checks.push({ id: 'roadmap', label: 'Roadmap contract', state: 'pass', detail: `${parsed} sections, no phantoms` })
    }
  }

  // 3. Data shape parses into entities.
  const entities = data.dataShape?.entities.length ?? 0
  if (!data.dataShape) {
    checks.push({ id: 'data-shape', label: 'Data shape contract', state: 'skip', detail: 'No data-shape.md yet' })
  } else if (entities === 0) {
    checks.push({ id: 'data-shape', label: 'Data shape contract', state: 'fail', detail: 'No entities parsed under `## Entities`' })
  } else {
    checks.push({
      id: 'data-shape',
      label: 'Data shape contract',
      state: 'pass',
      detail: `${entities} entities · ${data.dataShape.relationships.length} relationships`,
    })
  }

  // 4. Scope lock: a PRD without its mirror is a boundary the design commands cannot see.
  const hasPrd = !!prdRaw
  const hasMirror = !!overviewRaw && section(overviewRaw, 'Out of Scope (V1)') !== null
  if (!hasPrd && !hasMirror) {
    checks.push({ id: 'scope-lock', label: 'Scope lock', state: 'skip', detail: 'No PRD — run /product-vision to lock V1' })
  } else if (hasPrd && !hasMirror) {
    checks.push({ id: 'scope-lock', label: 'Scope lock', state: 'fail', detail: 'PRD found, but no `## Out of Scope (V1)` mirror in the overview' })
  } else if (!hasPrd && hasMirror) {
    checks.push({ id: 'scope-lock', label: 'Scope lock', state: 'warn', detail: 'Out-of-scope mirror with no PRD behind it' })
  } else {
    const cuts = (section(overviewRaw!, 'Out of Scope (V1)') ?? '')
      .split('\n')
      .filter((line) => line.trim().startsWith('- ')).length
    checks.push({ id: 'scope-lock', label: 'Scope lock', state: 'pass', detail: `${cuts} cuts locked, mirrored in the overview` })
  }

  const evaluated = checks.filter((c) => c.state !== 'skip').length
  const passed = checks.filter((c) => c.state === 'pass').length
  const failed = checks.some((c) => c.state === 'fail')
  const warned = checks.some((c) => c.state === 'warn')

  const state: HealthState = evaluated === 0 ? 'idle' : failed ? 'fail' : warned ? 'warn' : 'pass'

  return { state, checks, passed, evaluated, scopeLocked: hasPrd && hasMirror }
}

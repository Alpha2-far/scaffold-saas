import { lazy, Suspense, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AppLayout } from '@/components/AppLayout'
import { EmptyState } from '@/components/EmptyState'
import { StepIndicator, type StepStatus } from '@/components/StepIndicator'
import { NextPhaseButton } from '@/components/NextPhaseButton'
import { ScaffoldLogoLoader } from '@/components/ScaffoldLogoLoader'
import { loadProductData } from '@/lib/product-loader'
import { ChevronRight, Layout } from 'lucide-react'

/**
 * The theme studio carries the whole preset registry and its preview
 * stylesheet. Split out so the 42 other routes don't pay for it — importing
 * it eagerly pushed the main bundle over the 500 kB budget.
 */
const ThemeStudio = lazy(() =>
  import('@/components/ThemeStudio').then((m) => ({ default: m.ThemeStudio })),
)

// Map Tailwind color names to actual color values for preview
const colorMap: Record<string, { light: string; base: string; dark: string }> = {
  red: { light: '#fca5a5', base: '#ef4444', dark: '#dc2626' },
  orange: { light: '#fdba74', base: '#f97316', dark: '#ea580c' },
  amber: { light: '#fcd34d', base: '#f59e0b', dark: '#d97706' },
  yellow: { light: '#fde047', base: '#eab308', dark: '#ca8a04' },
  lime: { light: '#bef264', base: '#84cc16', dark: '#65a30d' },
  green: { light: '#86efac', base: '#22c55e', dark: '#16a34a' },
  emerald: { light: '#6ee7b7', base: '#10b981', dark: '#059669' },
  teal: { light: '#5eead4', base: '#14b8a6', dark: '#0d9488' },
  cyan: { light: '#67e8f9', base: '#06b6d4', dark: '#0891b2' },
  sky: { light: '#7dd3fc', base: '#0ea5e9', dark: '#0284c7' },
  blue: { light: '#93c5fd', base: '#3b82f6', dark: '#2563eb' },
  indigo: { light: '#a5b4fc', base: '#6366f1', dark: '#4f46e5' },
  violet: { light: '#c4b5fd', base: '#8b5cf6', dark: '#7c3aed' },
  purple: { light: '#d8b4fe', base: '#a855f7', dark: '#9333ea' },
  fuchsia: { light: '#f0abfc', base: '#d946ef', dark: '#c026d3' },
  pink: { light: '#f9a8d4', base: '#ec4899', dark: '#db2777' },
  rose: { light: '#fda4af', base: '#f43f5e', dark: '#e11d48' },
  slate: { light: '#cbd5e1', base: '#64748b', dark: '#475569' },
  gray: { light: '#d1d5db', base: '#6b7280', dark: '#4b5563' },
  zinc: { light: '#d4d4d8', base: '#71717a', dark: '#52525b' },
  neutral: { light: '#d4d4d4', base: '#737373', dark: '#525252' },
  stone: { light: '#d6d3d1', base: '#78716c', dark: '#57534e' },
}

/**
 * Determine the status of each step on the Design page
 * Steps: 1. Design Tokens, 2. Shell Design
 */
function getDesignPageStepStatuses(
  hasDesignSystem: boolean,
  hasShell: boolean
): StepStatus[] {
  const statuses: StepStatus[] = []

  // Step 1: Design Tokens
  if (hasDesignSystem) {
    statuses.push('completed')
  } else {
    statuses.push('current')
  }

  // Step 2: Shell
  if (hasShell) {
    statuses.push('completed')
  } else if (hasDesignSystem) {
    statuses.push('current')
  } else {
    statuses.push('upcoming')
  }

  return statuses
}

export function DesignPage() {
  const productData = useMemo(() => loadProductData(), [])
  const designSystem = productData.designSystem
  const shell = productData.shell

  const hasDesignSystem = !!(designSystem?.colors || designSystem?.typography)
  const hasShell = !!shell?.spec
  const allStepsComplete = hasDesignSystem && hasShell

  const stepStatuses = getDesignPageStepStatuses(hasDesignSystem, hasShell)

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page intro */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
            Design System
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Define the visual foundation and application shell for your product.
          </p>
        </div>

        {/* The theme engine. It sits above the step flow because choosing the
            visual language is what the rest of this page then records — and
            because what is previewed here is, byte for byte, what lands in
            product-plan/. */}
        <Card className="liquid-glass-card rounded-2xl">
          <CardContent className="pt-6">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-20">
                  <ScaffoldLogoLoader label="Chargement du moteur de thèmes…" />
                </div>
              }
            >
              <ThemeStudio />
            </Suspense>
          </CardContent>
        </Card>

        {/* Step 1: Design Tokens */}
        <StepIndicator step={1} status={stepStatuses[0]}>
          {!designSystem?.colors && !designSystem?.typography ? (
            <EmptyState type="design-system" />
          ) : (
            <Card className="liquid-glass-card rounded-2xl">
              <CardHeader className="pb-4 border-b border-stone-200/50 dark:border-stone-800/60">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                    Design Tokens
                  </CardTitle>
                  <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 tabular-nums">
                    Scaffold Studio V1
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Colors */}
                {designSystem?.colors && (
                  <div>
                    <h4 className="text-xs font-semibold text-stone-400 dark:text-stone-400 uppercase tracking-wider mb-3">
                      Palette & Harmonie Chromatique
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <ColorSwatch
                        label="Primary"
                        colorName={designSystem.colors.primary}
                      />
                      <ColorSwatch
                        label="Secondary"
                        colorName={designSystem.colors.secondary}
                      />
                      <ColorSwatch
                        label="Neutral"
                        colorName={designSystem.colors.neutral}
                      />
                    </div>
                  </div>
                )}

                {/* Typography */}
                {designSystem?.typography && (
                  <div>
                    <h4 className="text-xs font-semibold text-stone-400 dark:text-stone-400 uppercase tracking-wider mb-3">
                      Spécifications Typographiques
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="rounded-xl border border-stone-200/60 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/40 p-4 transition-colors hover:border-emerald-500/30">
                        <span className="text-[11px] font-mono text-stone-400 dark:text-stone-400 uppercase tracking-wider block mb-1">
                          Heading
                        </span>
                        <p className="font-semibold text-base text-stone-900 dark:text-stone-100 mb-1 truncate">
                          {designSystem.typography.heading}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 italic">
                          Aa Bb Gg 123
                        </p>
                      </div>

                      <div className="rounded-xl border border-stone-200/60 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/40 p-4 transition-colors hover:border-emerald-500/30">
                        <span className="text-[11px] font-mono text-stone-400 dark:text-stone-400 uppercase tracking-wider block mb-1">
                          Body
                        </span>
                        <p className="font-medium text-base text-stone-900 dark:text-stone-100 mb-1 truncate">
                          {designSystem.typography.body}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 italic">
                          Aa Bb Gg 123
                        </p>
                      </div>

                      <div className="rounded-xl border border-stone-200/60 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/40 p-4 transition-colors hover:border-emerald-500/30">
                        <span className="text-[11px] font-mono text-stone-400 dark:text-stone-400 uppercase tracking-wider block mb-1">
                          Mono / Code
                        </span>
                        <p className="font-mono text-sm text-stone-900 dark:text-stone-100 mb-1 truncate">
                          {designSystem.typography.mono}
                        </p>
                        <p className="font-mono text-xs text-stone-500 dark:text-stone-400 tabular-nums">
                          0123456789
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Edit hint */}
                <div className="rounded-xl bg-stone-100/70 dark:bg-stone-900/60 border border-stone-200/50 dark:border-stone-800/80 px-4 py-2.5 flex items-center justify-between">
                  <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                    Lancer <code className="font-mono text-stone-700 dark:text-stone-300 font-semibold">/design-tokens</code> pour réajuster la charte
                  </p>
                  <span className="text-[10px] font-mono text-stone-400 uppercase">Interactive</span>
                </div>
              </CardContent>
            </Card>
          )}
        </StepIndicator>

        {/* Step 2: Application Shell */}
        <StepIndicator step={2} status={stepStatuses[1]} isLast={!allStepsComplete}>
          {!shell?.spec ? (
            <EmptyState type="shell" />
          ) : (
            <Card className="liquid-glass-card rounded-2xl">
              <CardHeader className="pb-4 border-b border-stone-200/50 dark:border-stone-800/60">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                    Application Shell & Architecture
                  </CardTitle>
                  <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-lime-500/10 text-lime-600 dark:text-lime-400 border border-lime-500/20 tabular-nums">
                    {shell.spec.navigationItems.length} Nav Items
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 pt-6">
                {/* Overview */}
                {shell.spec.overview && (
                  <div className="rounded-xl border border-stone-200/60 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/40 p-4">
                    <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                      {shell.spec.overview}
                    </p>
                  </div>
                )}

                {/* Navigation items */}
                {shell.spec.navigationItems.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-stone-400 dark:text-stone-400 uppercase tracking-wider mb-2.5">
                      Navigation Prévue
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {shell.spec.navigationItems.map((item, index) => {
                        const parts = item.split(/\*\*([^*]+)\*\*/)
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-stone-100/60 dark:bg-stone-900/50 border border-stone-200/40 dark:border-stone-800/60 text-stone-700 dark:text-stone-300 text-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-lime-500 shrink-0" />
                            <span className="truncate">
                              {parts.map((part, i) =>
                                i % 2 === 1 ? (
                                  <strong key={i} className="font-semibold text-stone-900 dark:text-stone-100">{part}</strong>
                                ) : (
                                  <span key={i}>{part}</span>
                                )
                              )}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* View Shell Design Link */}
                {shell.hasComponents && (
                  <div className="pt-2">
                    <Link
                      to="/shell/design"
                      className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                          <Layout className="w-4 h-4" strokeWidth={1.5} />
                        </div>
                        <div>
                          <span className="font-medium text-sm text-stone-900 dark:text-stone-100 block">
                            Inspecter le Shell Maquetté
                          </span>
                          <span className="text-xs text-stone-500 dark:text-stone-400">
                            Visualiser le layout, le header et la barre latérale
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-emerald-500 transform group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2} />
                    </Link>
                  </div>
                )}

                {/* Edit hint */}
                <div className="rounded-xl bg-stone-100/70 dark:bg-stone-900/60 border border-stone-200/50 dark:border-stone-800/80 px-4 py-2.5 flex items-center justify-between">
                  <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-lime-500" />
                    Lancer <code className="font-mono text-stone-700 dark:text-stone-300 font-semibold">/design-shell</code> pour recalculer le shell
                  </p>
                  <span className="text-[10px] font-mono text-stone-400 uppercase">Shell Builder</span>
                </div>
              </CardContent>
            </Card>
          )}
        </StepIndicator>

        {/* Next Phase Button - shown when all steps complete */}
        {allStepsComplete && (
          <StepIndicator step={3} status="current" isLast>
            <NextPhaseButton nextPhase="sections" />
          </StepIndicator>
        )}
      </div>
    </AppLayout>
  )
}

interface ColorSwatchProps {
  label: string
  colorName: string
}

function ColorSwatch({ label, colorName }: ColorSwatchProps) {
  const colors = colorMap[colorName] || colorMap.stone

  return (
    <div className="rounded-xl border border-stone-200/60 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/40 p-3.5 space-y-3 transition-colors hover:border-emerald-500/30">
      {/* 3-shade horizontal strip */}
      <div className="flex h-12 rounded-lg overflow-hidden border border-black/5 dark:border-white/10 shadow-inner">
        <div
          className="flex-1 transition-opacity hover:opacity-90"
          style={{ backgroundColor: colors.light }}
          title={`${colorName}-300: ${colors.light}`}
        />
        <div
          className="flex-[2] transition-opacity hover:opacity-90"
          style={{ backgroundColor: colors.base }}
          title={`${colorName}-500: ${colors.base}`}
        />
        <div
          className="flex-1 transition-opacity hover:opacity-90"
          style={{ backgroundColor: colors.dark }}
          title={`${colorName}-600: ${colors.dark}`}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">{label}</p>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 capitalize">{colorName}</p>
        </div>
        <span className="text-[10px] font-mono font-medium text-stone-500 dark:text-stone-400 tabular-nums px-2 py-0.5 rounded-md bg-stone-200/60 dark:bg-stone-800/60">
          {colors.base}
        </span>
      </div>
    </div>
  )
}

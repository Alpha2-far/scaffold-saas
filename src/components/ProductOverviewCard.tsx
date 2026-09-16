import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react'
import type { ProductOverview } from '@/types/product'
import { Lift } from '@/components/motion-primitives'

interface ProductOverviewCardProps {
  overview: ProductOverview
}

export function ProductOverviewCard({ overview }: ProductOverviewCardProps) {
  const [problemsOpen, setProblemsOpen] = useState(true)
  const [featuresOpen, setFeaturesOpen] = useState(true)

  return (
    <Lift>
      <Card className="liquid-glass-card rounded-2xl overflow-hidden">
        <CardHeader className="pb-4 px-6 pt-6 border-b border-stone-200/70 dark:border-[#1E293B]/70">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-100">
              Product Overview : <span className="text-scaffold-emerald dark:text-scaffold-green">{overview.name}</span>
            </CardTitle>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-[#070e28] border border-emerald-200/80 dark:border-scaffold-green/30 text-emerald-700 dark:text-scaffold-green tabular-nums">
              Scope Locked
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Description */}
          {overview.description && (
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-base font-normal">
              {overview.description}
            </p>
          )}

          {/* Problems & Solutions - Expandable */}
          {overview.problems.length > 0 && (
            <div className="rounded-xl border border-stone-200/80 dark:border-[#1E293B] bg-stone-50/50 dark:bg-[#050a22]/60 p-4 transition-all duration-200">
              <Collapsible open={problemsOpen} onOpenChange={setProblemsOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left group">
                  <span className="text-xs font-semibold text-stone-600 dark:text-stone-300 uppercase tracking-wider flex items-center gap-2">
                    <span>Problems & Solutions</span>
                    <span className="text-stone-400 dark:text-stone-500 font-normal tabular-nums">
                      ({overview.problems.length})
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 dark:text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-transform duration-200 ${
                      problemsOpen ? 'rotate-180' : ''
                    }`}
                    strokeWidth={1.75}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="space-y-3 pt-3.5">
                    {overview.problems.map((problem, index) => (
                      <li 
                        key={index} 
                        className="rounded-lg border border-stone-200/70 dark:border-[#1E293B]/80 bg-white/80 dark:bg-[#080f2b]/80 p-3.5 flex items-start gap-3 shadow-xs"
                      >
                        <ArrowRight className="w-4 h-4 text-scaffold-green mt-0.5 shrink-0" strokeWidth={2} />
                        <div className="min-w-0">
                          <span className="font-medium text-stone-900 dark:text-stone-100 text-sm">
                            {problem.title}
                          </span>
                          <span className="text-stone-400 dark:text-stone-500 mx-2">—</span>
                          <span className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                            {problem.solution}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}

          {/* Key Features - Expandable */}
          {overview.features.length > 0 && (
            <div className="rounded-xl border border-stone-200/80 dark:border-[#1E293B] bg-stone-50/50 dark:bg-[#050a22]/60 p-4 transition-all duration-200">
              <Collapsible open={featuresOpen} onOpenChange={setFeaturesOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left group">
                  <span className="text-xs font-semibold text-stone-600 dark:text-stone-300 uppercase tracking-wider flex items-center gap-2">
                    <span>Key In-Scope Features</span>
                    <span className="text-stone-400 dark:text-stone-500 font-normal tabular-nums">
                      ({overview.features.length})
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 dark:text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-transform duration-200 ${
                      featuresOpen ? 'rotate-180' : ''
                    }`}
                    strokeWidth={1.75}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3.5">
                    {overview.features.map((feature, index) => (
                      <li 
                        key={index} 
                        className="rounded-lg border border-stone-200/70 dark:border-[#1E293B]/80 bg-white/80 dark:bg-[#080f2b]/80 px-3.5 py-2.5 flex items-center gap-2.5 shadow-xs"
                      >
                        <CheckCircle2 className="w-4 h-4 text-scaffold-green shrink-0" strokeWidth={2} />
                        <span className="text-stone-800 dark:text-stone-200 text-sm font-medium leading-snug truncate">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </CardContent>
      </Card>
    </Lift>
  )
}

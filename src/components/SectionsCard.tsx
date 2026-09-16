import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import type { ProductRoadmap } from '@/types/product'
import { Lift } from '@/components/motion-primitives'

interface SectionsCardProps {
  roadmap: ProductRoadmap
  onSectionClick: (sectionId: string) => void
}

export function SectionsCard({ roadmap, onSectionClick }: SectionsCardProps) {
  return (
    <Lift>
      <Card className="liquid-glass-card rounded-2xl overflow-hidden">
        <CardHeader className="pb-4 px-6 pt-6 border-b border-stone-200/70 dark:border-[#1E293B]/70">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-100">
              Sections Architecture
            </CardTitle>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-stone-100 dark:bg-[#0c163b] border border-stone-200 dark:border-[#1E293B] text-stone-600 dark:text-stone-300 tabular-nums">
              {roadmap.sections.length} {roadmap.sections.length > 1 ? 'sections' : 'section'}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y divide-stone-200/70 dark:divide-[#1E293B]/70">
            {roadmap.sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => onSectionClick(section.id)}
                  className="group w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-stone-500/[0.04] dark:hover:bg-white/[0.03] transition-all duration-200"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <span className="shrink-0 w-7 h-7 rounded-lg bg-stone-100 dark:bg-[#0c163b] border border-stone-200/80 dark:border-[#1E293B] text-stone-700 dark:text-scaffold-green text-xs font-semibold tabular-nums flex items-center justify-center group-hover:scale-110 group-hover:border-scaffold-green/50 transition-all duration-200 shadow-sm">
                      {section.order}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-medium text-stone-900 dark:text-stone-100 group-hover:text-scaffold-emerald dark:group-hover:text-scaffold-green transition-colors truncate">
                        {section.title}
                      </h3>
                      <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1 leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight 
                    className="w-4 h-4 text-stone-400 dark:text-stone-500 group-hover:text-scaffold-green group-hover:translate-x-1 shrink-0 transition-all duration-200" 
                    strokeWidth={1.75} 
                  />
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Lift>
  )
}

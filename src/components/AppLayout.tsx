import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PhaseNav } from './PhaseNav'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'

interface AppLayoutProps {
  children: ReactNode
  /** Optional title shown in the header (for sub-pages) */
  title?: string
  /** Optional back navigation path */
  backTo?: string
  /** Optional back label */
  backLabel?: string
  /** Whether to show the phase nav (default: true) */
  showPhaseNav?: boolean
}

export function AppLayout({
  children,
  title,
  backTo,
  backLabel = 'Back',
  showPhaseNav = true,
}: AppLayoutProps) {
  const navigate = useNavigate()

  // Determine if this is a sub-page (has back navigation)
  const isSubPage = !!backTo

  return (
    <div className="relative min-h-screen bg-background animate-fade-in flex flex-col">
      {/* Ambient wash — a single warm light source behind the whole console */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-[420px] bg-[radial-gradient(80%_100%_at_50%_0%,rgba(132,204,22,0.07),transparent_70%)] dark:bg-[radial-gradient(80%_100%_at_50%_0%,rgba(163,230,53,0.05),transparent_70%)]"
      />

      {/* Header */}
      <header className="relative border-b border-stone-200/70 dark:border-stone-800/70 bg-card/70 backdrop-blur-xl sticky top-0 z-20">
        {/* Hairline that fades at both ends — reads as glass, not as a table rule */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-stone-300/70 dark:via-stone-600/50 to-transparent"
        />
        <div className="relative px-4 sm:px-6 py-3">
          {isSubPage ? (
            /* Sub-page header with back button */
            <div className="max-w-3xl mx-auto flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(backTo)}
                className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 -ml-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
                {backLabel}
              </Button>
              {title && (
                <>
                  <div className="h-4 w-px bg-stone-200 dark:bg-stone-700" />
                  <h1 className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
                    {title}
                  </h1>
                </>
              )}
              <div className="ml-auto">
                <ThemeToggle />
              </div>
            </div>
          ) : (
            /* Main page header with phase nav - full width */
            <div className="flex items-center justify-between gap-4">
              {/* Scaffold Brand Logo on left */}
              <div 
                onClick={() => navigate('/')}
                className="flex items-center shrink-0 cursor-pointer select-none py-1"
                title="Scaffold™ Visual Workspace"
              >
                <img 
                  src="/scaffold/scaffold-logo-light.png" 
                  alt="Scaffold™" 
                  className="h-8 w-auto object-contain dark:hidden" 
                />
                <img 
                  src="/scaffold/scaffold-logo-dark.png" 
                  alt="Scaffold™" 
                  className="h-8 w-auto object-contain hidden dark:block" 
                />
              </div>

              {/* Phase Navigation - centered */}
              {showPhaseNav && (
                <div className="flex-1 flex justify-center">
                  <PhaseNav />
                </div>
              )}

              {/* Theme Toggle */}
              <div className="w-24 shrink-0 flex justify-end">
                <ThemeToggle />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">
        {children}
      </main>

      {/* Footer with logo */}
      <footer className="py-8 flex justify-center">
        <div className="flex items-center gap-2 text-stone-400 dark:text-stone-500">
          <span className="text-xs">Powered by</span>
          <img src="/scaffold/scaffold-mark.png" alt="Scaffold™" className="w-4 h-auto object-contain" />
          <span className="text-xs font-medium tracking-wide">Scaffold™</span>
        </div>
      </footer>
    </div>
  )
}

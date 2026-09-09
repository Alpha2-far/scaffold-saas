import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { AnimatePresence, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { Button } from '@/components/ui/button'
import { SPRING } from '@/lib/motion'
import { Tappable } from '@/components/motion-primitives'

type Theme = 'light' | 'dark' | 'system'

export function ThemeToggle() {
  const reduce = useReducedMotion()
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system'
    }
    return 'system'
  })

  useEffect(() => {
    const root = document.documentElement

    const applyTheme = (theme: Theme) => {
      if (theme === 'system') {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        root.classList.toggle('dark', systemDark)
      } else {
        root.classList.toggle('dark', theme === 'dark')
      }
    }

    applyTheme(theme)
    localStorage.setItem('theme', theme)

    // Listen for system theme changes when in system mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'light') return 'dark'
      if (prev === 'dark') return 'system'
      return 'light'
    })
  }

  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <Tappable className="w-8 h-8">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="w-8 h-8 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 relative overflow-hidden"
        title={`Theme: ${theme}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={isDark ? 'moon' : 'sun'}
            initial={{ opacity: 0, rotate: reduce ? 0 : -70, scale: reduce ? 1 : 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: reduce ? 0 : 70, scale: reduce ? 1 : 0.6 }}
            transition={SPRING.status}
            className="flex items-center justify-center"
          >
            {isDark ? (
              <Moon className="w-4 h-4" strokeWidth={1.5} />
            ) : (
              <Sun className="w-4 h-4" strokeWidth={1.5} />
            )}
          </m.span>
        </AnimatePresence>
      </Button>
    </Tappable>
  )
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { LazyMotion } from 'motion/react'
import './index.css'
import { router } from '@/lib/router'

/**
 * Load only the DOM animation feature bundle (animations, variants, exit,
 * hover/tap gestures) instead of the full engine — we use no drag and no layout
 * animations. `strict` makes any stray `motion.*` component a build-time-loud
 * runtime error, so the codebase stays on the lightweight `m.*` components.
 */
const loadDomAnimation = () => import('@/lib/motion-features').then((mod) => mod.default)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={loadDomAnimation} strict>
      <RouterProvider router={router} />
    </LazyMotion>
  </StrictMode>,
)

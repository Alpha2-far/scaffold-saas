import { FileText, Boxes, Layout, LayoutList, Package } from 'lucide-react'

/**
 * The five phases of the Scaffold™ pre-code flow, in order.
 *
 * This lives in `lib/` rather than beside `PhaseNav`: a module that exports both a
 * component and a plain value cannot be hot-reloaded by React Fast Refresh, so every
 * edit to the nav would have forced a full page reload. Keeping the sequence here also
 * makes it importable by anything that needs to reason about phase order without
 * pulling in the nav's motion tree.
 */
export type Phase = 'product' | 'data-shape' | 'design' | 'sections' | 'export'

export type PhaseStatus = 'completed' | 'current' | 'upcoming'

export interface PhaseConfig {
  id: Phase
  label: string
  icon: typeof FileText
  path: string
}

export const phases: PhaseConfig[] = [
  { id: 'product', label: 'Product', icon: FileText, path: '/' },
  { id: 'data-shape', label: 'Data Shape', icon: Boxes, path: '/data-shape' },
  { id: 'design', label: 'Design', icon: Layout, path: '/design' },
  { id: 'sections', label: 'Sections', icon: LayoutList, path: '/sections' },
  { id: 'export', label: 'Export', icon: Package, path: '/export' },
]

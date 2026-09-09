import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadProductData } from '@/lib/product-loader'
import { computeProductHealth } from '@/lib/product-health'
import { AppLayout } from '@/components/AppLayout'
import { EmptyState } from '@/components/EmptyState'
import { ProductOverviewCard } from '@/components/ProductOverviewCard'
import { SectionsCard } from '@/components/SectionsCard'
import { StatusConsole } from '@/components/StatusConsole'
import { StepIndicator, type StepStatus } from '@/components/StepIndicator'
import { NextPhaseButton } from '@/components/NextPhaseButton'
import { Stagger, StaggerItem } from '@/components/motion-primitives'

/**
 * Determine the status of each step on the Product page
 * Steps: 1. Product Vision, 2. Roadmap
 */
function getProductPageStepStatuses(
  hasOverview: boolean,
  hasRoadmap: boolean
): StepStatus[] {
  const statuses: StepStatus[] = []

  // Step 1: Product Vision
  if (hasOverview) {
    statuses.push('completed')
  } else {
    statuses.push('current')
  }

  // Step 2: Roadmap
  if (hasRoadmap) {
    statuses.push('completed')
  } else if (hasOverview) {
    statuses.push('current')
  } else {
    statuses.push('upcoming')
  }

  return statuses
}

export function ProductPage() {
  const navigate = useNavigate()
  const productData = useMemo(() => loadProductData(), [])
  const health = useMemo(() => computeProductHealth(), [])

  const hasOverview = !!productData.overview
  const hasRoadmap = !!productData.roadmap
  const allStepsComplete = hasOverview && hasRoadmap

  const stepStatuses = getProductPageStepStatuses(hasOverview, hasRoadmap)

  return (
    <AppLayout>
      {/* Masthead + live scope-lock metrics */}
      <StatusConsole data={productData} health={health} />

      {/* The definition steps, cascading in behind the console */}
      <Stagger className="space-y-6" delay={0.3} gap={0.08}>
        {/* Step 1: Product Vision */}
        <StaggerItem id="step-overview">
          <StepIndicator step={1} status={stepStatuses[0]}>
            {productData.overview ? (
              <ProductOverviewCard overview={productData.overview} />
            ) : (
              <EmptyState type="overview" />
            )}
          </StepIndicator>
        </StaggerItem>

        {/* Step 2: Roadmap / Sections Definition */}
        <StaggerItem id="step-roadmap">
          <StepIndicator step={2} status={stepStatuses[1]} isLast={!allStepsComplete}>
            {productData.roadmap ? (
              <SectionsCard
                roadmap={productData.roadmap}
                onSectionClick={(sectionId) => navigate(`/sections/${sectionId}`)}
              />
            ) : (
              <EmptyState type="roadmap" />
            )}
          </StepIndicator>
        </StaggerItem>

        {/* Next Phase Button - shown when all steps complete */}
        {allStepsComplete && (
          <StaggerItem>
            <StepIndicator step={3} status="current" isLast>
              <NextPhaseButton nextPhase="data-shape" />
            </StepIndicator>
          </StaggerItem>
        )}
      </Stagger>
    </AppLayout>
  )
}

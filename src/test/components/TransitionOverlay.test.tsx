import TransitionOverlay from '@/components/TransitionOverlay'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('TransitionOverlay', () => {
  it('renders nothing when not transitioning', () => {
    const { container } = render(
      <TransitionOverlay isTransitioning={false} transitionStage="idle" />
    )

    expect(container.firstChild).toBeNull()
  })

  it('renders overlay when transitioning', () => {
    const { container } = render(
      <TransitionOverlay isTransitioning={true} transitionStage="pixelating-out" />
    )

    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('fixed', 'inset-0', 'z-50', 'pointer-events-none')
  })

  it('shows pixelating-out overlay during pixelating-out stage', () => {
    const { container } = render(
      <TransitionOverlay isTransitioning={true} transitionStage="pixelating-out" />
    )

    const pixelatingOutOverlay = container.querySelector('.pixelation-out-overlay')
    const pixelatingOutContainer = pixelatingOutOverlay?.parentElement

    expect(pixelatingOutOverlay).toBeInTheDocument()
    expect(pixelatingOutContainer).toHaveClass('opacity-100')
  })

  it('hides pixelating-out overlay during other stages', () => {
    const { container } = render(
      <TransitionOverlay isTransitioning={true} transitionStage="instant-jump" />
    )

    const pixelatingOutOverlay = container.querySelector('.pixelation-out-overlay')
    const pixelatingOutContainer = pixelatingOutOverlay?.parentElement

    expect(pixelatingOutContainer).toHaveClass('opacity-0')
  })

  it('shows instant-jump overlay during instant-jump stage', () => {
    const { container } = render(
      <TransitionOverlay isTransitioning={true} transitionStage="instant-jump" />
    )

    const instantJumpOverlay = container.querySelector(
      '.bg-gray-900.transition-opacity.duration-50'
    )

    expect(instantJumpOverlay).toBeInTheDocument()
    expect(instantJumpOverlay).toHaveClass('opacity-100')
  })

  it('hides instant-jump overlay during other stages', () => {
    const { container } = render(
      <TransitionOverlay isTransitioning={true} transitionStage="pixelating-in" />
    )

    const instantJumpOverlay = container.querySelector(
      '.bg-gray-900.transition-opacity.duration-50'
    )

    expect(instantJumpOverlay).toHaveClass('opacity-0')
  })

  it('shows pixelating-in overlay during pixelating-in stage', () => {
    const { container } = render(
      <TransitionOverlay isTransitioning={true} transitionStage="pixelating-in" />
    )

    const pixelatingInOverlay = container.querySelector('.pixelation-in-overlay')
    const pixelatingInContainer = pixelatingInOverlay?.parentElement

    expect(pixelatingInOverlay).toBeInTheDocument()
    expect(pixelatingInContainer).toHaveClass('opacity-100')
  })

  it('hides pixelating-in overlay during other stages', () => {
    const { container } = render(
      <TransitionOverlay isTransitioning={true} transitionStage="pixelating-out" />
    )

    const pixelatingInOverlay = container.querySelector('.pixelation-in-overlay')
    const pixelatingInContainer = pixelatingInOverlay?.parentElement

    expect(pixelatingInContainer).toHaveClass('opacity-0')
  })

  it('includes gradient effects during pixelating-out', () => {
    const { container } = render(
      <TransitionOverlay isTransitioning={true} transitionStage="pixelating-out" />
    )

    const gradientEffect = container.querySelector('.bg-gradient-to-br.from-primary-400\\/10')
    expect(gradientEffect).toBeInTheDocument()
  })

  it('includes gradient effects during pixelating-in', () => {
    const { container } = render(
      <TransitionOverlay isTransitioning={true} transitionStage="pixelating-in" />
    )

    const gradientEffect = container.querySelector('.bg-gradient-to-tr.from-primary-400\\/5')
    expect(gradientEffect).toBeInTheDocument()
  })

  it('has correct transition durations', () => {
    const { container } = render(
      <TransitionOverlay isTransitioning={true} transitionStage="pixelating-out" />
    )

    const pixelatingOutContainer = container.querySelector('.transition-opacity.duration-300')
    const instantJumpOverlay = container.querySelector('.transition-opacity.duration-50')

    expect(pixelatingOutContainer).toBeInTheDocument()
    expect(instantJumpOverlay).toBeInTheDocument()
  })

  it('maintains z-index for proper layering', () => {
    const { container } = render(
      <TransitionOverlay isTransitioning={true} transitionStage="pixelating-out" />
    )

    const overlay = container.firstChild
    expect(overlay).toHaveClass('z-50')
  })

  it('prevents pointer events', () => {
    const { container } = render(
      <TransitionOverlay isTransitioning={true} transitionStage="pixelating-out" />
    )

    const overlay = container.firstChild
    expect(overlay).toHaveClass('pointer-events-none')
  })

  it('handles idle stage correctly when transitioning', () => {
    const { container } = render(
      <TransitionOverlay isTransitioning={true} transitionStage="idle" />
    )

    // When stage is idle but still transitioning, all overlays should be hidden
    const pixelatingOutContainer = container.querySelector('.pixelation-out-overlay')?.parentElement
    const instantJumpOverlay = container.querySelector(
      '.bg-gray-900.transition-opacity.duration-50'
    )
    const pixelatingInContainer = container.querySelector('.pixelation-in-overlay')?.parentElement

    expect(pixelatingOutContainer).toHaveClass('opacity-0')
    expect(instantJumpOverlay).toHaveClass('opacity-0')
    expect(pixelatingInContainer).toHaveClass('opacity-0')
  })

  it('covers full screen', () => {
    const { container } = render(
      <TransitionOverlay isTransitioning={true} transitionStage="pixelating-out" />
    )

    const overlay = container.firstChild
    expect(overlay).toHaveClass('fixed', 'inset-0')
  })
})

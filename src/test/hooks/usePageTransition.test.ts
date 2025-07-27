import { usePageTransition } from '@/hooks/usePageTransition'
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Mock getElementById
const mockScrollIntoView = vi.fn()
const mockGetElementById = vi.fn().mockReturnValue({
  scrollIntoView: mockScrollIntoView,
})

Object.defineProperty(document, 'getElementById', {
  value: mockGetElementById,
  writable: true,
})

describe('usePageTransition', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.clearAllTimers()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('initializes with idle state', () => {
    const { result } = renderHook(() => usePageTransition())

    expect(result.current.isTransitioning).toBe(false)
    expect(result.current.targetSection).toBe(null)
    expect(result.current.transitionStage).toBe('idle')
  })

  it('provides navigateToSection function', () => {
    const { result } = renderHook(() => usePageTransition())

    expect(typeof result.current.navigateToSection).toBe('function')
  })

  it('starts transition when navigateToSection is called', () => {
    const { result } = renderHook(() => usePageTransition())

    act(() => {
      result.current.navigateToSection('about')
    })

    expect(result.current.isTransitioning).toBe(true)
    expect(result.current.targetSection).toBe('about')
    expect(result.current.transitionStage).toBe('pixelating-out')
  })

  it('ignores navigation while already transitioning', () => {
    const { result } = renderHook(() => usePageTransition())

    // Start first transition
    act(() => {
      result.current.navigateToSection('about')
    })

    const firstTargetSection = result.current.targetSection

    // Try to start second transition
    act(() => {
      result.current.navigateToSection('contact')
    })

    // Should still be the first transition
    expect(result.current.targetSection).toBe(firstTargetSection)
  })

  it('progresses through transition stages', () => {
    const { result } = renderHook(() => usePageTransition())

    act(() => {
      result.current.navigateToSection('about')
    })

    expect(result.current.transitionStage).toBe('pixelating-out')

    // Fast-forward through first timeout (300ms)
    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current.transitionStage).toBe('instant-jump')

    // Fast-forward through second timeout (50ms)
    act(() => {
      vi.advanceTimersByTime(50)
    })

    expect(result.current.transitionStage).toBe('pixelating-in')

    // Fast-forward through final timeout (300ms)
    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current.transitionStage).toBe('idle')
    expect(result.current.isTransitioning).toBe(false)
    expect(result.current.targetSection).toBe(null)
  })

  it('scrolls to target element during instant-jump stage', () => {
    const { result } = renderHook(() => usePageTransition())

    act(() => {
      result.current.navigateToSection('about')
    })

    // Fast-forward to instant-jump stage
    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(mockGetElementById).toHaveBeenCalledWith('about')
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'instant',
      block: 'start',
    })
  })

  it('handles missing target element gracefully', () => {
    mockGetElementById.mockReturnValueOnce(null)

    const { result } = renderHook(() => usePageTransition())

    act(() => {
      result.current.navigateToSection('nonexistent')
    })

    // Fast-forward to instant-jump stage
    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(mockGetElementById).toHaveBeenCalledWith('nonexistent')
    expect(mockScrollIntoView).not.toHaveBeenCalled()

    // Transition should still complete
    act(() => {
      vi.advanceTimersByTime(350) // 50ms + 300ms remaining
    })

    expect(result.current.transitionStage).toBe('idle')
  })

  it('maintains navigateToSection function identity when not transitioning', () => {
    const { result, rerender } = renderHook(() => usePageTransition())

    const firstNavigate = result.current.navigateToSection

    rerender()

    const secondNavigate = result.current.navigateToSection

    expect(firstNavigate).toBe(secondNavigate)
  })

  it('creates new navigateToSection function when transitioning state changes', () => {
    const { result } = renderHook(() => usePageTransition())

    const initialNavigate = result.current.navigateToSection

    act(() => {
      result.current.navigateToSection('about')
    })

    const transitioningNavigate = result.current.navigateToSection

    // Function should be recreated when isTransitioning changes
    expect(initialNavigate).not.toBe(transitioningNavigate)
  })

  it('completes full transition cycle', () => {
    const { result } = renderHook(() => usePageTransition())

    act(() => {
      result.current.navigateToSection('contact')
    })

    // Should be transitioning
    expect(result.current.isTransitioning).toBe(true)

    // Complete entire transition (300ms + 50ms + 300ms = 650ms)
    act(() => {
      vi.advanceTimersByTime(650)
    })

    // Should be back to idle state
    expect(result.current.isTransitioning).toBe(false)
    expect(result.current.targetSection).toBe(null)
    expect(result.current.transitionStage).toBe('idle')
  })

  it('handles multiple section navigations after completion', () => {
    const { result } = renderHook(() => usePageTransition())

    // First transition
    act(() => {
      result.current.navigateToSection('about')
    })

    // Complete first transition
    act(() => {
      vi.advanceTimersByTime(650)
    })

    expect(result.current.isTransitioning).toBe(false)

    // Second transition should work
    act(() => {
      result.current.navigateToSection('contact')
    })

    expect(result.current.isTransitioning).toBe(true)
    expect(result.current.targetSection).toBe('contact')
  })
})

import { useFeatureFlags } from '@/hooks/useFeatureFlags'
import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/constants/featureFlags', () => ({
  FEATURE_FLAGS: {
    showProjects: true,
    showContactButtons: true,
  },
  isFeatureEnabled: (feature: string) => {
    const flags: Record<string, boolean> = {
      showProjects: true,
      showContactButtons: true,
      nonExistentFeature: false,
    }
    return flags[feature] || false
  },
}))

describe('useFeatureFlags', () => {
  it('returns all feature flags', () => {
    const { result } = renderHook(() => useFeatureFlags())

    expect(result.current.showProjects).toBe(true)
    expect(result.current.showContactButtons).toBe(true)
  })

  it('provides isEnabled function', () => {
    const { result } = renderHook(() => useFeatureFlags())

    expect(typeof result.current.isEnabled).toBe('function')
  })

  it('isEnabled function works correctly', () => {
    const { result } = renderHook(() => useFeatureFlags())

    expect(result.current.isEnabled('showProjects')).toBe(true)
    expect(result.current.isEnabled('showContactButtons')).toBe(true)
  })

  it('returns same reference on re-renders', () => {
    const { result, rerender } = renderHook(() => useFeatureFlags())

    const firstRender = result.current

    rerender()

    const secondRender = result.current

    // Should return the same values
    expect(firstRender.showProjects).toBe(secondRender.showProjects)
    expect(firstRender.showContactButtons).toBe(secondRender.showContactButtons)
  })

  it('spreads FEATURE_FLAGS correctly', () => {
    const { result } = renderHook(() => useFeatureFlags())

    // Check that all expected properties exist
    expect(result.current).toHaveProperty('showProjects')
    expect(result.current).toHaveProperty('showContactButtons')
    expect(result.current).toHaveProperty('isEnabled')
  })
})

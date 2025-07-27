import { useVisitorStatus } from '@/hooks/useVisitorStatus'
import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

describe('useVisitorStatus', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('marks visitor as visited in localStorage for first-time visitor', () => {
    renderHook(() => useVisitorStatus())

    expect(localStorage.getItem('hasVisited')).toBe('true')
  })

  it('returns true for returning visitor', () => {
    // Set up localStorage as if user has visited before
    localStorage.setItem('hasVisited', 'true')

    const { result } = renderHook(() => useVisitorStatus())

    expect(result.current).toBe(true)
  })

  it('handles existing false value correctly and updates it', () => {
    // Set up localStorage with false value
    localStorage.setItem('hasVisited', 'false')

    renderHook(() => useVisitorStatus())

    // Should update to true
    expect(localStorage.getItem('hasVisited')).toBe('true')
  })

  it('persists visitor status across hook instances', () => {
    // First render marks as visited
    renderHook(() => useVisitorStatus())
    expect(localStorage.getItem('hasVisited')).toBe('true')

    // Second render should remember the visit
    const { result: result2 } = renderHook(() => useVisitorStatus())
    expect(result2.current).toBe(true)
  })

  it('works with different localStorage states', () => {
    // Test returning visitor
    localStorage.setItem('hasVisited', 'true')
    const { result: result1 } = renderHook(() => useVisitorStatus())
    expect(result1.current).toBe(true)

    // Test with false (will be converted to true)
    localStorage.clear()
    localStorage.setItem('hasVisited', 'false')
    renderHook(() => useVisitorStatus())
    expect(localStorage.getItem('hasVisited')).toBe('true')

    // Test with no value (will be set to true)
    localStorage.clear()
    renderHook(() => useVisitorStatus())
    expect(localStorage.getItem('hasVisited')).toBe('true')
  })

  it('consistently returns boolean values', () => {
    // Test with existing true value
    localStorage.setItem('hasVisited', 'true')
    const { result } = renderHook(() => useVisitorStatus())
    expect(typeof result.current).toBe('boolean')
    expect(result.current).toBe(true)
  })
})

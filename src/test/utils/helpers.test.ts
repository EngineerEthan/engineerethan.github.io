import { classNames, debounce, formatDate } from '@/utils/helpers'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('classNames', () => {
  it('combines multiple class names', () => {
    expect(classNames('class1', 'class2', 'class3')).toBe('class1 class2 class3')
  })

  it('filters out falsy values', () => {
    expect(classNames('class1', false, 'class2', null, 'class3', undefined)).toBe(
      'class1 class2 class3'
    )
  })

  it('handles empty input', () => {
    expect(classNames()).toBe('')
  })

  it('handles all falsy values', () => {
    expect(classNames(false, null, undefined)).toBe('')
  })

  it('handles single class name', () => {
    expect(classNames('single-class')).toBe('single-class')
  })

  it('handles conditional class names', () => {
    const isActive = true
    const isDisabled = false

    expect(classNames('base-class', isActive && 'active', isDisabled && 'disabled')).toBe(
      'base-class active'
    )
  })

  it('handles empty strings', () => {
    expect(classNames('class1', '', 'class2')).toBe('class1 class2')
  })
})

describe('formatDate', () => {
  it('formats Date object correctly', () => {
    const date = new Date('2023-12-25T00:00:00Z')
    const formatted = formatDate(date)

    expect(formatted).toMatch(/December 2[45], 2023/)
  })

  it('formats date string correctly', () => {
    const formatted = formatDate('2023-12-25T00:00:00Z')

    expect(formatted).toMatch(/December 2[45], 2023/)
  })

  it('handles different date formats', () => {
    const formatted = formatDate('2023-01-01T00:00:00Z')

    expect(formatted).toMatch(/January 1, 2023|December 31, 2022/)
  })

  it('handles edge case dates', () => {
    const formatted = formatDate('2023-02-28T00:00:00Z')

    expect(formatted).toMatch(/February 2[78], 2023/)
  })

  it('handles leap year dates', () => {
    const formatted = formatDate('2024-02-29T00:00:00Z')

    expect(formatted).toMatch(/February 2[89], 2024/)
  })

  it('formats dates consistently', () => {
    const date1 = formatDate(new Date('2023-01-01T00:00:00Z'))
    const date2 = formatDate('2023-01-01T00:00:00Z')

    expect(date1).toBe(date2)
  })

  it('returns a valid formatted string', () => {
    const formatted = formatDate(new Date())

    expect(typeof formatted).toBe('string')
    expect(formatted).toMatch(/^[A-Z][a-z]+ \d{1,2}, \d{4}$/)
  })
})

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('delays function execution', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn()

    expect(mockFn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('cancels previous calls when called again', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn()
    vi.advanceTimersByTime(50)

    debouncedFn() // This should cancel the first call
    vi.advanceTimersByTime(50)

    expect(mockFn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(50) // Complete the second call

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('passes arguments correctly', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn('arg1', 'arg2', 123)
    vi.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 123)
  })

  it('handles multiple rapid calls', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn('call1')
    debouncedFn('call2')
    debouncedFn('call3')

    vi.advanceTimersByTime(100)

    // Only the last call should execute
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith('call3')
  })

  it('allows execution after delay completes', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn('first')
    vi.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith('first')

    debouncedFn('second')
    vi.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledTimes(2)
    expect(mockFn).toHaveBeenCalledWith('second')
  })

  it('works with different wait times', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 250)

    debouncedFn()
    vi.advanceTimersByTime(200)

    expect(mockFn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(50)

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('handles zero wait time', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 0)

    debouncedFn()
    vi.advanceTimersByTime(0)

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('handles function context appropriately', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn('test')
    vi.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith('test')
  })

  it('handles no arguments', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn()
    vi.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith()
  })
})

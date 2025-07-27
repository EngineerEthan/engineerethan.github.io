import { useLocalStorage } from '@/hooks/useLocalStorage'
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Mock console.warn to avoid noise in tests
const mockConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {})

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
    mockConsoleWarn.mockClear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'))

    expect(result.current[0]).toBe('initial-value')
  })

  it('returns stored value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'))

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'))

    expect(result.current[0]).toBe('stored-value')
  })

  it('updates localStorage when value is set', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'))

    act(() => {
      result.current[1]('new-value')
    })

    expect(result.current[0]).toBe('new-value')
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'))
  })

  it('works with function updater', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 10))

    act(() => {
      result.current[1](prev => prev + 5)
    })

    expect(result.current[0]).toBe(15)
    expect(localStorage.getItem('test-key')).toBe('15')
  })

  it('works with complex objects', () => {
    const initialObject = { name: 'John', age: 30 }
    const { result } = renderHook(() => useLocalStorage('test-key', initialObject))

    const newObject = { name: 'Jane', age: 25 }
    act(() => {
      result.current[1](newObject)
    })

    expect(result.current[0]).toEqual(newObject)
    const storedValue = localStorage.getItem('test-key')
    expect(storedValue).toBeDefined()
    expect(JSON.parse(storedValue as string)).toEqual(newObject)
  })

  it('works with arrays', () => {
    const initialArray = [1, 2, 3]
    const { result } = renderHook(() => useLocalStorage('test-key', initialArray))

    const newArray = [4, 5, 6]
    act(() => {
      result.current[1](newArray)
    })

    expect(result.current[0]).toEqual(newArray)
    const storedValue = localStorage.getItem('test-key')
    expect(storedValue).toBeDefined()
    expect(JSON.parse(storedValue as string)).toEqual(newArray)
  })

  it('works with boolean values', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', false))

    act(() => {
      result.current[1](true)
    })

    expect(result.current[0]).toBe(true)
    expect(localStorage.getItem('test-key')).toBe('true')
  })

  it('handles JSON parsing errors gracefully', () => {
    localStorage.setItem('test-key', 'invalid-json')

    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'))

    expect(result.current[0]).toBe('default-value')
    expect(mockConsoleWarn).toHaveBeenCalledWith(
      'Error reading localStorage key "test-key":',
      expect.any(Error)
    )
  })

  it('handles localStorage setItem errors gracefully', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    // Mock localStorage.setItem to throw an error
    const mockSetItem = vi.fn(() => {
      throw new Error('Storage quota exceeded')
    })

    // Replace setItem with the mock
    const originalSetItem = Storage.prototype.setItem
    Storage.prototype.setItem = mockSetItem

    act(() => {
      result.current[1]('new-value')
    })

    expect(mockConsoleWarn).toHaveBeenCalledWith(
      'Error setting localStorage key "test-key":',
      expect.any(Error)
    )

    // Restore original method
    Storage.prototype.setItem = originalSetItem
  })

  it('reflects key changes correctly', () => {
    localStorage.setItem('key1', JSON.stringify('value1'))
    localStorage.setItem('key2', JSON.stringify('value2'))

    // Test with key1
    const { result: result1 } = renderHook(() => useLocalStorage('key1', 'default'))
    expect(result1.current[0]).toBe('value1')

    // Test with key2
    const { result: result2 } = renderHook(() => useLocalStorage('key2', 'default'))
    expect(result2.current[0]).toBe('value2')
  })

  it('maintains function identity for setValue', () => {
    const { result, rerender } = renderHook(() => useLocalStorage('test-key', 'initial'))

    const setValue1 = result.current[1]

    rerender()

    const setValue2 = result.current[1]

    // setValue function should change when storedValue changes due to dependency
    expect(setValue1).toBe(setValue2)
  })

  it('handles null and undefined values', () => {
    const { result } = renderHook(() => useLocalStorage<string | null>('test-key', null))

    act(() => {
      result.current[1]('not-null')
    })

    expect(result.current[0]).toBe('not-null')

    act(() => {
      result.current[1](null)
    })

    expect(result.current[0]).toBe(null)
    expect(localStorage.getItem('test-key')).toBe('null')
  })
})

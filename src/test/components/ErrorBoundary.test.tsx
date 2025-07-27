import ErrorBoundary from '@/components/ErrorBoundary'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock console.error to avoid noise in tests
const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

// Mock window.location.reload
const mockReload = vi.fn()
Object.defineProperty(window, 'location', {
  value: {
    ...window.location,
    reload: mockReload,
  },
  writable: true,
})

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockConsoleError.mockClear()
  })

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders error UI when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()
    expect(
      screen.getByText(
        `An error occurred while loading this page. This has been logged and we'll look into it.`
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Reload Page')).toBeInTheDocument()
  })

  it('logs error to console when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(mockConsoleError).toHaveBeenCalledWith(
      'Error caught by boundary:',
      expect.any(Error),
      expect.any(Object)
    )
  })

  it('reloads page when reload button is clicked', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const reloadButton = screen.getByText('Reload Page')
    reloadButton.click()

    expect(mockReload).toHaveBeenCalledTimes(1)
  })

  it('shows technical details in development mode', () => {
    const originalNodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Technical Details (Development Only)')).toBeInTheDocument()

    process.env.NODE_ENV = originalNodeEnv
  })

  it('hides technical details in production mode', () => {
    const originalNodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.queryByText('Technical Details (Development Only)')).not.toBeInTheDocument()

    process.env.NODE_ENV = originalNodeEnv
  })

  it('shows error details when technical details are expanded in development', () => {
    const originalNodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const detailsElement = screen
      .getByText('Technical Details (Development Only)')
      .closest('details')
    expect(detailsElement).toBeInTheDocument()

    // Check that error details container exists
    const errorDetailsContainer = detailsElement?.querySelector('pre')
    expect(errorDetailsContainer).toBeInTheDocument()

    process.env.NODE_ENV = originalNodeEnv
  })

  it('renders exclamation triangle icon', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    // Look for the icon container
    const iconContainer = document.querySelector('.h-24.w-24.text-red-400')
    expect(iconContainer).toBeInTheDocument()
  })

  it('has correct styling for error page', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const errorContainer = screen.getByText('Oops! Something went wrong').closest('div')
    expect(errorContainer?.parentElement).toHaveClass(
      'min-h-screen',
      'bg-gray-900',
      'flex',
      'items-center',
      'justify-center'
    )
  })

  it('has accessible reload button', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const reloadButton = screen.getByRole('button', { name: 'Reload Page' })
    expect(reloadButton).toBeInTheDocument()
    expect(reloadButton).toHaveClass('bg-primary-600', 'hover:bg-primary-700')
  })

  it('maintains component state after error', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()

    // Re-render with different props - should still show error
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    // Should still show error page, not the fixed component
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()
    expect(screen.queryByText('No error')).not.toBeInTheDocument()
  })

  it('handles error without crashing the test', () => {
    // This test ensures the error boundary properly catches errors
    expect(() => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )
    }).not.toThrow()
  })
})

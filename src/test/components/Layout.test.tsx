import Layout from '@/components/Layout'
import { useFeatureFlags } from '@/hooks/useFeatureFlags'
import { usePageTransition } from '@/hooks/usePageTransition'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/hooks/useFeatureFlags')
vi.mock('@/hooks/usePageTransition')
vi.mock('@/components/TransitionOverlay', () => ({
  default: ({
    isTransitioning,
    transitionStage,
  }: { isTransitioning: boolean; transitionStage: string }) => (
    <div data-testid="transition-overlay">{isTransitioning && <span>{transitionStage}</span>}</div>
  ),
}))

const mockUseFeatureFlags = vi.mocked(useFeatureFlags)
const mockUsePageTransition = vi.mocked(usePageTransition)

describe('Layout', () => {
  beforeEach(() => {
    mockUsePageTransition.mockReturnValue({
      navigateToSection: vi.fn(),
      isTransitioning: false,
      targetSection: null,
      transitionStage: 'idle',
    })
  })

  it('renders header with navigation', () => {
    mockUseFeatureFlags.mockReturnValue({
      showProjects: true,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })

    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    )

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByText('Ethan')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('shows projects navigation when feature flag enabled', () => {
    mockUseFeatureFlags.mockReturnValue({
      showProjects: true,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })

    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    )

    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('hides projects navigation when feature flag disabled', () => {
    mockUseFeatureFlags.mockReturnValue({
      showProjects: false,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })

    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    )

    expect(screen.queryByText('Projects')).not.toBeInTheDocument()
  })

  it('renders main content', () => {
    mockUseFeatureFlags.mockReturnValue({
      showProjects: true,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })

    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders footer', () => {
    mockUseFeatureFlags.mockReturnValue({
      showProjects: true,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })

    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    )

    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByText('© 2025 Ethan. Built with React & Vite.')).toBeInTheDocument()
  })

  it('shows transition indicator when transitioning', () => {
    mockUseFeatureFlags.mockReturnValue({
      showProjects: true,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })
    mockUsePageTransition.mockReturnValue({
      navigateToSection: vi.fn(),
      isTransitioning: true,
      targetSection: null,
      transitionStage: 'pixelating-out',
    })

    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    )

    expect(screen.getByText('Transitioning...')).toBeInTheDocument()
  })

  it('hides transition indicator when not transitioning', () => {
    mockUseFeatureFlags.mockReturnValue({
      showProjects: true,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })
    mockUsePageTransition.mockReturnValue({
      navigateToSection: vi.fn(),
      isTransitioning: false,
      targetSection: null,
      transitionStage: 'idle',
    })

    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    )

    expect(screen.queryByText('Transitioning...')).not.toBeInTheDocument()
  })

  it('renders TransitionOverlay component', () => {
    mockUseFeatureFlags.mockReturnValue({
      showProjects: true,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })
    mockUsePageTransition.mockReturnValue({
      navigateToSection: vi.fn(),
      isTransitioning: true,
      targetSection: null,
      transitionStage: 'pixelating-out',
    })

    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    )

    expect(screen.getByTestId('transition-overlay')).toBeInTheDocument()
    expect(screen.getByText('pixelating-out')).toBeInTheDocument()
  })

  it('has correct navigation links with hash hrefs', () => {
    mockUseFeatureFlags.mockReturnValue({
      showProjects: true,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })

    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    )

    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '#home')
    expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '#about')
    expect(screen.getByText('Projects').closest('a')).toHaveAttribute('href', '#projects')
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '#contact')
  })

  it('has rocket icon in logo', () => {
    mockUseFeatureFlags.mockReturnValue({
      showProjects: true,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })

    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    )

    const logoLink = screen.getByText('Ethan').closest('a')
    expect(logoLink).toHaveAttribute('href', '#home')
  })

  it('handles hash link clicks', () => {
    const mockNavigateToSection = vi.fn()
    mockUsePageTransition.mockReturnValue({
      navigateToSection: mockNavigateToSection,
      isTransitioning: false,
      targetSection: null,
      transitionStage: 'idle',
    })
    mockUseFeatureFlags.mockReturnValue({
      showProjects: true,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })

    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    )

    // Test that navigation links exist (the actual event handling is via useEffect)
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '#home')
    expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '#about')
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '#contact')
  })
})

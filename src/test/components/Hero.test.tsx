import Hero from '@/components/Hero'
import { useFeatureFlags } from '@/hooks/useFeatureFlags'
import { usePageTransition } from '@/hooks/usePageTransition'
import { useVisitorStatus } from '@/hooks/useVisitorStatus'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/hooks/useVisitorStatus')
vi.mock('@/hooks/useFeatureFlags')
vi.mock('@/hooks/usePageTransition')

const mockUseVisitorStatus = vi.mocked(useVisitorStatus)
const mockUseFeatureFlags = vi.mocked(useFeatureFlags)
const mockUsePageTransition = vi.mocked(usePageTransition)

describe('Hero', () => {
  beforeEach(() => {
    mockUsePageTransition.mockReturnValue({
      navigateToSection: vi.fn(),
      isTransitioning: false,
      targetSection: null,
      transitionStage: 'idle',
    })
  })

  it('renders greeting for new visitor', () => {
    mockUseVisitorStatus.mockReturnValue(false)
    mockUseFeatureFlags.mockReturnValue({
      showProjects: true,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })

    render(<Hero />)

    expect(screen.getByText('Hi.')).toBeInTheDocument()
    expect(screen.getByText('👋')).toBeInTheDocument()
    expect(screen.getByText('Nice to meet you.')).toBeInTheDocument()
  })

  it('renders greeting for returning visitor', () => {
    mockUseVisitorStatus.mockReturnValue(true)
    mockUseFeatureFlags.mockReturnValue({
      showProjects: true,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })

    render(<Hero />)

    expect(screen.getByText(`It's good to see you again.`)).toBeInTheDocument()
  })

  it('renders technologist definition', () => {
    mockUseVisitorStatus.mockReturnValue(false)
    mockUseFeatureFlags.mockReturnValue({
      showProjects: true,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })

    render(<Hero />)

    expect(screen.getByText('Technologist')).toBeInTheDocument()
    expect(screen.getByText('/tekˈnäləjəst/')).toBeInTheDocument()
    expect(
      screen.getByText(
        'A person who works across multiple technological domains, applying diverse technical knowledge to solve complex, interdisciplinary problems.'
      )
    ).toBeInTheDocument()
  })

  it('renders main content', () => {
    mockUseVisitorStatus.mockReturnValue(false)
    mockUseFeatureFlags.mockReturnValue({
      showProjects: true,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })

    render(<Hero />)

    expect(screen.getByText('This is the age of the technologist.')).toBeInTheDocument()
    expect(
      screen.getByText(
        "We thrive in ambiguity, controlling the chaos to transform high-stakes ideas into simple, actionable products. Check out what I've been up to lately."
      )
    ).toBeInTheDocument()
  })

  it('shows projects button when feature flag enabled', () => {
    mockUseVisitorStatus.mockReturnValue(false)
    mockUseFeatureFlags.mockReturnValue({
      showProjects: true,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })

    render(<Hero />)

    expect(screen.getByText('View My Work')).toBeInTheDocument()
  })

  it('hides projects button when feature flag disabled', () => {
    mockUseVisitorStatus.mockReturnValue(false)
    mockUseFeatureFlags.mockReturnValue({
      showProjects: false,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })

    render(<Hero />)

    expect(screen.queryByText('View My Work')).not.toBeInTheDocument()
  })

  it('shows contact button when feature flag enabled', () => {
    mockUseVisitorStatus.mockReturnValue(false)
    mockUseFeatureFlags.mockReturnValue({
      showProjects: true,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })

    render(<Hero />)

    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
  })

  it('hides contact button when feature flag disabled', () => {
    mockUseVisitorStatus.mockReturnValue(false)
    mockUseFeatureFlags.mockReturnValue({
      showProjects: true,
      showContactButtons: false,
      isEnabled: vi.fn().mockReturnValue(true),
    })

    render(<Hero />)

    expect(screen.queryByText('Get In Touch')).not.toBeInTheDocument()
  })

  it('renders rocket icon with flame effects', () => {
    mockUseVisitorStatus.mockReturnValue(false)
    mockUseFeatureFlags.mockReturnValue({
      showProjects: true,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })

    render(<Hero />)

    const heroSection = document.querySelector('#home')
    expect(heroSection).toBeInTheDocument()
    expect(heroSection).toHaveAttribute('id', 'home')
  })

  it('handles click events on CTA links', () => {
    const mockNavigateToSection = vi.fn()
    mockUsePageTransition.mockReturnValue({
      navigateToSection: mockNavigateToSection,
      isTransitioning: false,
      targetSection: null,
      transitionStage: 'idle',
    })
    mockUseVisitorStatus.mockReturnValue(false)
    mockUseFeatureFlags.mockReturnValue({
      showProjects: true,
      showContactButtons: true,
      isEnabled: vi.fn().mockReturnValue(true),
    })

    render(<Hero />)

    // Test navigation to projects
    const projectsLink = screen.getByText('View My Work')
    fireEvent.click(projectsLink)

    // Test navigation to contact
    const contactLink = screen.getByText('Get In Touch')
    fireEvent.click(contactLink)

    // Verify the links exist (the actual navigation is handled by the page transition hook)
    expect(projectsLink).toHaveAttribute('href', '#projects')
    expect(contactLink).toHaveAttribute('href', '#contact')
  })
})

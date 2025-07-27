import ProjectTile from '@/components/ProjectTile'
import type { Project } from '@/types'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockProject: Project = {
  id: 1,
  title: 'Test Project',
  description: 'This is a test project description',
  technologies: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL'],
  featured: true,
  imageUrl: 'https://example.com/image.jpg',
  liveUrl: 'https://example.com/live',
  githubUrl: 'https://github.com/test/repo',
}

const mockWindow = vi.fn()
Object.defineProperty(window, 'open', {
  value: mockWindow,
  writable: true,
})

describe('ProjectTile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders project information', () => {
    render(<ProjectTile project={mockProject} />)

    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('This is a test project description')).toBeInTheDocument()
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('renders technologies with limit when not large', () => {
    render(<ProjectTile project={mockProject} isLarge={false} />)

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Tailwind')).toBeInTheDocument()
    expect(screen.getByText('+2 more')).toBeInTheDocument()
    expect(screen.queryByText('Node.js')).not.toBeInTheDocument()
  })

  it('renders more technologies when large', () => {
    render(<ProjectTile project={mockProject} isLarge={true} />)

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Tailwind')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
    expect(screen.queryByText('+2 more')).not.toBeInTheDocument()
  })

  it('renders live demo button when liveUrl exists', () => {
    render(<ProjectTile project={mockProject} />)

    expect(screen.getByLabelText(`View live demo of ${mockProject.title}`)).toBeInTheDocument()
    expect(screen.getByText('Live')).toBeInTheDocument()
  })

  it('does not render live demo button when liveUrl is missing', () => {
    const { liveUrl, ...projectWithoutLive } = mockProject
    render(<ProjectTile project={projectWithoutLive} />)

    expect(screen.queryByText('Live')).not.toBeInTheDocument()
  })

  it('opens live demo in new tab when clicked', () => {
    render(<ProjectTile project={mockProject} />)

    const liveButton = screen.getByText('Live')
    fireEvent.click(liveButton)

    expect(mockWindow).toHaveBeenCalledWith(
      'https://example.com/live',
      '_blank',
      'noopener,noreferrer'
    )
  })

  it('calls onTileClick when tile is clicked', () => {
    const mockOnTileClick = vi.fn()
    render(<ProjectTile project={mockProject} onTileClick={mockOnTileClick} />)

    const tile = screen.getByRole('button', { name: `Select ${mockProject.title} project` })
    fireEvent.click(tile)

    expect(mockOnTileClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onTileClick when live demo button is clicked', () => {
    const mockOnTileClick = vi.fn()
    render(<ProjectTile project={mockProject} onTileClick={mockOnTileClick} />)

    const liveButton = screen.getByText('Live')
    fireEvent.click(liveButton)

    expect(mockOnTileClick).not.toHaveBeenCalled()
  })

  it('renders project image when imageUrl is provided', () => {
    render(<ProjectTile project={mockProject} />)

    const image = screen.getByAltText(`${mockProject.title} screenshot`)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockProject.imageUrl)
  })

  it('shows fallback icon when image fails to load', () => {
    render(<ProjectTile project={mockProject} />)

    const image = screen.getByAltText(`${mockProject.title} screenshot`)
    fireEvent.error(image)

    expect(screen.queryByAltText(`${mockProject.title} screenshot`)).not.toBeInTheDocument()
    // Fallback icon should be present (CodeBracketIcon)
    const tile = screen.getByRole('button', { name: `Select ${mockProject.title} project` })
    expect(tile.querySelector('.bg-gray-700')).toBeInTheDocument()
  })

  it('applies correct CSS classes for large tiles', () => {
    render(<ProjectTile project={mockProject} isLarge={true} />)

    const tile = screen.getByRole('button', { name: `Select ${mockProject.title} project` })
    expect(tile).toHaveClass('md:col-span-2', 'md:row-span-2')
  })

  it('applies correct CSS classes for small tiles', () => {
    render(<ProjectTile project={mockProject} isLarge={false} />)

    const tile = screen.getByRole('button', { name: `Select ${mockProject.title} project` })
    expect(tile).toHaveClass('col-span-1', 'row-span-1')
  })

  it('does not render featured badge for non-featured projects', () => {
    const nonFeaturedProject = { ...mockProject, featured: false }
    render(<ProjectTile project={nonFeaturedProject} />)

    expect(screen.queryByText('Featured')).not.toBeInTheDocument()
  })

  it('handles projects with few technologies correctly', () => {
    const projectWithFewTechs = { ...mockProject, technologies: ['React', 'TypeScript'] }
    render(<ProjectTile project={projectWithFewTechs} />)

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.queryByText('+0 more')).not.toBeInTheDocument()
  })

  it('handles projects with no technologies', () => {
    const projectWithNoTechs = { ...mockProject, technologies: [] }
    render(<ProjectTile project={projectWithNoTechs} />)

    // Should not render any technology badges or +more indicator
    expect(screen.queryByText('React')).not.toBeInTheDocument()
    expect(screen.queryByText('+0 more')).not.toBeInTheDocument()
  })

  it('prevents live demo click from triggering tile click', () => {
    const mockOnTileClick = vi.fn()
    render(<ProjectTile project={mockProject} onTileClick={mockOnTileClick} />)

    const liveButton = screen.getByText('Live')
    fireEvent.click(liveButton)

    expect(mockWindow).toHaveBeenCalledWith(
      'https://example.com/live',
      '_blank',
      'noopener,noreferrer'
    )
    expect(mockOnTileClick).not.toHaveBeenCalled()
  })

  it('renders accessible labels correctly', () => {
    render(<ProjectTile project={mockProject} />)

    expect(
      screen.getByRole('button', { name: `Select ${mockProject.title} project` })
    ).toBeInTheDocument()
    expect(screen.getByLabelText(`View live demo of ${mockProject.title}`)).toBeInTheDocument()
  })

  it('handles missing onTileClick prop gracefully', () => {
    render(<ProjectTile project={mockProject} />)

    const tile = screen.getByRole('button', { name: `Select ${mockProject.title} project` })

    // Should not throw error when clicked without onTileClick prop
    expect(() => {
      fireEvent.click(tile)
    }).not.toThrow()
  })

  it('handles keyboard navigation', () => {
    const mockOnTileClick = vi.fn()
    render(<ProjectTile project={mockProject} onTileClick={mockOnTileClick} />)

    const tile = screen.getByRole('button', { name: `Select ${mockProject.title} project` })

    // Test Enter key
    fireEvent.keyDown(tile, { key: 'Enter' })
    expect(mockOnTileClick).toHaveBeenCalledTimes(1)

    // Test Space key
    fireEvent.keyDown(tile, { key: ' ' })
    expect(mockOnTileClick).toHaveBeenCalledTimes(2)

    // Test other key (should not trigger)
    fireEvent.keyDown(tile, { key: 'Tab' })
    expect(mockOnTileClick).toHaveBeenCalledTimes(2)
  })
})

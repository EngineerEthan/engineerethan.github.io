import ProjectGrid from '@/components/ProjectGrid'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/constants/data', () => ({
  PROJECTS: [
    {
      id: 1,
      title: 'Featured Project 1',
      description: 'Featured project description',
      technologies: ['React', 'TypeScript'],
      featured: true,
      link: 'https://example.com',
      images: [],
    },
    {
      id: 2,
      title: 'Featured Project 2',
      description: 'Another featured project',
      technologies: ['Vue', 'JavaScript'],
      featured: true,
      link: 'https://example2.com',
      images: [],
    },
    {
      id: 3,
      title: 'Other Project 1',
      description: 'Non-featured project',
      technologies: ['Angular', 'TypeScript'],
      featured: false,
      link: 'https://example3.com',
      images: [],
    },
    {
      id: 4,
      title: 'Other Project 2',
      description: 'Another non-featured project',
      technologies: ['Svelte', 'JavaScript'],
      featured: false,
      link: 'https://example4.com',
      images: [],
    },
  ],
}))

vi.mock('@/components/ProjectTile', () => ({
  default: ({
    project,
    isLarge,
    onTileClick,
  }: { project: { id: number; title: string }; isLarge: boolean; onTileClick: () => void }) => (
    <div
      data-testid={`project-tile-${project.id}`}
      data-large={isLarge}
      onClick={onTileClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onTileClick()
        }
      }}
      // biome-ignore lint/a11y/useSemanticElements: Mock component for testing purposes
      role="button"
      tabIndex={0}
      className={isLarge ? 'large-tile' : 'small-tile'}
    >
      {project.title}
    </div>
  ),
}))

describe('ProjectGrid', () => {
  beforeEach(() => {
    // Mock window.innerWidth for mobile detection
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  it('renders projects section heading', () => {
    render(<ProjectGrid />)

    expect(screen.getByText('Featured Projects')).toBeInTheDocument()
    expect(
      screen.getByText(`Here are some of the production projects I've worked on professionally.`)
    ).toBeInTheDocument()
  })

  it('renders featured projects grid', () => {
    render(<ProjectGrid />)

    expect(screen.getByTestId('project-tile-1')).toBeInTheDocument()
    expect(screen.getByTestId('project-tile-2')).toBeInTheDocument()
    expect(screen.getByText('Featured Project 1')).toBeInTheDocument()
    expect(screen.getByText('Featured Project 2')).toBeInTheDocument()
  })

  it('renders other projects section', () => {
    render(<ProjectGrid />)

    expect(screen.getByText('More Projects')).toBeInTheDocument()
    expect(
      screen.getByText(`These are other projects I've worked on and cofounded.`)
    ).toBeInTheDocument()
    expect(screen.getByTestId('project-tile-3')).toBeInTheDocument()
    expect(screen.getByTestId('project-tile-4')).toBeInTheDocument()
  })

  it('sets initial selected projects correctly', () => {
    render(<ProjectGrid />)

    // Choice project (id: 1) should be initially selected
    const choiceProject = screen.getByTestId('project-tile-1')
    expect(choiceProject).toHaveAttribute('data-large', 'true')

    // Toddler EyeSpy project (id: 4) should be initially selected for others
    const eyeSpyProject = screen.getByTestId('project-tile-4')
    expect(eyeSpyProject).toHaveAttribute('data-large', 'true')
  })

  it('handles featured project selection on hover', () => {
    render(<ProjectGrid />)

    const project2Tile = screen.getByTestId('project-tile-2')
    const project2Container = project2Tile.parentElement

    // Hover over project 2
    expect(project2Container).toBeDefined()
    fireEvent.mouseEnter(project2Container as Element)
    expect(project2Tile).toHaveAttribute('data-large', 'true')

    // Mouse leave should keep it selected
    fireEvent.mouseLeave(project2Container as Element)
    expect(project2Tile).toHaveAttribute('data-large', 'true')
  })

  it('handles other project selection on hover', () => {
    render(<ProjectGrid />)

    const project3Tile = screen.getByTestId('project-tile-3')
    const project3Container = project3Tile.parentElement

    // Hover over project 3
    expect(project3Container).toBeDefined()
    fireEvent.mouseEnter(project3Container as Element)
    expect(project3Tile).toHaveAttribute('data-large', 'true')

    // Mouse leave should keep it selected
    fireEvent.mouseLeave(project3Container as Element)
    expect(project3Tile).toHaveAttribute('data-large', 'true')
  })

  it('handles project tile clicks', () => {
    render(<ProjectGrid />)

    const project2Tile = screen.getByTestId('project-tile-2')

    // Click on project 2
    fireEvent.click(project2Tile)
    expect(project2Tile).toHaveAttribute('data-large', 'true')
  })

  it('detects mobile viewport', () => {
    // Set mobile width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600,
    })

    render(<ProjectGrid />)

    // Trigger resize event
    fireEvent.resize(window)

    // On mobile, all tiles should be large
    const project1Tile = screen.getByTestId('project-tile-1')
    expect(project1Tile).toHaveAttribute('data-large', 'true')
  })

  it('handles window resize events', () => {
    render(<ProjectGrid />)

    // Change to mobile width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })

    fireEvent.resize(window)

    // All tiles should now be large on mobile
    const allTiles = screen.getAllByTestId(/project-tile-/)
    for (const tile of allTiles) {
      expect(tile).toHaveAttribute('data-large', 'true')
    }
  })

  it('separates featured and non-featured projects correctly', () => {
    render(<ProjectGrid />)

    // Featured projects should be in the first grid
    expect(screen.getByText('Featured Project 1')).toBeInTheDocument()
    expect(screen.getByText('Featured Project 2')).toBeInTheDocument()

    // Other projects should be in the second grid
    expect(screen.getByText('Other Project 1')).toBeInTheDocument()
    expect(screen.getByText('Other Project 2')).toBeInTheDocument()
  })

  it('only shows sections when projects exist', () => {
    // This test assumes we have both featured and non-featured projects
    render(<ProjectGrid />)

    // Both sections should be visible since we have projects in both categories
    expect(screen.getByText('Featured Projects')).toBeInTheDocument()
    expect(screen.getByText('More Projects')).toBeInTheDocument()
  })

  it('maintains separate hover states for featured and other projects', () => {
    render(<ProjectGrid />)

    const featuredProject = screen.getByTestId('project-tile-1')
    const otherProject = screen.getByTestId('project-tile-3')
    const featuredContainer = featuredProject.parentElement
    const otherContainer = otherProject.parentElement

    // Hover over featured project
    expect(featuredContainer).toBeDefined()
    fireEvent.mouseEnter(featuredContainer as Element)
    expect(featuredProject).toHaveAttribute('data-large', 'true')

    // Hover over other project should not affect featured project state
    expect(otherContainer).toBeDefined()
    fireEvent.mouseEnter(otherContainer as Element)
    expect(otherProject).toHaveAttribute('data-large', 'true')

    // Both should maintain their states independently
    fireEvent.mouseLeave(featuredContainer as Element)
    fireEvent.mouseLeave(otherContainer as Element)
    expect(featuredProject).toHaveAttribute('data-large', 'true')
    expect(otherProject).toHaveAttribute('data-large', 'true')
  })
})

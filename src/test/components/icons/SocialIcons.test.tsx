import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/icons/SocialIcons'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('SocialIcons', () => {
  describe('GithubIcon', () => {
    it('renders with correct attributes', () => {
      render(<GithubIcon />)

      const icon = screen.getByRole('img')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('viewBox', '0 0 24 24')
      expect(icon).toHaveAttribute('fill', 'currentColor')
    })

    it('has correct accessibility attributes', () => {
      render(<GithubIcon />)

      const icon = screen.getByRole('img')
      expect(icon).toHaveAttribute('aria-labelledby', 'githubIconTitle')
      expect(screen.getByText('GitHub')).toBeInTheDocument()
    })

    it('accepts and applies custom props', () => {
      render(<GithubIcon className="custom-class" data-testid="github-icon" />)

      const icon = screen.getByTestId('github-icon')
      expect(icon).toHaveClass('custom-class')
    })

    it('renders the SVG path', () => {
      render(<GithubIcon />)

      const icon = screen.getByRole('img')
      const path = icon.querySelector('path')
      expect(path).toBeInTheDocument()
      expect(path).toHaveAttribute('d', expect.stringContaining('M12 0c-6.626'))
    })
  })

  describe('LinkedinIcon', () => {
    it('renders with correct attributes', () => {
      render(<LinkedinIcon />)

      const icon = screen.getByRole('img')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('viewBox', '0 0 24 24')
      expect(icon).toHaveAttribute('fill', 'currentColor')
    })

    it('has correct accessibility attributes', () => {
      render(<LinkedinIcon />)

      const icon = screen.getByRole('img')
      expect(icon).toHaveAttribute('aria-labelledby', 'linkedinIconTitle')
      expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    })

    it('accepts and applies custom props', () => {
      render(<LinkedinIcon className="custom-class" data-testid="linkedin-icon" />)

      const icon = screen.getByTestId('linkedin-icon')
      expect(icon).toHaveClass('custom-class')
    })

    it('renders the SVG path', () => {
      render(<LinkedinIcon />)

      const icon = screen.getByRole('img')
      const path = icon.querySelector('path')
      expect(path).toBeInTheDocument()
      expect(path).toHaveAttribute('d', expect.stringContaining('M20.447 20.452'))
    })
  })

  describe('TwitterIcon', () => {
    it('renders with correct attributes', () => {
      render(<TwitterIcon />)

      const icon = screen.getByRole('img')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('viewBox', '0 0 24 24')
      expect(icon).toHaveAttribute('fill', 'currentColor')
    })

    it('has correct accessibility attributes', () => {
      render(<TwitterIcon />)

      const icon = screen.getByRole('img')
      expect(icon).toHaveAttribute('aria-labelledby', 'twitterIconTitle')
      expect(screen.getByText('Twitter')).toBeInTheDocument()
    })

    it('accepts and applies custom props', () => {
      render(<TwitterIcon className="custom-class" data-testid="twitter-icon" />)

      const icon = screen.getByTestId('twitter-icon')
      expect(icon).toHaveClass('custom-class')
    })

    it('renders the SVG path', () => {
      render(<TwitterIcon />)

      const icon = screen.getByRole('img')
      const path = icon.querySelector('path')
      expect(path).toBeInTheDocument()
      expect(path).toHaveAttribute('d', expect.stringContaining('M18.244 2.25'))
    })
  })

  describe('All Icons', () => {
    it('all icons accept custom width and height', () => {
      render(
        <div>
          <GithubIcon width={32} height={32} data-testid="github" />
          <LinkedinIcon width={32} height={32} data-testid="linkedin" />
          <TwitterIcon width={32} height={32} data-testid="twitter" />
        </div>
      )

      expect(screen.getByTestId('github')).toHaveAttribute('width', '32')
      expect(screen.getByTestId('github')).toHaveAttribute('height', '32')
      expect(screen.getByTestId('linkedin')).toHaveAttribute('width', '32')
      expect(screen.getByTestId('linkedin')).toHaveAttribute('height', '32')
      expect(screen.getByTestId('twitter')).toHaveAttribute('width', '32')
      expect(screen.getByTestId('twitter')).toHaveAttribute('height', '32')
    })

    it('all icons support custom fill colors', () => {
      render(
        <div>
          <GithubIcon fill="red" data-testid="github" />
          <LinkedinIcon fill="blue" data-testid="linkedin" />
          <TwitterIcon fill="green" data-testid="twitter" />
        </div>
      )

      expect(screen.getByTestId('github')).toHaveAttribute('fill', 'red')
      expect(screen.getByTestId('linkedin')).toHaveAttribute('fill', 'blue')
      expect(screen.getByTestId('twitter')).toHaveAttribute('fill', 'green')
    })

    it('all icons have unique title IDs', () => {
      render(
        <div>
          <GithubIcon />
          <LinkedinIcon />
          <TwitterIcon />
        </div>
      )

      expect(screen.getByText('GitHub')).toHaveAttribute('id', 'githubIconTitle')
      expect(screen.getByText('LinkedIn')).toHaveAttribute('id', 'linkedinIconTitle')
      expect(screen.getByText('Twitter')).toHaveAttribute('id', 'twitterIconTitle')
    })
  })
})

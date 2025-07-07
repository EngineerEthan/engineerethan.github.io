import App from '@/App'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('App', () => {
  it('renders hero section', () => {
    render(<App />)
    expect(screen.getByText('Hi.')).toBeInTheDocument()
    expect(screen.getByText('👋')).toBeInTheDocument()
  })

  it('renders navigation', () => {
    render(<App />)
    expect(screen.getByText('Ethan')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})

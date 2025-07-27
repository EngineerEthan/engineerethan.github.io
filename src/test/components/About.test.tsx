import About from '@/components/About'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('About', () => {
  it('renders about section heading', () => {
    render(<About />)

    expect(screen.getByText('About Me')).toBeInTheDocument()
    expect(
      screen.getByText(
        `I love to help people. Technology transforms the world for the better, when we aren't using it to destroy ourselves.`
      )
    ).toBeInTheDocument()
  })

  it('renders journey section', () => {
    render(<About />)

    expect(screen.getByText('My Journey')).toBeInTheDocument()
    expect(
      screen.getByText(
        'As a tinkerer at heart, I have built my career on moving quickly & being flexible. I have a natural intuition for understanding people and creating environments where everyone can do what they do best.'
      )
    ).toBeInTheDocument()
  })

  it('renders career history', () => {
    render(<About />)

    expect(screen.getByText('Career History:')).toBeInTheDocument()
    expect(screen.getByText('BitcoinIRA (2024-present)')).toBeInTheDocument()
    expect(screen.getByText('Choice: Bitcoin in your IRA (2021-2024)')).toBeInTheDocument()
    expect(screen.getByText('Syngenta Digital (2017-2021)')).toBeInTheDocument()
    expect(screen.getByText('Side Businesses')).toBeInTheDocument()
  })

  it('renders skills section', () => {
    render(<About />)

    expect(screen.getByText('Technologies I Work With')).toBeInTheDocument()

    // Check skill categories
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByText('Cloud')).toBeInTheDocument()
    expect(screen.getByText('Data & Caching')).toBeInTheDocument()

    // Check some technologies
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('AWS Lambda')).toBeInTheDocument()
    expect(screen.getByText('Kafka')).toBeInTheDocument()
  })

  it('renders values section', () => {
    render(<About />)

    expect(screen.getByText('What I Value')).toBeInTheDocument()

    expect(screen.getByText('Practical Minimalism')).toBeInTheDocument()
    expect(screen.getByText('Clean Code')).toBeInTheDocument()
    expect(screen.getByText('Performance & UX')).toBeInTheDocument()
    expect(screen.getByText('Innovation')).toBeInTheDocument()
    expect(screen.getByText('The Right People')).toBeInTheDocument()
  })

  it('renders value descriptions', () => {
    render(<About />)

    expect(
      screen.getByText(
        'Perfection is the enemy of excellence. "Good" & shipped is better than "great" & behind schedule. Good intentions won\'t bring back missed opportunities. (YAGNI)'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "Code must be readable and intentionally organized. It doesn't matter how fast we build things if we can't maintain them."
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "Apps must be genuinely pleasant to use. There's no replacement for word-of-mouth recommendations and long-term loyalty."
      )
    ).toBeInTheDocument()
  })

  it('renders specific career achievements', () => {
    render(<About />)

    expect(
      screen.getByText(/Currently re-architecting crypto pricing engine in C#/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Led team to migrate from licensed on-prem to cloud/)
    ).toBeInTheDocument()
    expect(screen.getByText(/Tech Lead for rewrite of ETL project/)).toBeInTheDocument()
    expect(
      screen.getByText(/Cofounded startup and built children's EyeSpy mobile game/)
    ).toBeInTheDocument()
  })

  it('renders all frontend technologies', () => {
    render(<About />)

    const frontendTechs = ['React', 'Flutter', 'TypeScript', 'Tailwind CSS', 'Angular']
    for (const tech of frontendTechs) {
      expect(screen.getByText(tech)).toBeInTheDocument()
    }
  })

  it('renders all backend technologies', () => {
    render(<About />)

    const backendTechs = ['Node.js', 'C# .NET', 'PostgreSQL', 'DynamoDB', 'Go']
    for (const tech of backendTechs) {
      expect(screen.getByText(tech)).toBeInTheDocument()
    }
  })

  it('renders all cloud technologies', () => {
    render(<About />)

    const cloudTechs = ['AWS Lambda', 'Azure Functions', 'AWS CDK', 'Terraform', 'Docker']
    for (const tech of cloudTechs) {
      expect(screen.getByText(tech)).toBeInTheDocument()
    }
  })

  it('renders all data and caching technologies', () => {
    render(<About />)

    const dataTechs = ['Kafka', 'Redis', 'Scala', 'AWS DMS', 'Service Bus']
    for (const tech of dataTechs) {
      expect(screen.getByText(tech)).toBeInTheDocument()
    }
  })
})

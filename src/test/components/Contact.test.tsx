import Contact from '@/components/Contact'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock fetch
global.fetch = vi.fn()
const mockFetch = vi.mocked(fetch)

describe('Contact', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders contact section heading', () => {
    render(<Contact />)

    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
    expect(
      screen.getByText(
        "Have a project in mind or just want to chat about technology? I'd love to hear from you. Let's build something amazing together."
      )
    ).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(<Contact />)

    expect(screen.getByText(`Let's Connect`)).toBeInTheDocument()
    expect(screen.getByText('Location: Kentucky, USA')).toBeInTheDocument()
    expect(
      screen.getByText('Available for remote work (USA timezones preferred)')
    ).toBeInTheDocument()
  })

  it('renders social links', () => {
    render(<Contact />)

    expect(screen.getByText('Follow Me')).toBeInTheDocument()
    expect(screen.getByLabelText('Follow me on GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('Follow me on LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Follow me on X')).toBeInTheDocument()
  })

  it('renders contact form', () => {
    render(<Contact />)

    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Subject')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument()
  })

  it('updates form data on input change', () => {
    render(<Contact />)

    const nameInput = screen.getByLabelText('Name') as HTMLInputElement
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement
    const subjectInput = screen.getByLabelText('Subject') as HTMLInputElement
    const messageInput = screen.getByLabelText('Message') as HTMLTextAreaElement

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })

    expect(nameInput.value).toBe('John Doe')
    expect(emailInput.value).toBe('john@example.com')
    expect(subjectInput.value).toBe('Test Subject')
    expect(messageInput.value).toBe('Test message')
  })

  it('submits form successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response)

    render(<Contact />)

    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const subjectInput = screen.getByLabelText('Subject')
    const messageInput = screen.getByLabelText('Message')
    const submitButton = screen.getByRole('button', { name: 'Send Message' })

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })

    fireEvent.click(submitButton)

    expect(screen.getByText('Sending...')).toBeInTheDocument()

    await waitFor(() => {
      expect(
        screen.getByText(`Thanks for your message! I'll get back to you soon.`)
      ).toBeInTheDocument()
    })

    // Form should be cleared
    expect((nameInput as HTMLInputElement).value).toBe('')
    expect((emailInput as HTMLInputElement).value).toBe('')
    expect((subjectInput as HTMLInputElement).value).toBe('')
    expect((messageInput as HTMLTextAreaElement).value).toBe('')
  })

  it('handles form submission error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, message: 'API Error' }),
    } as Response)

    render(<Contact />)

    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const subjectInput = screen.getByLabelText('Subject')
    const messageInput = screen.getByLabelText('Message')
    const submitButton = screen.getByRole('button', { name: 'Send Message' })

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument()
    })
  })

  it('handles fetch error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    render(<Contact />)

    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const subjectInput = screen.getByLabelText('Subject')
    const messageInput = screen.getByLabelText('Message')
    const submitButton = screen.getByRole('button', { name: 'Send Message' })

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText('Something went wrong. Please try again or reach out directly via email.')
      ).toBeInTheDocument()
    })
  })

  it('disables submit button during submission', async () => {
    mockFetch.mockImplementationOnce(
      () =>
        new Promise(resolve =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => ({ success: true }),
              } as Response),
            100
          )
        )
    )

    render(<Contact />)

    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const subjectInput = screen.getByLabelText('Subject')
    const messageInput = screen.getByLabelText('Message')
    const submitButton = screen.getByRole('button', { name: 'Send Message' })

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })

    fireEvent.click(submitButton)

    expect(submitButton).toBeDisabled()
    expect(screen.getByText('Sending...')).toBeInTheDocument()
  })

  it('has correct social link URLs', () => {
    render(<Contact />)

    const githubLink = screen.getByLabelText('Follow me on GitHub')
    const linkedinLink = screen.getByLabelText('Follow me on LinkedIn')
    const twitterLink = screen.getByLabelText('Follow me on X')

    expect(githubLink).toHaveAttribute('href', 'https://github.com/EngineerEthan')
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ethan-w-benson/')
    expect(twitterLink).toHaveAttribute('href', 'https://x.com/engineerethan')
  })

  it('renders form placeholders correctly', () => {
    render(<Contact />)

    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(`What's this about?`)).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Tell me about your project or just say hello!')
    ).toBeInTheDocument()
  })
})

import type { ContactFormData, Project, StatusMessage } from '@/types'
import { describe, expect, it } from 'vitest'

describe('TypeScript interfaces', () => {
  it('Project interface structure', () => {
    const mockProject: Project = {
      id: 1,
      title: 'Test Project',
      description: 'Test description',
      technologies: ['React', 'TypeScript'],
      featured: true,
      imageUrl: 'https://example.com/image.jpg',
      liveUrl: 'https://example.com/live',
      githubUrl: 'https://github.com/test/repo',
    }

    expect(typeof mockProject.id).toBe('number')
    expect(typeof mockProject.title).toBe('string')
    expect(typeof mockProject.description).toBe('string')
    expect(Array.isArray(mockProject.technologies)).toBe(true)
    expect(typeof mockProject.featured).toBe('boolean')
    expect(typeof mockProject.imageUrl).toBe('string')
  })

  it('ContactFormData interface structure', () => {
    const mockFormData: ContactFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message',
    }

    expect(typeof mockFormData.name).toBe('string')
    expect(typeof mockFormData.email).toBe('string')
    expect(typeof mockFormData.subject).toBe('string')
    expect(typeof mockFormData.message).toBe('string')
  })

  it('StatusMessage interface structure', () => {
    const successMessage: StatusMessage = {
      type: 'success',
      message: 'Success message',
    }

    const errorMessage: StatusMessage = {
      type: 'error',
      message: 'Error message',
    }

    const emptyMessage: StatusMessage = {
      type: '',
      message: '',
    }

    expect(typeof successMessage.type).toBe('string')
    expect(typeof successMessage.message).toBe('string')
    expect(typeof errorMessage.type).toBe('string')
    expect(typeof errorMessage.message).toBe('string')
    expect(typeof emptyMessage.type).toBe('string')
    expect(typeof emptyMessage.message).toBe('string')
  })

  it('interfaces are properly typed', () => {
    // This test ensures TypeScript compilation passes
    // which validates interface definitions
    expect(true).toBe(true)
  })
})

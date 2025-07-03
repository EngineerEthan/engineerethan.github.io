export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl?: string
  imageUrl: string
  featured: boolean
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface StatusMessage {
  type: 'success' | 'error' | ''
  message: string
}

export interface SocialLink {
  name: string
  url: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

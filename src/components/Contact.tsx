import type { ContactFormData, StatusMessage } from '@/types'
import {
  CheckCircleIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import { type ChangeEvent, type FormEvent, memo, useState } from 'react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from './icons/SocialIcons'

interface SocialLink {
  name: string
  url: string
  icon: typeof GithubIcon
  color: string
}

const Contact = memo(() => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<StatusMessage>({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission - replace with actual form handling
    try {
      // This is where you'd integrate with a form service like Netlify Forms, Formspree, etc.
      await new Promise(resolve => setTimeout(resolve, 1000))

      setStatus({
        type: 'success',
        message: "Thanks for your message! I'll get back to you soon.",
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or reach out directly via email.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/EngineerEthan',
      icon: GithubIcon,
      color: 'hover:text-gray-300',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ethan-w-benson/',
      icon: LinkedinIcon,
      color: 'hover:text-blue-400',
    },
    {
      name: 'X',
      url: 'https://x.com/engineerethan',
      icon: TwitterIcon,
      color: 'hover:text-blue-300',
    },
  ]

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16 animate-teleport-in-1">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or just want to chat about technology? I'd love to hear from you.
            Let's build something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="animate-teleport-in-2">
            <h3 className="text-2xl font-bold text-white mb-8">Let's Connect</h3>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <MapPinIcon className="h-6 w-6 text-primary-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Location</h4>
                  <p className="text-gray-300">
                    Available for remote work (USA timezones preferred)
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map(social => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 ${social.color} transition-colors duration-200`}
                      aria-label={`Follow me on ${social.name}`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-teleport-in-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>

              {/* Status Message */}
              {status.message && (
                <div
                  className={`flex items-center space-x-2 p-4 rounded-lg ${
                    status.type === 'success'
                      ? 'bg-green-900/30 text-green-300 border border-green-700/50'
                      : 'bg-red-900/30 text-red-300 border border-red-700/50'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircleIcon className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0" />
                  )}
                  <span className="text-sm">{status.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-800 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
})

Contact.displayName = 'Contact'

export default Contact

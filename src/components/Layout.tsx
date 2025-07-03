import { memo } from 'react'
import { RocketLaunchIcon } from '@heroicons/react/24/solid'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = memo<LayoutProps>(({ children }) => {
  return (
    <div className="bg-dots-lighter relative flex min-h-screen flex-col bg-gray-900 bg-center text-white antialiased">
      <header className="relative z-10">
        <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
          <div className="flex w-full items-center justify-between border-b border-gray-800 py-6">
            <div className="flex items-center">
              <a href="#home" className="flex items-center space-x-2">
                <div className="rounded-full bg-primary-800/20 p-2">
                  <RocketLaunchIcon className="h-8 w-8 text-primary-400" />
                </div>
                <span className="text-xl font-bold text-white">Ethan</span>
              </a>
            </div>
            <div className="hidden space-x-8 md:flex">
              <a href="#home" className="text-white hover:text-primary-400 transition-colors duration-200">
                Home
              </a>
              <a href="#projects" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                Projects
              </a>
              <a href="#about" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                About
              </a>
              <a href="#contact" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                Contact
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="relative z-10 border-t border-gray-800 py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center text-sm text-gray-400">
            <p>&copy; 2025 Ethan. Built with React & Vite. Portfolio v2.0</p>
          </div>
        </div>
      </footer>
    </div>
  )
})

Layout.displayName = 'Layout'

export default Layout

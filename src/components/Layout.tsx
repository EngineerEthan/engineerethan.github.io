import { useFeatureFlags } from '@/hooks/useFeatureFlags'
import { usePageTransition } from '@/hooks/usePageTransition'
import { RocketLaunchIcon } from '@heroicons/react/24/solid'
import { memo, useEffect } from 'react'
import TransitionOverlay from './TransitionOverlay'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = memo<LayoutProps>(({ children }) => {
  const { showProjects } = useFeatureFlags()
  const { isTransitioning, transitionStage, navigateToSection } = usePageTransition()

  useEffect(() => {
    const handleHashClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const sectionId = target.getAttribute('href')?.substring(1)
        if (sectionId) {
          navigateToSection(sectionId)
        }
      }
    }

    document.addEventListener('click', handleHashClick)
    return () => document.removeEventListener('click', handleHashClick)
  }, [navigateToSection])

  return (
    <div className="bg-dots-lighter relative flex min-h-screen flex-col bg-gray-900 bg-center text-white antialiased">
      <TransitionOverlay isTransitioning={isTransitioning} transitionStage={transitionStage} />

      <header className="sticky top-0 z-20 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
          <div className="flex w-full items-center justify-between py-6">
            <div className="flex items-center">
              <a href="#home" className="flex items-center space-x-2">
                <div className="rounded-full bg-primary-800/20 p-2">
                  <RocketLaunchIcon className="h-8 w-8 text-primary-400" />
                </div>
                <span className="text-xl font-bold text-white">Ethan</span>
              </a>
              {isTransitioning && (
                <div className="ml-4 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
                  <span className="text-xs text-primary-400 animate-pulse">Transitioning...</span>
                </div>
              )}
            </div>
            <div className="hidden space-x-8 md:flex">
              <a
                href="#home"
                className="text-white hover:text-primary-400 transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-primary-400 transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                About
              </a>
              {showProjects && (
                <a
                  href="#projects"
                  className="text-gray-300 hover:text-primary-400 transition-all duration-200 hover:scale-105 cursor-pointer"
                >
                  Projects
                </a>
              )}
              <a
                href="#contact"
                className="text-gray-300 hover:text-primary-400 transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                Contact
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="relative z-10 border-t border-gray-800 py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center text-sm text-gray-400">
            <p>&copy; 2025 Ethan. Built with React & Vite.</p>
          </div>
        </div>
      </footer>
    </div>
  )
})

Layout.displayName = 'Layout'

export default Layout

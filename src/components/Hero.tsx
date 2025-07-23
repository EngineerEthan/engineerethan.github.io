import { useFeatureFlags } from '@/hooks/useFeatureFlags'
import { usePageTransition } from '@/hooks/usePageTransition'
import { useVisitorStatus } from '@/hooks/useVisitorStatus'
import { RocketLaunchIcon } from '@heroicons/react/24/solid'
import { memo, useEffect } from 'react'

const Hero = memo(() => {
  const isReturningVisitor = useVisitorStatus()
  const { showProjects, showContactButtons } = useFeatureFlags()
  const { navigateToSection } = usePageTransition()

  useEffect(() => {
    const handleCTAClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const sectionId = target.getAttribute('href')?.substring(1)
        if (sectionId) {
          navigateToSection(sectionId)
        }
      }
    }

    document.addEventListener('click', handleCTAClick)
    return () => document.removeEventListener('click', handleCTAClick)
  }, [navigateToSection])

  return (
    <section id="home" className="relative">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-24 lg:px-8 lg:py-32">
        <div className="animate-teleport-in-1 rounded-full bg-primary-800/20 p-6 mb-8 relative">
          <RocketLaunchIcon className="h-20 w-20 text-primary-400 animate-bounce-subtle relative z-0" />
          {/* Rocket flame effect */}
          <div className="absolute bottom-5 left-9 z-10 animate-bounce-subtle">
            <div className="flame-flicker w-6 h-8 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full blur-sm opacity-80" />
            <div className="flame-flicker-2 w-4 h-6 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-full blur-sm opacity-70 absolute top-1 left-1/2 transform -translate-x-1/2" />
            <div className="flame-flicker-3 w-2 h-4 bg-gradient-to-t from-red-400 via-orange-300 to-yellow-200 rounded-full blur-sm opacity-60 absolute top-2 left-1/2 transform -translate-x-1/2" />
          </div>
        </div>

        <div className="text-center animate-teleport-in-2">
          <h1
            className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-6 w-full"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Hi. <span className="inline-block origin-bottom animate-wave">👋</span>
          </h1>

          <p className="text-xl text-gray-300 mb-4 w-full animate-teleport-in-3">
            {isReturningVisitor ? "It's good to see you again." : 'Nice to meet you.'}
          </p>

          <hr className="border-gray-600 mb-8 max-w-md mx-auto animate-teleport-in-3" />

          <div className="text-center mb-8 max-w-3xl w-full animate-teleport-in-4">
            <p className="text-xl text-gray-300 mb-2">
              <span className="font-semibold text-primary-400">Technologist</span>{' '}
              <span className="text-gray-500">/tekˈnäləjəst/</span>
            </p>
            <p className="text-sm text-gray-400 italic">
              A person who works across multiple technological domains, applying diverse technical
              knowledge to solve complex, interdisciplinary problems.
            </p>
          </div>

          <p className="text-lg text-gray-400 mb-8 max-w-3xl w-full animate-teleport-in-4">
            This is the age of the technologist.
          </p>

          <p className="text-lg text-gray-400 mb-8 max-w-3xl w-full animate-teleport-in-4">
            We thrive in ambiguity, controlling the chaos to transform high-stakes ideas into
            simple, actionable products. Check out what I've been up to lately.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full animate-teleport-in-5">
            {showProjects && (
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer"
              >
                View My Work
              </a>
            )}
            {showContactButtons && (
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 text-base font-medium rounded-lg text-gray-300 bg-transparent hover:bg-gray-800 hover:border-gray-500 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer"
              >
                Get In Touch
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
})

Hero.displayName = 'Hero'

export default Hero

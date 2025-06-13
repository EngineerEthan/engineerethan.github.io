import { memo } from 'react'
import { RocketLaunchIcon } from '@heroicons/react/24/solid'
import { useVisitorStatus } from '@/hooks/useVisitorStatus'

const Hero = memo(() => {
  const isReturningVisitor = useVisitorStatus()

  return (
    <section id="home" className="relative">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-24 lg:px-8 lg:py-32">
        <div className="animate-fade-in rounded-full bg-primary-800/20 p-6 mb-8">
          <RocketLaunchIcon className="h-20 w-20 text-primary-400 animate-bounce-subtle" />
        </div>

        <div className="text-center animate-slide-up">
          <h1
            className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Hello World
          </h1>

          <p className="text-xl text-gray-300 mb-4 max-w-2xl">
            {isReturningVisitor 
              ? "Welcome back! It's great to see you again." 
              : "Nice to meet you! Welcome to my digital space."
            }
          </p>

          <p className="text-lg text-gray-400 mb-8 max-w-3xl">
            I'm a passionate software engineer who loves building innovative solutions 
            and bringing ideas to life through code. Explore my projects and see what I've been working on.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 text-base font-medium rounded-lg text-gray-300 bg-transparent hover:bg-gray-800 hover:border-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
})

Hero.displayName = 'Hero'

export default Hero

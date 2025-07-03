import {
  CodeBracketIcon,
  HeartIcon,
  LightBulbIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline'
import { memo } from 'react'

const About = memo(() => {
  const skills = [
    {
      category: 'Frontend',
      technologies: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    },
    {
      category: 'Backend',
      technologies: ['Node.js', 'Python', 'Express', 'FastAPI', 'PostgreSQL'],
    },
    { category: 'Tools & Other', technologies: ['Git', 'Docker', 'AWS', 'Vite', 'Jest'] },
  ]

  const values = [
    {
      icon: CodeBracketIcon,
      title: 'Clean Code',
      description: 'I believe in writing maintainable, readable code that stands the test of time.',
    },
    {
      icon: RocketLaunchIcon,
      title: 'Performance',
      description: 'Building fast, efficient applications that provide excellent user experiences.',
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation',
      description: 'Always exploring new technologies and finding creative solutions to problems.',
    },
    {
      icon: HeartIcon,
      title: 'User-Centric',
      description: 'Putting user needs first and creating intuitive, accessible interfaces.',
    },
  ]

  return (
    <section id="about" className="relative py-24 bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16 animate-teleport-in-1">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">About Me</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            I'm a passionate software engineer with a love for creating digital experiences that
            make a difference. Here's a bit more about what drives me and what I work with.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* About Text */}
          <div className="animate-teleport-in-2">
            <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-4">
                I've been fascinated by technology and problem-solving since I was young. What
                started as curiosity about how websites work has evolved into a career focused on
                building meaningful software solutions.
              </p>
              <p className="text-gray-300 mb-4">
                I enjoy the entire development process - from understanding user needs and designing
                elegant solutions to implementing robust code and optimizing performance. There's
                something magical about turning ideas into working software.
              </p>
              <p className="text-gray-300">
                When I'm not coding, you can find me exploring new technologies, contributing to
                open source projects, or sharing knowledge with the developer community.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="animate-teleport-in-3">
            <h3 className="text-2xl font-bold text-white mb-6">Technologies I Work With</h3>
            <div className="space-y-6">
              {skills.map(skillGroup => (
                <div key={skillGroup.category}>
                  <h4 className="text-lg font-semibold text-primary-400 mb-3">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.technologies.map(tech => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="animate-teleport-in-4">
          <h3 className="text-2xl font-bold text-white text-center mb-12">What I Value</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(value => {
              const IconComponent = value.icon
              return (
                <div
                  key={value.title}
                  className="text-center group hover:bg-gray-800/50 p-6 rounded-xl transition-all duration-300"
                >
                  <div className="mx-auto h-12 w-12 text-primary-400 mb-4 group-hover:text-accent-400 transition-colors duration-300">
                    <IconComponent />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{value.title}</h4>
                  <p className="text-gray-300 text-sm">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
})

About.displayName = 'About'

export default About

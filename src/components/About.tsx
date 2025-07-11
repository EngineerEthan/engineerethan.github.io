import {
  CodeBracketIcon,
  HeartIcon,
  LightBulbIcon,
  ClockIcon,
  CubeIcon,
  CogIcon,
  UserGroupIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline'
import { memo } from 'react'

interface SkillGroup {
  category: string
  technologies: string[]
}

interface Value {
  icon: typeof CodeBracketIcon
  title: string
  description: string
}

const About = memo(() => {
  const skills: SkillGroup[] = [
    { category: 'Frontend', technologies: ['React', 'Flutter', 'TypeScript', 'Tailwind CSS', 'Angular'] },
    { category: 'Backend', technologies: ['Node.js', 'C# .NET', 'PostgreSQL', 'DynamoDB', 'Golang'] },
    { category: 'Cloud', technologies: ['AWS', 'Azure', 'AWS CDK', 'Hashicorp Terraform', 'Azure DevOps'] },
    { category: 'Tools & Other', technologies: ['VS Code & VS 2022', 'Docker', 'Claude Code', 'Cursor', 'GitHub Copilot'] },
  ]

  const values: Value[] = [
    {
      icon: ClockIcon,
      title: 'Pragmatic Efficiency',
      description: `Perfection is the enemy of excellence. "Good" & shipped is better than "great" & behind schedule. Good intentions won't bring back missed opportunities.`,
    },
    {
      icon: CubeIcon,
      title: 'Practical Minimalism',
      description: `Stay light on your feet; decisive agility is how you win. Prefer minimalism, and only add bureaucracy when it increases quality or velocity.`,
    },
    {
      icon: CodeBracketIcon,
      title: 'Clean Code',
      description: `Code must be readable and intentionally organized. It doesn't matter how fast we build things if we can't maintain them.`,
    },
    {
      icon: CogIcon,
      title: 'Automation',
      description: 'Everyone has access to a robot army right at their fingertips. Use it. Basic DevOps automation and AI coding is an essential skillset for all engineers.',
    },
    {
      icon: RocketLaunchIcon,
      title: 'Performance & UX',
      description: `Apps must be genuinely pleasant to use. There's no replacement for word-of-mouth recommendations and long-term loyalty.`,
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation',
      description: `Explore unconventional solutions to niche problems. If "the way things are done" don't work, then let's change "the way things are done".`,
    },
    {
      icon: HeartIcon,
      title: 'User-Centric',
      description: `Everything we do must serve our users. Always design an intuitive, accessible UX. Only release things you're proud of.`,
    },
    {
      icon: UserGroupIcon,
      title: 'The Right People',
      description: 'Hire driven, skilled, stable producers that you can trust. There is no room for anyone else.',
    },
  ]

  return (
    <section id="about" className="relative py-24 bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16 animate-teleport-in-1">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">About Me</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            I'm a driven & ambitious software engineer who loves to help people. Technology transforms the 
            world for the better, when we aren't using it to destroy ourselves.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* About Text */}
          <div className="animate-teleport-in-2">
            <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-4">
                As a tinkerer at heart, I spent most of my childhood taking things apart to see how they worked. 
                When I got my first computer things were no different; I eventually fried the motherboard by force-overclocking a chip that wasn't designed for it.  
                I'm always curious and dabbling in new things, so I drifted through several majors in college before finally settling on software engineering. 
              </p>
              <p className="text-gray-300 mb-4">
                As a professional, I have built my career on moving quickly & being flexible. 
                I enjoy the entire development process - from understanding user needs and 
                designing elegant solutions to implementing robust code and optimizing performance. 
                There's something magical & addicting about interpreting ideas into working software. 
              </p>
              <p className="text-gray-300">
                When I'm not coding, you can find me spending time with my family, exploring new technologies (mostly via private side projects), dabbling in outdoor hobbies, reading, listening to podcasts, or planning "life".   
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
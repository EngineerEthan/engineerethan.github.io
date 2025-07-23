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
    { category: 'Backend', technologies: ['Node.js', 'C# .NET', 'PostgreSQL', 'DynamoDB', 'Go'] },
    { category: 'Cloud', technologies: ['AWS Lambda', 'Azure Functions', 'AWS CDK', 'Terraform', 'Docker'] },
    { category: 'Data & Caching', technologies: ['Kafka', 'Redis', 'Scala', 'AWS DMS', 'Service Bus'] },
  ]

  const values: Value[] = [
    {
      icon: ClockIcon,
      title: 'Practical Minimalism',
      description: `Perfection is the enemy of excellence. "Good" & shipped is better than "great" & behind schedule. Good intentions won't bring back missed opportunities.`,
    },
    {
      icon: CodeBracketIcon,
      title: 'Clean Code',
      description: `Code must be readable and intentionally organized. It doesn't matter how fast we build things if we can't maintain them.`,
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
                As a tinkerer at heart, I have built my career on moving quickly & being flexible. I have a natural intuition for understanding people and creating environments where everyone can lean into what they do best while growing in areas that matter.
              </p>
              <p className="text-gray-300 mb-4">Career History:</p>
              <ul className="list-disc text-gray-300 mb-4 ml-4 space-y-4">
                <li className="pl-2">
                  <span className="font-semibold">Syngenta Digital (2017-2021)</span>
                  <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li>
                      Promoted to Tech Lead of off-track massive nationwide ETL project. Rapidly upskilled in Scala/Kafka and delivered within 6 months, processing over $1B in revenue.
                    </li>
                  </ul>
                </li>
                <li className="pl-2">
                  <span className="font-semibold">Choice: Bitcoin in your IRA (2021-2024)</span>
                  <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li>
                      Led team to migrate all data and services from licensed on-prem to cloud and open source, saving ~70% in infrastructure costs using AWS DMS, Fargate, and CDK.
                    </li>
                    <li>
                      Key role in architecting cloud-native crypto platform with Lambda/DynamoDB handling millions of transactions with sub-850ms latency.
                    </li>
                    <li>
                      Learned Flutter and became primary mobile developer for app with 100K+ downloads and 4.8-star rating.
                    </li>
                  </ul>
                </li>
                <li className="pl-2">
                  <span className="font-semibold">BitcoinIRA (2024-present)</span>
                  <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li>
                      Re-architecting crypto pricing engine in C# with Redis caching for massive scale and 99.99% uptime.
                    </li>
                    <li>
                      Migrated legacy Salesforce CRM to HubSpot using Azure Functions and Service Bus, transforming sales operations.
                    </li>
                  </ul>
                </li>
                <li className="pl-2">
                  <span className="font-semibold">Side Businesses</span>
                  <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li>
                      Cofounded startup and built children's EyeSpy mobile game in Flutter with 3,000+ downloads.
                    </li>
                    <li>
                      Cofounder of social networking platform for creatives using Go/React/DynamoDB (stealth mode 👻).
                    </li>
                  </ul>
                </li>
              </ul>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map(value => {
              const IconComponent = value.icon
              return (
                <div
                  key={value.title}
                  className="text-center group hover:bg-gray-800/50 p-4 rounded-xl transition-all duration-300"
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
import { PROJECTS } from '../constants/data'
import ProjectTile from './ProjectTile'

function ProjectGrid() {
  const featuredProjects = PROJECTS.filter(project => project.featured)
  const otherProjects = PROJECTS.filter(project => !project.featured)

  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one represents a unique challenge 
            and an opportunity to learn something new.
          </p>
        </div>

        {/* Featured Projects Grid */}
        {featuredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {featuredProjects.map((project, index) => (
              <ProjectTile
                key={project.id}
                project={project}
                isLarge={index === 0} // Make first featured project larger
              />
            ))}
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-white mb-4">
                More Projects
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <ProjectTile
                  key={project.id}
                  project={project}
                  isLarge={false}
                />
              ))}
            </div>
          </>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-6">
            Interested in seeing more of my work?
          </p>
          <a
            href="https://github.com/EngineerEthan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-primary-600 text-base font-medium rounded-lg text-primary-400 bg-transparent hover:bg-primary-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

export default ProjectGrid

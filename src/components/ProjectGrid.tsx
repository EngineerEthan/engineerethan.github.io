import { memo, useMemo } from 'react'
import { PROJECTS } from '@/constants/data'
import ProjectTile from './ProjectTile'

const ProjectGrid = memo(() => {
  const { featuredProjects, otherProjects } = useMemo(() => {
    const featured = PROJECTS.filter(project => project.featured)
    const other = PROJECTS.filter(project => !project.featured)
    return { featuredProjects: featured, otherProjects: other }
  }, [])

  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Featured Projects (WIP)
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one represented a unique challenge 
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
      </div>
    </section>
  )
})

ProjectGrid.displayName = 'ProjectGrid'

export default ProjectGrid

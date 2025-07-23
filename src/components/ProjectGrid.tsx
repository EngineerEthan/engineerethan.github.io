import { PROJECTS } from '@/constants/data'
import { memo, useMemo, useState } from 'react'
import ProjectTile from './ProjectTile'

const ProjectGrid = memo(() => {
  const { featuredProjects, otherProjects } = useMemo(() => {
    const featured = PROJECTS.filter(project => project.featured)
    const other = PROJECTS.filter(project => !project.featured)
    return { featuredProjects: featured, otherProjects: other }
  }, [])

  const CHOICE_PROJECT_ID = 1
  const TODDLER_EYESPY_PROJECT_ID = 4

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(CHOICE_PROJECT_ID)
  const [selectedOtherProjectId, setSelectedOtherProjectId] = useState<number | null>(
    TODDLER_EYESPY_PROJECT_ID
  )

  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16 animate-teleport-in-1">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">Featured Projects</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Here are some of the production projects I've worked on professionally.
          </p>
        </div>

        {/* Featured Projects Grid */}
        {featuredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-teleport-in-2">
            {featuredProjects.map(project => (
              <ProjectTile
                key={project.id}
                project={project}
                isLarge={selectedProjectId === project.id}
                onTileClick={() => setSelectedProjectId(project.id)}
              />
            ))}
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div className="animate-teleport-in-3">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-white mb-4">More Projects</h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                These are other projects I've worked on and cofounded.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map(project => (
                <ProjectTile
                  key={project.id}
                  project={project}
                  isLarge={selectedOtherProjectId === project.id}
                  onTileClick={() => setSelectedOtherProjectId(project.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
})

ProjectGrid.displayName = 'ProjectGrid'

export default ProjectGrid

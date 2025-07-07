import type { Project } from '@/types'
import { classNames } from '@/utils/helpers'
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline'
import { memo, useCallback, useState } from 'react'

interface ProjectTileProps {
  project: Project
  isLarge?: boolean
}

const ProjectTile = memo<ProjectTileProps>(({ project, isLarge = false }) => {
  const [imageError, setImageError] = useState(false)

  const handleImageError = useCallback(() => {
    setImageError(true)
  }, [])

  const handleProjectClick = useCallback(() => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
    }
  }, [project.liveUrl])

  const handleGithubClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
    },
    [project.githubUrl]
  )

  const maxTechCount = isLarge ? 6 : 3
  const visibleTechs = project.technologies.slice(0, maxTechCount)
  const remainingTechCount = Math.max(0, project.technologies.length - maxTechCount)

  return (
    <button
      type="button"
      className={classNames(
        'group relative overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer w-full text-left',
        isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
      )}
      onClick={handleProjectClick}
      aria-label={`View ${project.title} project`}
    >
      {/* Background Image or Placeholder */}
      <div
        className={classNames(
          'absolute inset-0 bg-gradient-to-br from-primary-900/20 to-accent-900/20',
          isLarge ? 'h-96' : 'h-64'
        )}
      >
        {!imageError ? (
          <img
            src={project.imageUrl}
            alt={`${project.title} screenshot`}
            className="h-full w-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
            onError={handleImageError}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-700">
            <CodeBracketIcon className="h-16 w-16 text-gray-500" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative h-full p-6 flex flex-col justify-end">
        <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {project.featured && (
            <span className="inline-block px-2 py-1 text-xs font-medium text-accent-400 bg-accent-900/30 rounded-full mb-2">
              Featured
            </span>
          )}

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-200">
            {project.title}
          </h3>

          <p
            className={classNames(
              'text-gray-300 mb-4',
              isLarge ? 'text-base' : 'text-sm line-clamp-3'
            )}
          >
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1 mb-4">
            {visibleTechs.map(tech => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-medium text-primary-300 bg-primary-900/30 rounded"
              >
                {tech}
              </span>
            ))}
            {remainingTechCount > 0 && (
              <span className="px-2 py-1 text-xs font-medium text-gray-400 bg-gray-800/50 rounded">
                +{remainingTechCount} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.liveUrl && (
              <button
                type="button"
                onClick={handleProjectClick}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label={`View live demo of ${project.title}`}
              >
                <ArrowTopRightOnSquareIcon className="h-3 w-3" aria-hidden="true" />
                Live Demo
              </button>
            )}{' '}
            <button
              type="button"
              onClick={handleGithubClick}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              <CodeBracketIcon className="h-3 w-3" aria-hidden="true" />
              Code
            </button>
          </div>
        </div>{' '}
      </div>
    </button>
  )
})

ProjectTile.displayName = 'ProjectTile'

export default ProjectTile

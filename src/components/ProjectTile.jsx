import { useState } from 'react'
import { 
  ArrowTopRightOnSquareIcon, 
  CodeBracketIcon 
} from '@heroicons/react/24/outline'
import { classNames } from '../utils/helpers'

function ProjectTile({ project, isLarge = false }) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div 
      className={classNames(
        "group relative overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105",
        isLarge ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
      )}
    >
      {/* Background Image or Placeholder */}
      <div className={classNames(
        "absolute inset-0 bg-gradient-to-br from-primary-900/20 to-accent-900/20",
        isLarge ? "h-96" : "h-64"
      )}>
        {!imageError ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
            onError={handleImageError}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-700">
            <CodeBracketIcon className="h-16 w-16 text-gray-500" />
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
          
          <p className={classNames(
            "text-gray-300 mb-4",
            isLarge ? "text-base" : "text-sm"
          )}>
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.technologies.slice(0, isLarge ? 6 : 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-medium text-primary-300 bg-primary-900/30 rounded"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > (isLarge ? 6 : 3) && (
              <span className="px-2 py-1 text-xs font-medium text-gray-400 bg-gray-800/50 rounded">
                +{project.technologies.length - (isLarge ? 6 : 3)} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors duration-200"
                aria-label={`View ${project.title} live demo`}
              >
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
                aria-label={`View ${project.title} source code`}
              >
                <CodeBracketIcon className="h-4 w-4" />
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectTile

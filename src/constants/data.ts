import type { Project } from '@/types'

/**
 * Project portfolio data - replace with actual projects
 */
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce solution with React, Node.js, and real-time inventory management. Features include user authentication, payment processing, and admin dashboard.',
    technologies: ['React', 'Node.js', 'MongoDB', 'TailwindCSS', 'Stripe', 'JWT'],
    githubUrl: 'https://github.com/EngineerEthan/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.engineerethan.dev',
    imageUrl: '/projects/ecommerce-platform.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    technologies: ['React Native', 'Firebase', 'TypeScript', 'Redux Toolkit'],
    githubUrl: 'https://github.com/EngineerEthan/task-manager',
    liveUrl: 'https://tasks.engineerethan.dev',
    imageUrl: '/projects/task-manager.jpg',
    featured: true,
  },
  {
    id: 3,
    title: 'Data Visualization Dashboard',
    description:
      'An interactive analytics dashboard for visualizing complex datasets with charts, filters, and real-time data streaming.',
    technologies: ['Vue.js', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL'],
    githubUrl: 'https://github.com/EngineerEthan/data-dashboard',
    liveUrl: 'https://analytics.engineerethan.dev',
    imageUrl: '/projects/data-dashboard.jpg',
    featured: true,
  },
  {
    id: 4,
    title: 'Weather Forecast App',
    description:
      'A responsive weather application with location-based forecasts, interactive maps, and severe weather alerts.',
    technologies: ['React', 'OpenWeather API', 'Mapbox', 'PWA'],
    githubUrl: 'https://github.com/EngineerEthan/weather-app',
    liveUrl: 'https://weather.engineerethan.dev',
    imageUrl: '/projects/weather-app.jpg',
    featured: false,
  },
  {
    id: 5,
    title: 'Portfolio Website',
    description:
      'This very portfolio website built with modern React, showcasing responsive design and smooth animations.',
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'GitHub Pages'],
    githubUrl: 'https://github.com/EngineerEthan/portfolio',
    liveUrl: 'https://engineerethan.github.io',
    imageUrl: '/projects/portfolio.jpg',
    featured: false,
  },
  {
    id: 6,
    title: 'Chat Application',
    description:
      'Real-time chat application with private messaging, group chats, file sharing, and emoji reactions.',
    technologies: ['Socket.io', 'Express.js', 'React', 'MongoDB', 'JWT'],
    githubUrl: 'https://github.com/EngineerEthan/chat-app',
    imageUrl: '/projects/chat-app.jpg',
    featured: false,
  },
]

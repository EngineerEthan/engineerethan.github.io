import type { Project } from '@/types'

/**
 * Project portfolio data - Production projects and professional work
 */
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'BitcoinIRA Platform',
    description:
      'Developed async transaction processing system, migrated from Salesforce to HubSpot, and currently re-building pricing engine (99.99% uptime) for 10,000+ concurrent users',
    technologies: ['C#', 'Redis', 'Azure Functions', 'Service Bus', 'HubSpot'],
    githubUrl: '',
    liveUrl: 'https://bitcoinira.com/',
    imageUrl: '/projects/bitcoinira-platform.png',
    featured: true,
  },
  {
    id: 2,
    title: 'Choice: Bitcoin in your IRA',
    description:
      'Migrated and rebuilt on-prem pricing platform to cloud-native, saving 70% in infra costs to serve 250,000+ concurrent users with sub-850ms latency. Built and maintained mobile app features, including pricing alerts and deeplinks.',
    technologies: ['AWS Lambda', 'DynamoDB', 'AWS CDK', 'AWS DMS', 'Fargate', 'Flutter'],
    githubUrl: '',
    liveUrl: 'https://www.choiceapp.io/',
    imageUrl: '/projects/choice-platform.png',
    featured: true,
  },
  {
    id: 3,
    title: 'Syngenta CropWise Financials',
    description:
      'Tech Lead of nationwide ETL project for thousands of growers. Rapidly upskilled in ETL and delivered within 6 months, processing millions of records & over $1B in revenue.',
    technologies: ['Scala', 'AWS MSK', 'Terraform', 'AWS Lambda', 'Postgres'],
    githubUrl: '',
    liveUrl: 'https://www.cropwise.com/us/financials',
    imageUrl: '/projects/syngenta-cropwise.png',
    featured: true,
  },
  {
    id: 4,
    title: 'Toddler EyeSpy',
    description:
      'Cofounded startup to build mobile game with 3,000+ downloads before taking down from app stores. Used royalty-free music with donated artwork. Still have the app on my phone for a demo - just ask!',
    technologies: ['Flutter', 'Dart', 'Google Play', 'App Store'],
    githubUrl: '',
    liveUrl: '', // No longer on app store
    imageUrl: '/projects/eyespy-game.jpeg',
    featured: false,
  },
  {
    id: 5,
    title: 'Curated Social Platform',
    description: 'Cofounder of social networking platform for creatives. Details are secret for now. 🤫',
    technologies: ['Go', 'React', 'DynamoDB', 'AWS CDK', 'TypeScript'],
    githubUrl: '',
    liveUrl: 'https://dream.curated-app.com/',
    imageUrl: '/projects/curated-platform.png',
    featured: false,
  },
]

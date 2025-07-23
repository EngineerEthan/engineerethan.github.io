import type { Project } from '@/types'

/**
 * Project portfolio data - Production projects and professional work
 */
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Choice: Bitcoin in your IRA',
    description:
      'Migrated crypto pricing + trading platform from licensed on-prem infrastructure to cloud-native architecture, saving 70% in infrastructure costs. Built for massive scale with sub-850ms latency. Architected and built critical frontend features for both web and mobile experiences.',
    technologies: ['AWS Lambda', 'DynamoDB', 'AWS CDK', 'AWS DMS', 'Fargate', 'Flutter'],
    githubUrl: '',
    liveUrl: 'https://www.choiceapp.io/',
    imageUrl: '/projects/choice-platform.png',
    featured: true,
  },
  {
    id: 2,
    title: 'BitcoinIRA Platform',
    description:
      'Re-architecting pricing engine for high scale and 99.99% uptime. Migrated legacy Salesforce CRM integration to HubSpot, transforming sales operations.',
    technologies: ['C#', 'Redis', 'Azure Functions', 'Service Bus', 'HubSpot'],
    githubUrl: '',
    liveUrl: 'https://bitcoinira.com/',
    imageUrl: '/projects/bitcoinira-platform.png',
    featured: true,
  },
  {
    id: 3,
    title: 'Syngenta CropWise Financials',
    description:
      'Tech Lead of massive nationwide ETL project. Rapidly upskilled in ETL and delivered within 6 months, processing over $1B in revenue.',
    technologies: ['Scala', 'Kafka', 'AWS MSK', 'Debezium', 'AWS Lambda'],
    githubUrl: '',
    liveUrl: 'https://www.cropwise.com/us/financials',
    imageUrl: '/projects/syngenta-cropwise.png',
    featured: true,
  },
  {
    id: 4,
    title: 'Toddler EyeSpy',
    description:
      'Cofounded startup to build Toddler EyeSpy mobile game with 3,000+ downloads before we took it down from the app stores. Used royalty-free music with donated artwork. A fun project that taught valuable mobile development and deployment skills. Still have the app on my phone for a demo - just ask!',
    technologies: ['Flutter', 'Dart', 'Google Play', 'App Store'],
    githubUrl: '',
    liveUrl: '', // No longer on app store
    imageUrl: '/projects/eyespy-game.jpeg',
    featured: false,
  },
  {
    id: 5,
    title: 'Curated Social Platform',
    description: 'Cofounder of social networking platform for creatives.',
    technologies: ['Go', 'React', 'DynamoDB', 'AWS CDK', 'TypeScript'],
    githubUrl: '',
    liveUrl: 'https://dream.curated-app.com/',
    imageUrl: '/projects/curated-platform.png',
    featured: false,
  },
]

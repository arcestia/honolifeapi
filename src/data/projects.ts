import type { Project } from '../types/projects'

const projects: Project[] = [
  {
    id: 'personal-api',
    name: 'Personal API',
    description: 'RESTful API for personal portfolio and information',
    shortDescription: 'Personal API built with Hono and TypeScript',
    longDescription: 'A comprehensive API built with Hono and TypeScript, deployed on Cloudflare Workers. Features include profile information, blog integration, and Spotify data.',
    tech: {
      languages: ['TypeScript'],
      frameworks: ['Hono'],
      tools: [],
      platforms: ['Cloudflare Workers']
    },
    year: 2023,
    startDate: '2023-12',
    github: 'https://github.com/yourusername/personal-api',
    status: 'in-progress',
    category: 'api',
    featured: true,
    highlights: [
      'Built with Hono framework for optimal performance',
      'Deployed on Cloudflare Workers for global edge distribution',
      'RESTful API design with comprehensive documentation',
      'Implements best practices for API security and CORS'
    ]
  },
  {
    id: 'honolifeapi',
    name: 'Hono Life API',
    description: 'A comprehensive personal API built with Hono framework for Cloudflare Workers, showcasing professional experience, skills, and projects.',
    shortDescription: 'Personal API built with Hono',
    tech: {
      languages: ['TypeScript'],
      frameworks: ['Hono'],
      tools: ['Wrangler'],
      platforms: ['Cloudflare Workers']
    },
    year: 2024,
    startDate: '2024-12-23',
    github: 'https://github.com/yourusername/honolifeapi',
    status: 'completed',
    category: 'api',
    role: 'Solo Developer',
    team: {
      size: 1,
      role: 'Full Stack Developer'
    },
    highlights: [
      'Built with Hono framework for optimal performance',
      'Deployed on Cloudflare Workers for global edge distribution',
      'RESTful API design with comprehensive documentation',
      'Implements best practices for API security and CORS'
    ]
  },
  // Add more projects here
]

export default projects

import { Hono } from 'hono'
import profile from '../data/profile'

const app = new Hono()

// Root endpoint - returns API overview and basic profile info
app.get('/', (c) => {
  const baseUrl = new URL(c.req.url).origin
  
  return c.json({
    name: profile.name,
    role: profile.role,
    currentStatus: profile.currentStatus,
    endpoints: {
      profile: {
        base: `${baseUrl}/profile`,
        endpoints: {
          '/': 'Basic profile information',
          '/location': 'Current location information',
          '/languages': 'Known languages',
          '/activities': 'Current activities',
          '/links': 'Social and professional links',
          '/experience': 'Work experience history',
          '/education': 'Education history',
          '/interests': 'Personal interests',
          '/jobs': 'Current job positions'
        }
      },
      skills: {
        base: `${baseUrl}/skills`,
        endpoints: {
          '/': 'All skills by category',
          '/:category': 'Skills in specific category'
        }
      },
      projects: {
        base: `${baseUrl}/projects`,
        endpoints: {
          '/': 'All projects with featured flag',
          '/featured': 'Featured projects',
          '/status/:status': 'Projects by status (completed, in-progress, planned)'
        }
      },
      blog: {
        base: `${baseUrl}/blog`,
        endpoints: {
          '/': 'Latest blog posts (limited to 5)',
          '/all': 'All blog posts with pagination',
          '/search': 'Search blog posts by query'
        }
      },
      spotify: {
        base: `${baseUrl}/spotify`,
        endpoints: {
          '/now-playing': 'Currently playing track (detailed)',
          '/now': 'Currently playing track (shields.io format)',
          '/history': 'Recently played tracks',
          '/top/tracks': 'Top tracks',
          '/top/artists': 'Top artists'
        }
      },
      docs: {
        base: `${baseUrl}/docs`,
        description: 'Interactive API documentation'
      }
    }
  })
})

export default app

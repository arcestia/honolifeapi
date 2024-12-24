import { Hono } from 'hono'
import type { Project } from '../../types/projects'
import projects from '../../data/projects'

const app = new Hono()

// Get all projects
app.get('/', (c) => {
  const featured = projects.filter(p => p.featured)
  return c.json({
    projects,
    featured,
    total: projects.length,
    featuredCount: featured.length
  })
})

// Get featured projects
app.get('/featured', (c) => {
  const featured = projects.filter(p => p.featured)
  return c.json({
    projects: featured,
    total: featured.length
  })
})

// Get project by status
app.get('/status/:status', (c) => {
  const status = c.req.param('status') as 'completed' | 'in-progress' | 'planned'
  const filteredProjects = projects.filter(p => p.status === status)
  return c.json({
    projects: filteredProjects,
    total: filteredProjects.length
  })
})

export default app

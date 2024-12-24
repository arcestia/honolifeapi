import { Hono } from 'hono'
import { BlogService } from '../../services/blog'
import type { BlogPost } from '../../types/blog'

const app = new Hono()
const blogService = new BlogService()

// Get latest blog posts
app.get('/', async (c) => {
  try {
    const posts = await blogService.getLatestPosts()
    return c.json({
      posts,
      total: posts.length
    })
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return c.json({ error: 'Failed to fetch blog posts' }, 500)
  }
})

// Get all blog posts with pagination
app.get('/all', async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1')
    const pageSize = parseInt(c.req.query('pageSize') || '10')
    const result = await blogService.getAllPosts(page, pageSize)
    return c.json(result)
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return c.json({ error: 'Failed to fetch blog posts' }, 500)
  }
})

// Search blog posts
app.get('/search', async (c) => {
  try {
    const query = c.req.query('q')
    if (!query) {
      return c.json({ error: 'Query parameter "q" is required' }, 400)
    }
    
    const page = parseInt(c.req.query('page') || '1')
    const pageSize = parseInt(c.req.query('pageSize') || '10')
    const result = await blogService.searchPosts(query, page, pageSize)
    return c.json(result)
  } catch (error) {
    console.error('Failed to search blog posts:', error)
    return c.json({ error: 'Failed to search blog posts' }, 500)
  }
})

export default app

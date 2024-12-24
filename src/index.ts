import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { Bindings } from './types/bindings'

// Import routes
import rootRoutes from './routes/root'
import profileRoutes from './routes/profile'
import skillsRoutes from './routes/skills'
import projectsRoutes from './routes/projects'
import blogRoutes from './routes/blog'
import spotifyRoutes from './routes/spotify'
import docsRoutes from './routes/docs'

// Create app
const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS
app.use('*', cors())

// Mount routes
app.route('/', rootRoutes)
app.route('/profile', profileRoutes)
app.route('/skills', skillsRoutes)
app.route('/projects', projectsRoutes)
app.route('/blog', blogRoutes)
app.route('/spotify', spotifyRoutes)
app.route('/docs', docsRoutes)

export default app
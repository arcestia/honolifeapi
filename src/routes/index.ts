import { Hono } from 'hono'
import profileRoutes from './profile'
import spotifyRoutes from './spotify'
import skillsRoutes from './skills'
import projectsRoutes from './projects'

type Bindings = {
  SPOTIFY_CLIENT_ID: string
  SPOTIFY_CLIENT_SECRET: string
  SPOTIFY_REFRESH_TOKEN: string
}

const routes = new Hono<{ Bindings: Bindings }>()

// Mount all routes
routes.route('/', profileRoutes)
routes.route('/spotify', spotifyRoutes)
routes.route('/skills', skillsRoutes)
routes.route('/projects', projectsRoutes)

export default routes

import { Hono } from 'hono'
import { SpotifyService } from '../../services/spotify'
import type { Bindings } from '../../types/bindings'

const app = new Hono<{ Bindings: Bindings }>()

// Get daily listening history
app.get('/daily', async (c) => {
  try {
    const spotifyService = new SpotifyService({
      clientId: c.env.SPOTIFY_CLIENT_ID,
      clientSecret: c.env.SPOTIFY_CLIENT_SECRET,
      refreshToken: c.env.SPOTIFY_REFRESH_TOKEN
    })
    const all = c.req.query('all') === 'true'
    const history = await spotifyService.getDailyHistory(all)
    return c.json(history)
  } catch (error) {
    console.error('Failed to fetch daily listening history:', error)
    return c.json({ error: 'Failed to fetch daily listening history' }, 500)
  }
})

// Get weekly listening history
app.get('/weekly', async (c) => {
  try {
    const spotifyService = new SpotifyService({
      clientId: c.env.SPOTIFY_CLIENT_ID,
      clientSecret: c.env.SPOTIFY_CLIENT_SECRET,
      refreshToken: c.env.SPOTIFY_REFRESH_TOKEN
    })
    const history = await spotifyService.getWeeklyHistory()
    return c.json(history)
  } catch (error) {
    console.error('Failed to fetch weekly listening history:', error)
    return c.json({ error: 'Failed to fetch weekly listening history' }, 500)
  }
})

// Get recent listening history (raw list)
app.get('/', async (c) => {
  try {
    const spotifyService = new SpotifyService({
      clientId: c.env.SPOTIFY_CLIENT_ID,
      clientSecret: c.env.SPOTIFY_CLIENT_SECRET,
      refreshToken: c.env.SPOTIFY_REFRESH_TOKEN
    })
    const limit = parseInt(c.req.query('limit') || '20')
    const history = await spotifyService.getRecentlyPlayed(limit)
    return c.json(history)
  } catch (error) {
    console.error('Failed to fetch listening history:', error)
    return c.json({ error: 'Failed to fetch listening history' }, 500)
  }
})

export default app

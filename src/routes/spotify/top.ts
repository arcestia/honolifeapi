import { Hono } from 'hono'
import { SpotifyService } from '../../services/spotify'
import type { Bindings } from '../../types/bindings'
import type { TimeRange } from '../../types/spotify'

const app = new Hono<{ Bindings: Bindings }>()

// Get top tracks
app.get('/tracks', async (c) => {
  try {
    const spotifyService = new SpotifyService({
      clientId: c.env.SPOTIFY_CLIENT_ID,
      clientSecret: c.env.SPOTIFY_CLIENT_SECRET,
      refreshToken: c.env.SPOTIFY_REFRESH_TOKEN
    })
    const timeRange = c.req.query('timeRange') as TimeRange || 'medium_term'
    const limit = parseInt(c.req.query('limit') || '10')
    
    const tracks = await spotifyService.getTopTracks(timeRange, limit)
    return c.json({
      timeRange,
      tracks,
      total: tracks.length
    })
  } catch (error) {
    console.error('Error fetching top tracks:', error)
    return c.json({ error: 'Failed to fetch top tracks' }, 500)
  }
})

// Get top artists
app.get('/artists', async (c) => {
  try {
    const spotifyService = new SpotifyService({
      clientId: c.env.SPOTIFY_CLIENT_ID,
      clientSecret: c.env.SPOTIFY_CLIENT_SECRET,
      refreshToken: c.env.SPOTIFY_REFRESH_TOKEN
    })
    const timeRange = c.req.query('timeRange') as TimeRange || 'medium_term'
    const limit = parseInt(c.req.query('limit') || '10')
    
    const artists = await spotifyService.getTopArtists(timeRange, limit)
    return c.json({
      timeRange,
      artists,
      total: artists.length
    })
  } catch (error) {
    console.error('Error fetching top artists:', error)
    return c.json({ error: 'Failed to fetch top artists' }, 500)
  }
})

// Get saved albums
app.get('/albums', async (c) => {
  try {
    const spotifyService = new SpotifyService({
      clientId: c.env.SPOTIFY_CLIENT_ID,
      clientSecret: c.env.SPOTIFY_CLIENT_SECRET,
      refreshToken: c.env.SPOTIFY_REFRESH_TOKEN
    })
    const limit = parseInt(c.req.query('limit') || '10')
    
    const albums = await spotifyService.getSavedAlbums(limit)
    return c.json({
      albums,
      total: albums.length
    })
  } catch (error) {
    console.error('Error fetching top albums:', error)
    return c.json({ error: 'Failed to fetch top albums' }, 500)
  }
})

export default app

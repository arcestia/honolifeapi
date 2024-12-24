import { Hono } from 'hono'
import { SpotifyService } from '../../services/spotify'
import type { Bindings } from '../../types/bindings'
import historyRoutes from './history'
import topRoutes from './top'

const app = new Hono<{ Bindings: Bindings }>()

// Get currently playing track
app.get('/now-playing', async (c) => {
  try {
    const spotifyService = new SpotifyService({
      clientId: c.env.SPOTIFY_CLIENT_ID,
      clientSecret: c.env.SPOTIFY_CLIENT_SECRET,
      refreshToken: c.env.SPOTIFY_REFRESH_TOKEN
    })
    const currentTrack = await spotifyService.getCurrentlyPlaying()
    return c.json(currentTrack)
  } catch (error) {
    console.error('Error fetching now playing:', error)
    return c.json({ error: 'Failed to fetch currently playing track' }, 500)
  }
})

// Get currently playing track for shields.io
app.get('/now', async (c) => {
  try {
    const spotifyService = new SpotifyService({
      clientId: c.env.SPOTIFY_CLIENT_ID,
      clientSecret: c.env.SPOTIFY_CLIENT_SECRET,
      refreshToken: c.env.SPOTIFY_REFRESH_TOKEN
    })
    const currentTrack = await spotifyService.getCurrentlyPlaying()
    
    // Get query parameters
    const style = c.req.query('style') || 'flat'
    const logo = c.req.query('logo') || 'spotify'
    const logoColor = c.req.query('logoColor') || 'white'
    const logoWidth = c.req.query('logoWidth')
    const label = c.req.query('label') || 'playing'
    const labelColor = c.req.query('labelColor') || '1DB954'
    const cacheSeconds = parseInt(c.req.query('cacheSeconds') || '0')

    if (!currentTrack.isPlaying || !currentTrack.track || !currentTrack.artist) {
      return c.json({
        schemaVersion: 1,
        label,
        message: "nothing rn",
        color: "5865F2",
        labelColor: "000000",
        style: "for-the-badge",
        namedLogo: logo,
        logoColor: "white",
        ...(logoWidth && { logoWidth: parseInt(logoWidth) }),
        ...(cacheSeconds > 0 && { cacheSeconds })
      })
    }

    return c.json({
      schemaVersion: 1,
      label,
      message: `${currentTrack.track} - ${currentTrack.artist}`,
      color: "1DB954",
      labelColor: "000000",
      style: "for-the-badge",
      namedLogo: logo,
      logoColor: "white",
      ...(logoWidth && { logoWidth: parseInt(logoWidth) }),
      ...(cacheSeconds > 0 && { cacheSeconds })
    })
  } catch (error) {
    console.error('Error generating shield:', error)
    return c.json({
      schemaVersion: 1,
      label: "playing",
      message: "error",
      color: "E74C3C",
      labelColor: "000000",
      style: "for-the-badge",
      namedLogo: "spotify",
      logoColor: "white"
    })
  }
})

// Mount sub-routes
app.route('/history', historyRoutes)
app.route('/top', topRoutes)

export default app

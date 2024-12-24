import SpotifyWebApi from 'spotify-web-api-node';
import type {
  CurrentlyPlaying,
  DailyHistory,
  PlayedTrack,
  SavedAlbum,
  TimeRange,
  TopArtist,
  TopTrack,
  WeeklyHistory
} from '../types/spotify';

interface SpotifyConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

export class SpotifyService {
  private clientId: string;
  private clientSecret: string;
  private refreshToken: string;
  private accessToken?: string | undefined;
  private accessTokenExpiry?: Date;

  constructor(config: SpotifyConfig) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.refreshToken = config.refreshToken;
  }

  private async getAccessToken(): Promise<string> {
    const now = Date.now();
    if (this.accessToken && this.accessTokenExpiry && now < this.accessTokenExpiry.getTime()) {
      return this.accessToken as string;
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: this.refreshToken
      })
    });

    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }

    const data = await response.json();
    if (!data.access_token) {
      throw new Error('No access token received from Spotify');
    }

    this.accessToken = data.access_token;
    this.accessTokenExpiry = new Date(Date.now() + (data.expires_in * 1000));
    return this.accessToken as string;
  }

  async getCurrentlyPlaying(): Promise<CurrentlyPlaying> {
    try {
      const accessToken = await this.getAccessToken();
      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.status === 204) {
        return {
          isPlaying: false,
          track: '',
          artist: '',
          album: '',
          albumArt: '',
          spotifyUrl: ''
        };
      }

      if (!response.ok) {
        throw new Error('Failed to fetch currently playing track');
      }

      const data = await response.json();
      
      if (!data || !data.item) {
        return {
          isPlaying: false,
          track: '',
          artist: '',
          album: '',
          albumArt: '',
          spotifyUrl: ''
        };
      }

      return {
        isPlaying: data.is_playing,
        track: data.item.name,
        artist: data.item.artists.map((artist: { name: string }) => artist.name).join(', '),
        album: data.item.album.name,
        albumArt: data.item.album.images[0]?.url || '',
        spotifyUrl: data.item.external_urls.spotify,
        progressMs: data.progress_ms,
        durationMs: data.item.duration_ms
      };
    } catch (error) {
      console.error('Error fetching currently playing track:', error);
      return {
        isPlaying: false,
        track: '',
        artist: '',
        album: '',
        albumArt: '',
        spotifyUrl: ''
      };
    }
  }

  async getTopTracks(timeRange: TimeRange = 'medium_term', limit: number = 10): Promise<TopTrack[]> {
    const accessToken = await this.getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch top tracks');
    }

    const data = await response.json();
    return data.items.map((track: any) => ({
      name: track.name,
      artist: track.artists.map((artist: { name: string }) => artist.name).join(', '),
      album: track.album.name,
      albumArt: track.album.images[0]?.url,
      spotifyUrl: track.external_urls.spotify,
      previewUrl: track.preview_url,
      duration: track.duration_ms
    }));
  }

  async getTopArtists(timeRange: TimeRange = 'medium_term', limit: number = 10): Promise<TopArtist[]> {
    const accessToken = await this.getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch top artists');
    }

    const data = await response.json();
    return data.items.map((artist: any) => ({
      name: artist.name,
      genres: artist.genres,
      popularity: artist.popularity,
      spotifyUrl: artist.external_urls.spotify,
      imageUrl: artist.images[0]?.url
    }));
  }

  async getSavedAlbums(limit: number = 10): Promise<SavedAlbum[]> {
    const accessToken = await this.getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/me/albums?limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch saved albums');
    }

    const data = await response.json();
    return data.items.map((item: any) => ({
      name: item.album.name,
      artist: item.album.artists.map((artist: { name: string }) => artist.name).join(', '),
      releaseDate: item.album.release_date,
      totalTracks: item.album.total_tracks,
      spotifyUrl: item.album.external_urls.spotify,
      imageUrl: item.album.images[0]?.url
    }));
  }

  async getRecentlyPlayed(limit: number = 20): Promise<PlayedTrack[]> {
    const accessToken = await this.getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch recently played tracks');
    }

    const data = await response.json();
    return data.items.map((item: any) => ({
      track: item.track.name,
      artist: item.track.artists.map((artist: { name: string }) => artist.name).join(', '),
      album: item.track.album.name,
      albumArt: item.track.album.images[0]?.url,
      spotifyUrl: item.track.external_urls.spotify,
      playedAt: item.played_at
    }));
  }

  private async getAllRecentlyPlayed(): Promise<PlayedTrack[]> {
    const limit = 50 // Spotify API max limit
    let allTracks: PlayedTrack[] = []
    let before: string | undefined
    
    while (true) {
      const url = new URL('https://api.spotify.com/v1/me/player/recently-played')
      url.searchParams.append('limit', limit.toString())
      if (before) {
        url.searchParams.append('before', before)
      }

      const accessToken = await this.getAccessToken()
      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch recently played tracks')
      }

      const data = await response.json()
      const tracks = data.items.map((item: any) => ({
        track: item.track.name,
        artist: item.track.artists.map((artist: { name: string }) => artist.name).join(', '),
        album: item.track.album.name,
        albumArt: item.track.album.images[0]?.url,
        spotifyUrl: item.track.external_urls.spotify,
        playedAt: item.played_at
      }))

      if (tracks.length === 0) {
        break
      }

      allTracks = [...allTracks, ...tracks]
      
      // Get timestamp for next page
      const lastTrack = tracks[tracks.length - 1]
      before = new Date(lastTrack.playedAt).getTime().toString()
    }

    return allTracks
  }

  async getDailyHistory(all = false): Promise<DailyHistory[]> {
    const history = all ? 
      await this.getAllRecentlyPlayed() : 
      await this.getRecentlyPlayed(50)
    
    // Group tracks by date and count plays
    const dailyTracks = history.reduce((acc: { [key: string]: DailyHistory }, track) => {
      const date = new Date(track.playedAt).toISOString().split('T')[0]
      
      if (!acc[date]) {
        acc[date] = {
          date,
          tracks: [],
          totalPlays: 0
        }
      }

      // Check if track already exists for the day
      const existingTrack = acc[date].tracks.find(t => 
        t.track === track.track && t.artist === track.artist
      )

      if (existingTrack) {
        existingTrack.playCount++
      } else {
        acc[date].tracks.push({
          ...track,
          playCount: 1
        })
      }

      acc[date].totalPlays++
      return acc
    }, {})

    // Convert to array and sort by date (newest first)
    return Object.values(dailyTracks).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }

  async getWeeklyHistory(): Promise<WeeklyHistory[]> {
    const history = await this.getAllRecentlyPlayed()
    
    // Group tracks by week
    const weeklyTracks = history.reduce((acc: { [key: string]: WeeklyHistory }, track) => {
      const date = new Date(track.playedAt)
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay()) // Start of week (Sunday)
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6) // End of week (Saturday)
      
      const weekKey = weekStart.toISOString().split('T')[0]
      
      if (!acc[weekKey]) {
        acc[weekKey] = {
          weekStart: weekStart.toISOString().split('T')[0],
          weekEnd: weekEnd.toISOString().split('T')[0],
          tracks: [],
          totalPlays: 0
        }
      }

      // Check if track already exists for the week
      const existingTrack = acc[weekKey].tracks.find(t => 
        t.track === track.track && t.artist === track.artist
      )

      if (existingTrack) {
        existingTrack.playCount++
      } else {
        acc[weekKey].tracks.push({
          track: track.track,
          artist: track.artist,
          album: track.album,
          albumArt: track.albumArt,
          spotifyUrl: track.spotifyUrl,
          playCount: 1
        })
      }

      acc[weekKey].totalPlays++
      return acc
    }, {})

    // Convert to array and sort by week (newest first)
    return Object.values(weeklyTracks).sort((a, b) => 
      new Date(b.weekStart).getTime() - new Date(a.weekStart).getTime()
    )
  }
}

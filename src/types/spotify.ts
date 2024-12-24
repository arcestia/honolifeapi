export interface Track {
  track: string
  artist: string
  album: string
  albumArt: string
  spotifyUrl: string
}

export interface PlayedTrack extends Track {
  playedAt: string
}

export interface TrackWithPlayCount extends Track {
  playCount: number
}

export interface PlayedTrackWithCount extends PlayedTrack {
  playCount: number
}

export interface DailyHistory {
  date: string
  tracks: PlayedTrackWithCount[]
  totalPlays: number
}

export interface WeeklyHistory {
  weekStart: string
  weekEnd: string
  tracks: TrackWithPlayCount[]
  totalPlays: number
}

export interface TopTrack extends Track {
  popularity: number
}

export interface TopArtist {
  name: string
  genres: string[]
  popularity: number
  spotifyUrl: string
  imageUrl: string
}

export interface SavedAlbum {
  name: string
  artist: string
  imageUrl: string
  spotifyUrl: string
  releaseDate: string
  totalTracks: number
}

export interface CurrentlyPlaying extends Track {
  isPlaying: boolean
  progressMs?: number
  durationMs?: number
}

export type TimeRange = 'short_term' | 'medium_term' | 'long_term';

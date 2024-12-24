export interface Location {
  city: string
  country: string
  countryCode: string
  timezone: string
  cosmic?: string[]  // For detailed cosmic location
}

export interface Profile {
  name: string
  nickname: string[]
  role: string[]
  city: string
  country: string
  timezone: string
  currentStatus: string
  languages: string[]
  activities: string[]
  currentJobs?: Array<{
    company: string
    title: string
    location: string
  }>
  links: {
    github: string
    linkedin: string
    email: string
    facebook?: string
    x?: string
    instagram?: string
    mastodon?: string
    threads?: string
    bluesky?: string
  }
}

export interface Language {
  level: string
  description: string
}

export interface Languages {
  [key: string]: Language
}

export interface Activity {
  name: string
  type: string
  status: 'Active' | 'Former' | 'Completed'
  description: string
}

export interface Job {
  company: string
  title: string
  type: 'full-time' | 'part-time' | 'self-employed'
  location: string
  startDate: string
  endDate?: string
  description: string[]
  technologies: string[]
}

export interface Experience {
  company: string
  title: string
  location: string
  startDate: string
  endDate?: string
  description: string[]
  type: 'full-time' | 'part-time' | 'self-employed'
  technologies: string[]
}

export interface Education {
  school: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  description: string[]
}

export interface Interest {
  name: string
  description: string
  icon?: string
}

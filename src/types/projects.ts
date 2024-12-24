export interface Project {
  name: string
  description: string
  longDescription?: string
  thumbnail?: string
  technologies: string[]
  github?: string
  website?: string
  startDate: string
  endDate?: string
  featured: boolean
  status: 'completed' | 'in-progress' | 'planned'
}

export interface ProjectResponse {
  projects: Project[]
  featured: Project[]
  total: number
  featuredCount: number
}

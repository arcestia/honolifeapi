export interface BlogPost {
  title: string
  description: string
  link: string
  pubDate: string
  categories: string[]
  content?: string
}

export interface BlogResponse {
  posts: BlogPost[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface BlogSearchResponse extends BlogResponse {
  query: string
  matches: number
}

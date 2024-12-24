import { XMLParser } from 'fast-xml-parser'

export interface BlogPost {
  title: string
  link: string
  pubDate: string
  description: string
}

export interface FeedMetadata {
  title: string
  description: string
  link: string
  lastBuildDate: string
  language: string
  total?: number
  page?: number
  totalPages?: number
}

export interface FeedResponse {
  posts: BlogPost[]
  metadata: FeedMetadata
}

export class BlogService {
  private parser: XMLParser

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: true,
      isArray: (name) => ['item'].includes(name)
    })
  }

  private async fetchAndParseFeed() {
    const response = await fetch('https://skiddle.id/feed')
    if (!response.ok) {
      throw new Error('Failed to fetch feed')
    }

    const xmlText = await response.text()
    const result = this.parser.parse(xmlText)

    if (!result.rss?.channel) {
      throw new Error('Invalid feed format')
    }

    const channel = result.rss.channel
    const posts: BlogPost[] = channel.item.map((item: any) => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      description: item.description || ''
    }))

    // Sort posts by pubDate in descending order (newest first)
    posts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

    return {
      posts,
      channel
    }
  }

  private createFeedResponse(posts: BlogPost[], channel: any, options?: {
    page?: number
    totalPages?: number
    total?: number
  }): FeedResponse {
    return {
      posts,
      metadata: {
        title: channel.title || '',
        description: channel.description || '',
        link: channel.link || '',
        lastBuildDate: posts[0]?.pubDate || '',
        language: channel.language || '',
        total: options?.total ?? posts.length,
        ...(options?.page && { page: options.page }),
        ...(options?.totalPages && { totalPages: options.totalPages })
      }
    }
  }

  async getLatestPosts(limit = 5): Promise<FeedResponse> {
    const { posts, channel } = await this.fetchAndParseFeed()
    return this.createFeedResponse(posts.slice(0, limit), channel)
  }

  async getAllPosts(page = 1, limit = 10): Promise<FeedResponse> {
    const { posts, channel } = await this.fetchAndParseFeed()

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = posts.slice(startIndex, endIndex)
    const totalPages = Math.ceil(posts.length / limit)

    return this.createFeedResponse(paginatedPosts, channel, {
      page,
      totalPages,
      total: posts.length
    })
  }

  async searchPosts(query: string): Promise<FeedResponse> {
    const { posts, channel } = await this.fetchAndParseFeed()
    
    const searchResults = posts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) || 
      post.description.toLowerCase().includes(query.toLowerCase())
    )

    return this.createFeedResponse(searchResults, channel, {
      total: searchResults.length
    })
  }
}

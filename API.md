# Honolife API Documentation

A personal API built with Hono for Cloudflare Workers, providing information about me, my skills, projects, and integrations.

## Base URL

All URLs referenced in the documentation have the following base:
```
https://api.skiddle.id
```

## Authentication

Currently, this API is publicly accessible and does not require authentication.

## Rate Limiting

Please be mindful of rate limits imposed by third-party services (e.g., Spotify API).

## Endpoints

### Profile

#### GET /profile
Returns basic profile information including name, roles, current location, and current job.

**Response**
```json
{
  "name": "Laurensius Jeffrey Chandra",
  "nickname": ["Jeff", "Skiddle"],
  "role": [
    "Software Engineer",
    "Open Source Contributor",
    "Investor",
    "Stock Trader"
  ],
  "currentJobs": [
    {
      "company": "Skiddle ID",
      "title": "Open Source Contributor",
      "location": "Bangkok Metropolitan Area"
    }
  ],
  "city": "Bangkok",
  "country": "Thailand",
  "timezone": "Asia/Bangkok",
  "currentStatus": "Available"
}
```

#### GET /profile/location
Returns current location information.

**Response**
```json
{
  "city": "Jakarta",
  "country": "Indonesia",
  "countryCode": "ID",
  "timezone": "UTC+7",
  "cosmic": [
    "Jakarta",
    "Indonesia",
    "Planet Earth",
    "Solar System",
    "Orion Arm",
    "Milky Way Galaxy",
    "Local Group",
    "Virgo Supercluster",
    "Laniakea Supercluster",
    "The Universe"
  ]
}
```

#### GET /profile/experience
Returns complete work history, sorted from newest to oldest.

**Response**
```json
{
  "experiences": [
    {
      "company": "Skiddle ID",
      "title": "Open Source Contributor",
      "type": "self-employed",
      "location": "Bangkok Metropolitan Area",
      "startDate": "2024-04",
      "endDate": "Present",
      "description": ["Contributing to open source projects", "..."],
      "technologies": ["Azure", "GCP", "Digital Ocean", "React", "JavaScript", "Laravel"]
    },
    {
      "company": "Skiddle ID",
      "title": "Fundraising Coordinator",
      "startDate": "2020-04",
      "endDate": "2024-04",
      "location": "Bangkok Metropolitan Area"
    }
  ],
  "total": 6
}
```

#### GET /profile/jobs
Returns current job positions.

**Response**
```json
{
  "jobs": [
    {
      "company": "Skiddle ID",
      "title": "Open Source Contributor",
      "type": "self-employed",
      "location": "Bangkok Metropolitan Area",
      "startDate": "2024-04",
      "description": ["Contributing to open source projects", "..."],
      "technologies": ["Azure", "GCP", "Digital Ocean", "React", "JavaScript", "Laravel"]
    }
  ],
  "total": 1
}
```

#### GET /profile/education
Returns education history.

#### GET /profile/interests
Returns personal interests.

### Skills

#### GET /skills
Returns all skills organized by category.

#### GET /skills/:category
Returns skills in a specific category.

### Projects

#### GET /projects
Returns all projects, including featured projects.

**Response**
```json
{
  "projects": [
    {
      "name": "Project Name",
      "description": "Project description",
      "technologies": ["TypeScript", "React"],
      "github": "https://github.com/...",
      "website": "https://...",
      "startDate": "2023-01",
      "status": "completed",
      "featured": true
    }
  ],
  "featured": [...],
  "total": 10,
  "featuredCount": 2
}
```

#### GET /projects/featured
Returns only featured projects.

#### GET /projects/status/:status
Returns projects filtered by status (completed, in-progress, planned).

### Blog

#### GET /blog
Returns the 5 latest blog posts.

#### GET /blog/all
Returns all blog posts with pagination.

**Query Parameters**
- `page`: Page number (default: 1)
- `pageSize`: Posts per page (default: 10)

#### GET /blog/search
Search blog posts.

**Query Parameters**
- `q`: Search query (required)
- `page`: Page number (default: 1)
- `pageSize`: Posts per page (default: 10)

### Spotify Integration

#### GET /spotify/now-playing
Returns the currently playing track.

#### GET /spotify/history
Returns recently played tracks.

**Query Parameters**
- `limit`: Number of tracks to return (default: 20)

#### GET /spotify/history/daily
Returns listening history grouped by day.

**Query Parameters**
- `all`: Set to 'true' to fetch all available history (default: false)

#### GET /spotify/history/weekly
Returns listening history grouped by week.

#### GET /spotify/top/tracks
Returns top tracks.

**Query Parameters**
- `timeRange`: Time range for calculation (short_term, medium_term, long_term)
- `limit`: Number of tracks (default: 10)

#### GET /spotify/top/artists
Returns top artists.

**Query Parameters**
- `timeRange`: Time range for calculation (short_term, medium_term, long_term)
- `limit`: Number of artists (default: 10)

#### GET /spotify/top/albums
Returns saved albums.

**Query Parameters**
- `limit`: Number of albums (default: 10)

## Error Handling

All endpoints follow the same error response format:

```json
{
  "error": "Error message"
}
```

Common HTTP status codes:
- 200: Success
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting

The API currently does not implement rate limiting, but please be mindful of usage.

# Honolife API

A personal API built with [Hono](https://hono.dev/) for Cloudflare Workers, providing information about me, my skills, projects, and integrations with services like Spotify.

## Features

- 🧑 **Profile Information**: Basic info, location, work experience, education history, and interests
- 💻 **Skills**: Programming languages, frameworks, tools, and other technical skills
- 🚀 **Projects**: Featured projects and portfolio work
- 📝 **Blog Integration**: Latest posts, archives, and search functionality
- 🎵 **Spotify Integration**: Currently playing track, listening history, and top tracks/artists

## Tech Stack

- [Hono](https://hono.dev/) - Lightweight web framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety and better developer experience
- [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless deployment platform
- [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node) - Spotify API integration
- [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) - XML parsing for blog feeds

## Project Structure

```
src/
├── data/               # Data files
│   ├── profile/       # Profile information
│   │   ├── index.ts
│   │   ├── location.ts
│   │   ├── experiences.ts
│   │   ├── education.ts
│   │   └── interests.ts
│   ├── skills/        # Skills data
│   │   ├── index.ts
│   │   ├── languages.ts
│   │   ├── frameworks.ts
│   │   ├── tools.ts
│   │   └── others.ts
│   └── projects.ts    # Projects data
├── routes/            # API routes
│   ├── root.ts       # API overview
│   ├── profile/      # Profile routes
│   ├── skills/       # Skills routes
│   ├── projects/     # Projects routes
│   ├── blog/         # Blog routes
│   └── spotify/      # Spotify routes
├── services/         # External services
│   ├── blog.ts      # Blog service
│   └── spotify.ts   # Spotify service
└── types/           # TypeScript types
    ├── bindings.ts  # Environment variables
    ├── profile.ts   # Profile types
    ├── skills.ts    # Skills types
    ├── projects.ts  # Projects types
    ├── blog.ts      # Blog types
    └── spotify.ts   # Spotify types
```

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/honolifeapi.git
   cd honolifeapi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```env
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

## API Documentation

- [API Documentation](./API.md) - Detailed API documentation
- [OpenAPI Specification](./openapi.json) - OpenAPI/Swagger specification

## Deployment

1. Login to Cloudflare:
   ```bash
   npx wrangler login
   ```

2. Deploy to Cloudflare Workers:
   ```bash
   npm run deploy
   ```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run deploy` - Deploy to Cloudflare Workers
- `npm run test` - Run tests
- `npm run lint` - Run linter
- `npm run format` - Format code

## Environment Variables

Required environment variables in your Cloudflare Workers settings:

- `SPOTIFY_CLIENT_ID`: Spotify API client ID
- `SPOTIFY_CLIENT_SECRET`: Spotify API client secret
- `SPOTIFY_REFRESH_TOKEN`: Spotify refresh token

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

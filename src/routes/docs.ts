import { Hono } from 'hono'
import { html } from 'hono/html'

const app = new Hono()

app.get('/', (c) => {
  const baseUrl = new URL(c.req.url).origin

  return c.html(html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Honolife API Documentation</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/prism.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-json.min.js"></script>
      </head>
      <body class="bg-gray-100">
        <div class="container mx-auto px-4 py-8 max-w-4xl">
          <header class="mb-8">
            <h1 class="text-4xl font-bold mb-2">Honolife API Documentation</h1>
            <p class="text-gray-600">
              A personal API built with Hono for Cloudflare Workers, providing information about me, my skills, projects, and integrations.
            </p>
          </header>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">Base URL</h2>
            <div class="bg-gray-800 text-white p-4 rounded-lg">
              <code>${baseUrl}</code>
            </div>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">Authentication</h2>
            <p class="mb-4">Currently, this API is publicly accessible and does not require authentication.</p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">Rate Limiting</h2>
            <p class="mb-4">Please be mindful of rate limits imposed by third-party services (e.g., Spotify API).</p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">Endpoints</h2>
            
            <div class="space-y-6">
              <!-- Profile Endpoints -->
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold mb-4">Profile</h3>
                
                <div class="space-y-4">
                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /profile</h4>
                    <p class="text-gray-600 mb-2">Returns basic profile information including name, roles, current location, and current job.</p>
                    <div class="bg-gray-100 p-4 rounded">
                      <pre><code class="language-json">{
  "name": "Laurensius Jeffrey Chandra",
  "nickname": ["Jeff", "Skiddle"],
  "role": [
    "Software Engineer",
    "Open Source Contributor",
    "Investor",
    "Stock Trader"
  ],
  "city": "Bangkok",
  "country": "Thailand",
  "timezone": "Asia/Bangkok",
  "currentStatus": "Available",
  "languages": ["English", "Indonesian", "Thai"],
  "activities": ["Coding", "Trading", "Reading"]
}</code></pre>
                    </div>
                  </div>

                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /profile/location</h4>
                    <p class="text-gray-600 mb-2">Returns current location information.</p>
                  </div>

                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /profile/languages</h4>
                    <p class="text-gray-600 mb-2">Returns known languages and proficiency levels.</p>
                  </div>

                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /profile/activities</h4>
                    <p class="text-gray-600 mb-2">Returns current activities and interests.</p>
                  </div>

                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /profile/links</h4>
                    <p class="text-gray-600 mb-2">Returns social and professional profile links.</p>
                  </div>

                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /profile/experience</h4>
                    <p class="text-gray-600 mb-2">Returns complete work history, sorted from newest to oldest.</p>
                  </div>

                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /profile/education</h4>
                    <p class="text-gray-600 mb-2">Returns education history.</p>
                  </div>

                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /profile/interests</h4>
                    <p class="text-gray-600 mb-2">Returns personal interests and hobbies.</p>
                  </div>

                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /profile/jobs</h4>
                    <p class="text-gray-600 mb-2">Returns current job positions.</p>
                  </div>
                </div>
              </div>

              <!-- Skills Endpoints -->
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold mb-4">Skills</h3>
                
                <div class="space-y-4">
                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /skills</h4>
                    <p class="text-gray-600 mb-2">Returns all skills organized by category.</p>
                  </div>

                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /skills/:category</h4>
                    <p class="text-gray-600 mb-2">Returns skills in a specific category.</p>
                  </div>
                </div>
              </div>

              <!-- Projects Endpoints -->
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold mb-4">Projects</h3>
                
                <div class="space-y-4">
                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /projects</h4>
                    <p class="text-gray-600 mb-2">Returns all projects with featured flag.</p>
                  </div>

                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /projects/featured</h4>
                    <p class="text-gray-600 mb-2">Returns only featured projects.</p>
                  </div>

                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /projects/status/:status</h4>
                    <p class="text-gray-600 mb-2">Returns projects filtered by status (completed, in-progress, planned).</p>
                  </div>
                </div>
              </div>

              <!-- Blog Endpoints -->
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold mb-4">Blog</h3>
                
                <div class="space-y-4">
                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /blog</h4>
                    <p class="text-gray-600 mb-2">Returns the 5 latest blog posts.</p>
                  </div>

                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /blog/all</h4>
                    <p class="text-gray-600 mb-2">Returns all blog posts with pagination.</p>
                    <p class="text-sm text-gray-500">Query Parameters:</p>
                    <ul class="list-disc list-inside text-sm text-gray-500 ml-4">
                      <li>page: Page number (default: 1)</li>
                      <li>pageSize: Posts per page (default: 10)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /blog/search</h4>
                    <p class="text-gray-600 mb-2">Search blog posts by query.</p>
                    <p class="text-sm text-gray-500">Query Parameters:</p>
                    <ul class="list-disc list-inside text-sm text-gray-500 ml-4">
                      <li>q: Search query (required)</li>
                      <li>page: Page number (default: 1)</li>
                      <li>pageSize: Posts per page (default: 10)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Spotify Endpoints -->
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-semibold mb-4">Spotify Integration</h3>
                
                <div class="space-y-4">
                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /spotify/now-playing</h4>
                    <p class="text-gray-600 mb-2">Returns currently playing track with detailed information.</p>
                  </div>

                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /spotify/now</h4>
                    <p class="text-gray-600 mb-2">Returns currently playing track in shields.io endpoint format.</p>
                    <p class="text-gray-600 mb-2">Example response:</p>
                    <div class="bg-gray-100 p-4 rounded">
                      <pre><code class="language-json">{
  "schemaVersion": 1,
  "label": "playing",
  "message": "Song Name - Artist Name",
  "color": "1DB954",
  "labelColor": "000000",
  "style": "flat-square",
  "namedLogo": "spotify",
  "logoColor": "white"
}</code></pre>
                    </div>
                    <p class="text-gray-600 mb-2">When nothing is playing:</p>
                    <div class="bg-gray-100 p-4 rounded">
                      <pre><code class="language-json">{
  "schemaVersion": 1,
  "label": "playing",
  "message": "nothing rn",
  "color": "5865F2",
  "labelColor": "000000",
  "style": "flat-square",
  "namedLogo": "spotify",
  "logoColor": "white"
}</code></pre>
                    </div>
                    <p class="text-gray-600 mb-2">Query Parameters:</p>
                    <ul class="list-disc list-inside text-sm text-gray-500 ml-4">
                      <li>style: Badge style (flat, flat-square, plastic, for-the-badge, social). Default: flat-square</li>
                      <li>logo: Icon slug from simple-icons. Default: spotify</li>
                      <li>logoColor: Logo color (hex without #). Default: white</li>
                      <li>logoWidth: Width of the logo in pixels</li>
                      <li>label: Left-hand-side text. Default: playing</li>
                      <li>labelColor: Left side background color (hex without #). Default: 000000</li>
                      <li>cacheSeconds: Cache duration in seconds. Default: 0</li>
                    </ul>
                    <p class="text-gray-600 mb-2">Example usage with shields.io:</p>
                    <div class="bg-gray-100 p-4 rounded">
                      <pre><code class="language-markdown">![Now Playing](https://img.shields.io/endpoint?url=https://api.skiddle.id/spotify/now)</code></pre>
                    </div>
                    <p class="text-gray-600 mb-2">Example with custom parameters:</p>
                    <div class="bg-gray-100 p-4 rounded">
                      <pre><code class="language-markdown">![Now Playing](https://img.shields.io/endpoint?url=https://api.skiddle.id/spotify/now?style=for-the-badge&logo=spotify&logoColor=1DB954&label=listening%20to&labelColor=black)</code></pre>
                    </div>
                  </div>

                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /spotify/history</h4>
                    <p class="text-gray-600 mb-2">Returns recently played tracks.</p>
                  </div>

                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /spotify/top/tracks</h4>
                    <p class="text-gray-600 mb-2">Returns your top tracks.</p>
                  </div>

                  <div>
                    <h4 class="font-semibold text-indigo-600">GET /spotify/top/artists</h4>
                    <p class="text-gray-600 mb-2">Returns your top artists.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">Error Handling</h2>
            <p class="mb-4">All endpoints follow the same error response format:</p>
            <div class="bg-gray-100 p-4 rounded-lg">
              <pre><code class="language-json">{
  "error": "Error message"
}</code></pre>
            </div>
            <div class="mt-4">
              <p class="font-semibold">Common HTTP status codes:</p>
              <ul class="list-disc list-inside text-gray-600 ml-4">
                <li>200: Success</li>
                <li>400: Bad Request</li>
                <li>404: Not Found</li>
                <li>500: Internal Server Error</li>
              </ul>
            </div>
          </section>

          <footer class="text-center text-gray-600 mt-12">
            <p>Built with <a href="https://hono.dev" class="text-indigo-600 hover:underline">Hono</a> and deployed on Cloudflare Workers</p>
            <p class="mt-2">
              <a href="https://github.com/jeffreychandra/honolifeapi" class="text-indigo-600 hover:underline">View on GitHub</a>
            </p>
          </footer>
        </div>
        <script>
          // Highlight code blocks
          Prism.highlightAll();

          // Add copy button to code blocks
          document.querySelectorAll('pre').forEach((block) => {
            const button = document.createElement('button');
            button.className = 'absolute top-2 right-2 px-2 py-1 text-sm bg-gray-800 text-white rounded hover:bg-gray-700';
            button.textContent = 'Copy';
            
            button.addEventListener('click', async () => {
              const code = block.querySelector('code');
              await navigator.clipboard.writeText(code.textContent);
              button.textContent = 'Copied!';
              setTimeout(() => {
                button.textContent = 'Copy';
              }, 2000);
            });

            const wrapper = document.createElement('div');
            wrapper.className = 'relative';
            block.parentNode.insertBefore(wrapper, block);
            wrapper.appendChild(block);
            wrapper.appendChild(button);
          });
        </script>
      </body>
    </html>`)
})

export default app

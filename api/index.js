import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';
import { existsSync, readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// SEO Routes
app.get('/robots.txt', (req, res) => {
  const robotsTxt = `User-agent: *
Allow: /

Crawl-delay: 1

Disallow: /api/
Disallow: /_next/
Disallow: /admin/

Allow: /tools/
Allow: /calculator/

Sitemap: ${req.protocol}://${req.get('host')}/sitemap.xml
Host: ${req.protocol}://${req.get('host')}`;

  res.setHeader('Content-Type', 'text/plain');
  res.send(robotsTxt);
});

app.get('/sitemap.xml', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const currentDate = new Date().toISOString().split('T')[0];
  
  const tools = [
    'age-calculator',
    'bmi-calculator', 
    'unit-converter',
    'password-generator',
    'text-encoder',
    'color-palette',
    'percentage-calculator',
    'random-generator',
    'countdown-timer',
    'date-difference',
    'tax-calculator',
    'sqrt-calculator',
    'gpa-calculator',
    'date-converter'
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
${tools.map(tool => `  <url>
    <loc>${baseUrl}/tools/${tool}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.send(sitemap);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'BMO Tools API'
  });
});

// Static file serving for production
const publicPath = resolve(__dirname, '..', 'dist', 'public');
const fallbackPublicPath = resolve(__dirname, '..', 'public');

let staticPath = publicPath;
if (!existsSync(publicPath)) {
  staticPath = fallbackPublicPath;
}

if (existsSync(staticPath)) {
  app.use(express.static(staticPath));
}

// SPA routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }

  const indexPath = resolve(staticPath, 'index.html');
  
  if (existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // Fallback HTML response
    res.send(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>BMO Tools - أدوات حسابية يومية</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0;
              padding: 40px 20px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              text-align: center;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            .container {
              max-width: 600px;
              background: rgba(255,255,255,0.1);
              padding: 40px;
              border-radius: 20px;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255,255,255,0.2);
            }
            h1 { margin: 0 0 20px 0; font-size: 2.5em; }
            p { font-size: 1.2em; line-height: 1.6; margin: 20px 0; }
            .loading {
              width: 50px;
              height: 50px;
              border: 3px solid rgba(255,255,255,0.3);
              border-top: 3px solid white;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin: 20px auto;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .refresh-btn {
              background: rgba(255,255,255,0.2);
              border: 1px solid rgba(255,255,255,0.3);
              color: white;
              padding: 12px 24px;
              border-radius: 8px;
              cursor: pointer;
              font-size: 16px;
              margin-top: 20px;
              transition: all 0.3s ease;
            }
            .refresh-btn:hover {
              background: rgba(255,255,255,0.3);
              transform: translateY(-2px);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🧮 BMO Tools</h1>
            <p>أدوات حسابية يومية</p>
            <div class="loading"></div>
            <p>التطبيق قيد التشغيل...</p>
            <p>Application is starting up...</p>
            <button class="refresh-btn" onclick="window.location.reload()">
              تحديث الصفحة / Refresh Page
            </button>
          </div>
          <script>
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          </script>
        </body>
      </html>
    `);
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

export default app;
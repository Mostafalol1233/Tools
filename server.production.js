import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync } from 'fs';
import { createServer } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
  });
  next();
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
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Static file serving
const staticPath = resolve(__dirname, 'dist', 'public');
console.log('Looking for static files at:', staticPath);

if (existsSync(staticPath)) {
  app.use(express.static(staticPath));
  console.log('Serving static files from:', staticPath);
} else {
  console.log('Static files directory not found');
}

// SPA fallback - serve index.html for all routes
app.get('*', (req, res) => {
  const indexPath = resolve(staticPath, 'index.html');
  if (existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send(`
      <html>
        <head><title>BMO Tools</title></head>
        <body>
          <h1>BMO Tools</h1>
          <p>Application is starting up. Please refresh in a moment.</p>
          <p>Looking for files at: ${staticPath}</p>
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
    message: err.message 
  });
});

// Create server
const httpServer = createServer(app);

const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';

httpServer.listen(port, host, () => {
  console.log(`BMO Tools server running on http://${host}:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
#!/usr/bin/env node

// Simple production server for BMO Tools
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';

// Content types mapping
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

// Find static files directory
let staticDir = path.join(__dirname, 'dist', 'public');
if (!fs.existsSync(staticDir)) {
  staticDir = path.join(__dirname, 'public');
}
if (!fs.existsSync(staticDir)) {
  staticDir = path.join(__dirname, 'build');
}

console.log('Looking for static files in:', staticDir);
console.log('Static directory exists:', fs.existsSync(staticDir));

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  console.log(`${req.method} ${pathname}`);

  // Handle robots.txt
  if (pathname === '/robots.txt') {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const robotsTxt = `User-agent: *
Allow: /

Crawl-delay: 1

Disallow: /api/
Disallow: /_next/
Disallow: /admin/

Allow: /tools/
Allow: /calculator/

Sitemap: ${protocol}://${req.headers.host}/sitemap.xml
Host: ${protocol}://${req.headers.host}`;

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(robotsTxt);
    return;
  }

  // Handle sitemap.xml
  if (pathname === '/sitemap.xml') {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const baseUrl = `${protocol}://${req.headers.host}`;
    const currentDate = new Date().toISOString().split('T')[0];
    
    const tools = [
      'age-calculator', 'bmi-calculator', 'unit-converter', 'password-generator',
      'text-encoder', 'color-palette', 'percentage-calculator', 'random-generator',
      'countdown-timer', 'date-difference', 'tax-calculator', 'sqrt-calculator',
      'gpa-calculator', 'date-converter'
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

    res.writeHead(200, { 'Content-Type': 'application/xml; charset=utf-8' });
    res.end(sitemap);
    return;
  }

  // Health check
  if (pathname === '/health' || pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      service: 'BMO Tools',
      staticDir: staticDir,
      staticExists: fs.existsSync(staticDir)
    }));
    return;
  }

  // Serve static files
  let filePath = path.join(staticDir, pathname === '/' ? 'index.html' : pathname);
  
  // Security check - prevent directory traversal
  if (!filePath.startsWith(staticDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File doesn't exist, try index.html for SPA routing
      const indexPath = path.join(staticDir, 'index.html');
      
      fs.access(indexPath, fs.constants.F_OK, (indexErr) => {
        if (indexErr) {
          // No index.html, send fallback response
          sendFallbackResponse(res);
        } else {
          // Serve index.html
          serveFile(indexPath, res);
        }
      });
    } else {
      // File exists, serve it
      serveFile(filePath, res);
    }
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath);
  const contentType = contentTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error('Error reading file:', filePath, err);
      res.writeHead(500);
      res.end('Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}

function sendFallbackResponse(res) {
  const fallbackHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BMO Tools - أدوات حسابية يومية</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0; padding: 40px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white; text-align: center; min-height: 100vh;
      display: flex; flex-direction: column; justify-content: center; align-items: center;
    }
    .container {
      max-width: 600px; background: rgba(255,255,255,0.1);
      padding: 40px; border-radius: 20px; backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
    }
    h1 { margin: 0 0 20px 0; font-size: 2.5em; }
    p { font-size: 1.2em; line-height: 1.6; margin: 20px 0; }
    .loading {
      width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3);
      border-top: 3px solid white; border-radius: 50%;
      animation: spin 1s linear infinite; margin: 20px auto;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .btn {
      background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3);
      color: white; padding: 12px 24px; border-radius: 8px; cursor: pointer;
      font-size: 16px; margin: 10px; transition: all 0.3s ease; text-decoration: none;
      display: inline-block;
    }
    .btn:hover { background: rgba(255,255,255,0.3); transform: translateY(-2px); }
  </style>
</head>
<body>
  <div class="container">
    <h1>🧮 BMO Tools</h1>
    <p>أدوات حسابية يومية</p>
    <div class="loading"></div>
    <p>يتم تحضير التطبيق...</p>
    <p>Application is starting...</p>
    <a href="/" class="btn">تحديث / Refresh</a>
    <a href="/health" class="btn">فحص النظام / Health Check</a>
  </div>
  <script>
    setTimeout(() => window.location.reload(), 5000);
  </script>
</body>
</html>`;

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(fallbackHtml);
}

// Error handling
server.on('error', (err) => {
  console.error('Server error:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start server
server.listen(port, host, () => {
  console.log(`🚀 BMO Tools server running on http://${host}:${port}`);
  console.log(`📁 Serving static files from: ${staticDir}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
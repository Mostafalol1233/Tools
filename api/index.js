import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url } = req;

  // Handle robots.txt
  if (url === '/robots.txt') {
    const robotsTxt = `User-agent: *
Allow: /

Crawl-delay: 1

Disallow: /api/
Disallow: /_next/
Disallow: /admin/

Allow: /tools/
Allow: /calculator/

Sitemap: ${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/sitemap.xml
Host: ${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`;

    res.setHeader('Content-Type', 'text/plain');
    return res.send(robotsTxt);
  }

  // Handle sitemap.xml
  if (url === '/sitemap.xml') {
    const baseUrl = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`;
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
    return res.send(sitemap);
  }

  // Health check
  if (url === '/api/health') {
    return res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      service: 'BMO Tools API'
    });
  }

  // Check for static files
  const staticPath = resolve(__dirname, '..', 'dist', 'public');
  const fallbackPath = resolve(__dirname, '..', 'public');
  
  let publicDir = staticPath;
  if (!existsSync(staticPath)) {
    publicDir = fallbackPath;
  }

  // Try to serve static file
  const filePath = resolve(publicDir, url.slice(1) || 'index.html');
  
  if (existsSync(filePath)) {
    try {
      const content = readFileSync(filePath);
      const ext = filePath.split('.').pop();
      
      // Set appropriate content type
      const contentTypes = {
        'html': 'text/html',
        'css': 'text/css',
        'js': 'application/javascript',
        'json': 'application/json',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'svg': 'image/svg+xml',
        'ico': 'image/x-icon'
      };
      
      res.setHeader('Content-Type', contentTypes[ext] || 'text/plain');
      return res.send(content);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  }

  // Fallback to SPA index.html or default response
  const indexPath = resolve(publicDir, 'index.html');
  
  if (existsSync(indexPath)) {
    try {
      const indexContent = readFileSync(indexPath, 'utf-8');
      res.setHeader('Content-Type', 'text/html');
      return res.send(indexContent);
    } catch (error) {
      console.error('Error reading index.html:', error);
    }
  }

  // Final fallback - custom HTML response
  res.setHeader('Content-Type', 'text/html');
  return res.send(`
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
          <p>يتم تحميل التطبيق...</p>
          <p>Application is loading...</p>
          <button class="refresh-btn" onclick="window.location.reload()">
            تحديث الصفحة / Refresh Page
          </button>
        </div>
        <script>
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        </script>
      </body>
    </html>
  `);
}
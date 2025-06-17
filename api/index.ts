import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { pathname } = new URL(req.url || '', `http://${req.headers.host}`);
  
  // Health check endpoint
  if (pathname === '/api/health') {
    return res.status(200).json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      service: 'BMO Tools API'
    });
  }
  
  // Handle robots.txt
  if (pathname === '/robots.txt' || pathname === '/robots' || pathname === '/api/robots') {
    const robotsTxt = `User-agent: *
Allow: /

# Crawl-delay for polite crawling
Crawl-delay: 1

# Block access to API endpoints and admin routes
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Allow all calculator tools
Allow: /tools/
Allow: /calculator/

# Sitemap location
Sitemap: ${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/sitemap.xml

# Host specification  
Host: ${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`;

    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(robotsTxt);
  }

  // Handle sitemap.xml
  if (pathname === '/sitemap.xml' || pathname === '/sitemap' || pathname === '/api/sitemap') {
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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
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
    return res.status(200).send(sitemap);
  }

  // Default API response
  return res.status(404).json({ error: 'API endpoint not found' });
}
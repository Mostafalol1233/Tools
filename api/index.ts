import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { pathname } = new URL(req.url || '', `http://${req.headers.host}`);
  
  // Handle robots.txt
  if (pathname === '/robots' || pathname === '/api/robots') {
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
  if (pathname === '/sitemap' || pathname === '/api/sitemap') {
    const baseUrl = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`;
    const currentDate = new Date().toISOString().split('T')[0];
    
    const tools = [
      'age-calculator',
      'bmi-calculator', 
      'unit-converter',
      'password-generator',
      'bmo-encryption',
      'cipher-detector',
      'percentage-calculator',
      'random-number-generator',
      'date-difference',
      'tax-calculator',
      'square-root',
      'gpa-calculator'
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
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // SEO Routes
  app.get('/api/robots', (req, res) => {
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
Sitemap: ${req.protocol}://${req.get('host')}/sitemap.xml

# Host specification
Host: ${req.protocol}://${req.get('host')}`;

    res.setHeader('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });

  app.get('/api/sitemap', (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
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
    res.send(sitemap);
  });

  const httpServer = createServer(app);

  return httpServer;
}

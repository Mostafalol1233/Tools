#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';

console.log('🚀 Starting deployment build process...\n');

try {
  // Step 1: Build the client
  console.log('📦 Building client application...');
  execSync('vite build', { stdio: 'inherit' });
  console.log('✅ Client build completed\n');

  // Step 2: Create dist directory if it doesn't exist
  if (!existsSync('dist')) {
    mkdirSync('dist', { recursive: true });
  }

  // Step 3: Create a simplified server entry point for production
  console.log('🔧 Creating production server...');
  
  const productionServer = `
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';
import { existsSync } from 'fs';
import { createServer } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// SEO Routes
app.get('/api/robots.txt', (req, res) => {
  const robotsTxt = \`User-agent: *
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
Sitemap: \${req.protocol}://\${req.get('host')}/sitemap.xml

# Host specification
Host: \${req.protocol}://\${req.get('host')}\`;

  res.setHeader('Content-Type', 'text/plain');
  res.send(robotsTxt);
});

app.get('/api/sitemap.xml', (req, res) => {
  const baseUrl = \`\${req.protocol}://\${req.get('host')}\`;
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
    'date-difference',
    'tax-calculator',
    'sqrt-calculator',
    'gpa-calculator'
  ];

  const sitemap = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>\${baseUrl}/</loc>
    <lastmod>\${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
\${tools.map(tool => \`  <url>
    <loc>\${baseUrl}/tools/\${tool}</loc>
    <lastmod>\${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\`).join('\\n')}
</urlset>\`;

  res.setHeader('Content-Type', 'application/xml');
  res.send(sitemap);
});

// Serve static files
const distPath = resolve(__dirname, 'public');
if (existsSync(distPath)) {
  app.use(express.static(distPath));
  
  // Handle SPA routing
  app.get('*', (req, res) => {
    res.sendFile(resolve(distPath, 'index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.status(404).send('Build files not found. Please run the build process.');
  });
}

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Create HTTP server
const server = createServer(app);

const port = process.env.PORT || 5000;
server.listen(port, '0.0.0.0', () => {
  console.log(\`🚀 Server running on port \${port}\`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});
`;

  writeFileSync('dist/server.js', productionServer);
  console.log('✅ Production server created\n');

  // Step 4: Create package.json for production
  console.log('📄 Creating production package.json...');
  
  const productionPackage = {
    "name": "bmo-tools-production",
    "version": "1.0.0",
    "type": "module",
    "main": "server.js",
    "scripts": {
      "start": "node server.js"
    },
    "dependencies": {
      "express": "^4.21.2"
    },
    "engines": {
      "node": ">=18.0.0"
    }
  };

  writeFileSync('dist/package.json', JSON.stringify(productionPackage, null, 2));
  console.log('✅ Production package.json created\n');

  console.log('🎉 Deployment build completed successfully!');
  console.log('📁 Production files are in the dist/ directory');
  console.log('🚀 To start production server: cd dist && npm install && npm start');

} catch (error) {
  console.error('❌ Deployment build failed:', error.message);
  process.exit(1);
}
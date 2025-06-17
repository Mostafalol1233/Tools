#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel build process...');

// Install dependencies
console.log('📦 Installing dependencies...');
execSync('npm ci', { stdio: 'inherit' });

// Build the client
console.log('🔨 Building client...');
execSync('npm run build', { stdio: 'inherit' });

// Copy server files to api directory for Vercel serverless functions
console.log('📁 Setting up serverless functions...');
const apiDir = path.join(__dirname, 'api');
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

// Create serverless function for the main app
const indexHandler = `import { createServer } from 'http';
import express from 'express';
import { registerRoutes } from '../server/routes.js';
import { serveStatic, setupVite } from '../server/vite.js';

const app = express();

// Enable trust proxy for Vercel
app.set('trust proxy', 1);

// CORS middleware
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

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  serveStatic(app);
} else {
  setupVite(app, createServer(app));
}

// Register API routes
registerRoutes(app);

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  } else {
    res.status(404).send('Not found');
  }
});

export default app;
`;

fs.writeFileSync(path.join(apiDir, 'index.ts'), indexHandler);

console.log('✅ Build completed successfully!');
console.log('🌟 Ready for Vercel deployment!');
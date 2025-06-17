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

// The serverless function is already created in api/index.ts, no need to generate it here

console.log('✅ Build completed successfully!');
console.log('🌟 Ready for Vercel deployment!');
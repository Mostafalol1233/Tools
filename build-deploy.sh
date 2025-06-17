#!/bin/bash

echo "Building BMO Tools for deployment..."

# Clean previous builds
rm -rf dist/
mkdir -p dist/

# Build client
echo "Building client..."
npm run build 2>/dev/null || {
    echo "Client build failed, trying vite build directly..."
    npx vite build
}

# Copy production server
echo "Preparing server..."
cp server.production.js dist/server.js

# Create production package.json
echo "Creating production package.json..."
cat > dist/package.json << EOF
{
  "name": "bmo-tools",
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
}
EOF

echo "Build complete! Production files are in dist/"
echo "To deploy: cd dist && npm install && npm start"
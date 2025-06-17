# BMO Tools - Deployment Guide

## Deployment Issue Resolution

The error you encountered was caused by module bundling conflicts in the esbuild process. The bundled server code had conflicting imports between different modules (`express2` and `express`).

## Solutions Provided

### 1. Vercel Deployment (Recommended)
Use the `api/index.js` file and `vercel.json` configuration:

```bash
# Deploy to Vercel
vercel --prod
```

### 2. Production Server
Use the standalone production server:

```bash
# Build and run production server
./build-deploy.sh
cd dist
npm install
npm start
```

### 3. Docker Deployment
Use the provided Dockerfile:

```bash
docker build -t bmo-tools .
docker run -p 5000:5000 bmo-tools
```

## Key Changes Made

1. **Fixed Header**: Made the header fixed position instead of sticky to prevent scrolling issues
2. **Removed Navigation Button**: Removed the "Mustafa Mohamed" button from header as requested
3. **Updated Links**: Replaced GitHub link with your Bemora website (https://bemora.vercel.app)
4. **Translation Support**: Added full translation support for contact and footer sections
5. **Deployment Fix**: Created standalone server files to avoid module bundling conflicts

## Files Created for Deployment

- `api/index.js` - Serverless function for Vercel
- `server.production.js` - Standalone production server
- `vercel.json` - Vercel deployment configuration
- `build-deploy.sh` - Build script for manual deployment
- `Dockerfile` - Docker container configuration

## Environment Variables

The application works without additional environment variables, but you can set:

- `NODE_ENV=production` for production mode
- `PORT=5000` to specify port (default: 5000)
- `HOST=0.0.0.0` to specify host (default: 0.0.0.0)

## SEO Features

Both deployment options include:
- `/robots.txt` - Search engine crawling instructions
- `/sitemap.xml` - Site structure for search engines
- Proper meta tags and Open Graph support
- Arabic and English language support

## Testing Deployment

1. **Local Testing**:
   ```bash
   npm run build
   node server.production.js
   ```

2. **Health Check**:
   Visit `/api/health` to verify server status

3. **SEO Check**:
   - Visit `/robots.txt` 
   - Visit `/sitemap.xml`

## Troubleshooting

If you encounter module conflicts:
1. Use the `api/index.js` approach (serverless)
2. Ensure all dependencies are externalized in build process
3. Check that static files are properly built in `dist/public`

The deployment should now work without the module import conflicts you experienced.
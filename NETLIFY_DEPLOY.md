# Netlify Deployment Guide

## Overview
This guide walks you through deploying your BMO Tools application to Netlify with serverless functions support.

## Prerequisites
- Netlify account (free tier available)
- GitHub repository containing this code

## Deployment Steps

### 1. Connect to Netlify
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Connect your GitHub account and select this repository

### 2. Build Configuration
Use these settings in Netlify dashboard:

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `dist/public`
- Functions directory: `netlify/functions`

**Environment Variables:**
- NODE_VERSION: `20`

### 3. Deploy
Click "Deploy site" - Netlify will automatically:
- Install dependencies
- Build the frontend
- Deploy serverless functions
- Set up redirects and caching

## What's Included

### Serverless Functions
- `/api/health` - Health check endpoint
- `/robots.txt` - SEO robots file
- `/sitemap.xml` - SEO sitemap with all tools

### Automatic Features
- SPA routing (all routes serve index.html)
- Asset caching (CSS/JS files cached for 1 year)
- Security headers (XSS protection, content type options)
- CORS support for API endpoints

### Performance Optimizations
- Static asset caching
- Automatic compression
- Global CDN distribution
- HTTP/2 support

## Custom Domain (Optional)
1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow DNS configuration instructions

## Monitoring
- Access logs in Netlify dashboard under "Functions"
- Monitor site analytics and performance
- Set up deployment notifications

## Environment Variables
If you need to add environment variables:
1. Go to Site settings > Environment variables
2. Add variables (they'll be available to functions)

## Troubleshooting
- Check function logs for errors
- Verify build logs for issues
- Ensure all dependencies are in package.json
- Test functions locally with Netlify CLI if needed

Your BMO Tools app will be live at: `https://[site-name].netlify.app`
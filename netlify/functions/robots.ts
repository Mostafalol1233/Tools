import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  const { headers } = event;
  const host = headers.host || 'localhost';
  const protocol = headers['x-forwarded-proto'] || 'https';
  
  const robotsTxt = `User-agent: *
Allow: /

Crawl-delay: 1

Disallow: /api/
Disallow: /_next/
Disallow: /admin/

Allow: /tools/
Allow: /calculator/

Sitemap: ${protocol}://${host}/sitemap.xml
Host: ${protocol}://${host}`;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
    },
    body: robotsTxt,
  };
};
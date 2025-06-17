import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  const { httpMethod, path, headers } = event;
  
  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  };

  // Handle preflight requests
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  // Extract the API endpoint from the path
  const apiPath = path.replace('/.netlify/functions/api', '');

  // Handle different API endpoints
  switch (apiPath) {
    case '/health':
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
        body: JSON.stringify({
          status: 'ok',
          timestamp: new Date().toISOString(),
          service: 'BMO Tools API',
          platform: 'Netlify Functions'
        }),
      };

    default:
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
        body: JSON.stringify({
          error: 'API endpoint not found',
          path: apiPath,
          timestamp: new Date().toISOString()
        }),
      };
  }
};
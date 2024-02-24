import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const requestUrl = url.searchParams.get('url');

  if (!requestUrl) {
    throw new Error('Missing url');
  }

  const response = await fetch(requestUrl).then(res => res.body);

  return new Response(response, {
    headers: { 'Content-Type': 'application/json' }
  });
};

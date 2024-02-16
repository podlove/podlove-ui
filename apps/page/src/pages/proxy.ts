import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const requestUrl = url.searchParams.get('url');

  if (!requestUrl) {
    throw new Error('Missing url');
  }

  return fetch(requestUrl);
};

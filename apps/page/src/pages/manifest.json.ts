import type { APIRoute } from 'astro';
import { getRequestHeader } from '../lib/middleware';

export const GET: APIRoute = async ({ request }) => {
  const lang = getRequestHeader(request, 'accept-language', 'en-US');

  const manifest = {
    name: 'PWA-DEMO',
    short_name: 'PWA-DEMO',
    lang,
    start_url: '/',
    // "display": "standalone",
    // "theme_color": "#e30613",
    // "background_color": "#ffffff",
    // "icons": [
    //   {
    //     "src": "pwa-demo.png",
    //     "sizes": "512x512",
    //     "type": "image\/png"
    //   },
    //     {
    //     "src": "pwa-demo-smaller.png",
    //     "sizes": "192x192",
    //     "type": "image\/png"
    //   }
    // ]
  };

  return new Response(JSON.stringify(manifest), {
    headers: { 'Content-Type': 'application/json' }
  });
};

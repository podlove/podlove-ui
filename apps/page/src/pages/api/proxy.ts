export async function GET({ request }:  { request: Request }) {
  const url = new URL(request.url);
  const proxyUrl = url.searchParams.get('url');

  if (!proxyUrl) {
    return new Response(null, {
      status: 422,
      statusText: 'Missing url parameter'
    });
  }

  const response = await fetch(proxyUrl);
  return new Response(await response.arrayBuffer());
}

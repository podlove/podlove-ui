import feedParser from "../../logic/data/feed-parser";

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const feed = url.searchParams.get('url');

  if (!feed) {
    return new Response(null, {
      status: 422,
      statusText: 'Missing url parameter'
    });
  }

  try {
    const data = await feedParser({ feed });
    return new Response(
      JSON.stringify(data)
    );

  } catch (err) {
    return new Response(null, {
      status: 422,
      statusText: 'Invalid feed'
    });
  }
}

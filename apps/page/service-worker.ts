/// <reference no-default-lib="true"/>
/// <reference lib="webworker" />
const sw: ServiceWorkerGlobalScope & typeof globalThis = self as any;

let CACHE: Cache | null = null;

const getFeed = (): string | null => new URLSearchParams(sw.location.search).get('feed');
const getCacheKey = (): string | null => new URLSearchParams(sw.location.search).get('cacheKey');

const getCache = async (): Promise<Cache | null> => {
  if (CACHE) {
    return CACHE;
  }

  const feed = getFeed();

  if (!feed) {
    return null;
  }

  return caches.open(feed);
};

const handleRequest = async (request: Request) => {
  const cache = await getCache();
  const cacheKey = await getCacheKey();

  if (!cache || !cacheKey) {
    return fetch(request);
  }

  const cachedUrl = new URL(request.url);
  cachedUrl.searchParams.set('cacheKey', cacheKey);

  // First try to get the resource from the cache
  const responseFromCache = await cache.match(cachedUrl.toString());

  if (responseFromCache) {
    return responseFromCache;
  }

  // Next try to get the resource from the network
  const responseFromNetwork = await fetch(cachedUrl.toString(), { mode: 'no-cors' });
  if (responseFromNetwork.status <= 300) {
    cache.put(cachedUrl.toString(), responseFromNetwork.clone());
  }

  return responseFromNetwork;
};

const getCacheKeyFromRequest = (request: Request) =>
  new URL(request.url).searchParams.get('cacheKey');

sw.addEventListener('fetch', (event: any) => {
  const { request } = event;
  const supportedDestinations = ['image', ''];

  // Bypass navigation requests.
  if (request.mode === 'navigate') {
    return;
  }

  // Opening the DevTools triggers the "only-if-cached" request
  // that cannot be handled by the worker. Bypass such requests.
  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
    return;
  }

  if (request.method !== 'GET') {
    return;
  }

  if (!supportedDestinations.includes(request.destination)) {
    return;
  }

  event.respondWith(handleRequest(request));
});

const cleanCache = async (cacheKey: string) => {
  const cache = await getCache();

  if (!cache) {
    return;
  }

  const requests = await cache.keys();

  requests
    ?.filter((request) => getCacheKeyFromRequest(request) !== cacheKey)
    .forEach((request) => {
      CACHE?.delete(request);
    });
};

sw.addEventListener('initialize', async (event: any) => {
  const cacheKey = getCacheKey();

  if (!cacheKey) {
    return;
  }

  event.waitUntil(cleanCache(cacheKey));
});

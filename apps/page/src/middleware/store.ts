import { defineMiddleware } from 'astro:middleware';
import { waitFor } from '@podlove/utils/promise';
import { get } from 'lodash-es';
import { actions, store, selectors } from '../logic';

const FEED_COOKIE = 'PODCAST_FEED';

export const initializeStore = defineMiddleware(async ({ request, cookies }, next) => {
  const url = new URL(request.url);
  const acceptedLanguage = (request.headers.get('accept-language') || '')

  const locale = get(acceptedLanguage.split(','), 0, 'en-US');
  const feed = url.searchParams.get('feed') || cookies.get(FEED_COOKIE)?.value;

  if (!feed) {
    throw Error('Missing Feed Url');
  }

  store.dispatch(actions.initializeApp({ feed, locale }));

  await waitFor(() => {
    const initialized = selectors.runtime.initialized(store.getState());
    return initialized ? true : undefined;
  }).catch((err) => {
    console.error('timeout fetching data');
  });

  cookies.set(FEED_COOKIE, feed, { path: '/' });

  return next();
});

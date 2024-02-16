import { defineMiddleware } from 'astro:middleware';
import { waitFor } from '@podlove/utils/promise';
import { toInteger } from 'lodash-es';
import { actions, store, selectors } from '../logic';
import { getRequestHeader } from '../lib/middleware';

export const initializeStore = defineMiddleware(async ({ request, params, url }, next) => {
  const locale = getRequestHeader(request, 'accept-language', 'en-US');
  const { feed, episodeId } = params;

  if (!feed) {
    throw Error('Missing Feed Url');
  }

  store.dispatch(actions.lifecycle.initializeApp({ feed, locale, episodeId: toInteger(episodeId) }));

  await waitFor(() => {
    const initialized = selectors.runtime.initialized(store.getState());
    return initialized ? true : undefined;
  }, 10000).catch((err) => {
    throw Error('Request timed out');
  });

  return next();
});

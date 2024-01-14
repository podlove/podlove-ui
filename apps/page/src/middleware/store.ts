import { defineMiddleware } from 'astro:middleware';
import { waitFor } from '@podlove/utils/promise';
import { get, toInteger } from 'lodash-es';
import { actions, store, selectors } from '../logic';

export const initializeStore = defineMiddleware(async ({ request, params }, next) => {
  const acceptedLanguage = request.headers.get('accept-language') || '';
  const locale = get(acceptedLanguage.split(','), 0, 'en-US');
  const { feed, episodeId } = params;

  if (!feed) {
    throw Error('Missing Feed Url');
  }

  store.dispatch(actions.initializeApp({ feed, locale, episodeId: toInteger(episodeId) }));

  await waitFor(() => {
    const initialized = selectors.runtime.initialized(store.getState());
    return initialized ? true : undefined;
  }).catch((err) => {
    console.error('timeout fetching data');
  });

  return next();
});

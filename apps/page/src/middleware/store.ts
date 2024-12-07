import { defineMiddleware } from 'astro:middleware';
import { toInteger } from 'lodash-es';
import { actions, store, selectors } from '../logic';
import { getRequestHeader } from '../lib/middleware';
import parseFeed from '../logic/data/feed-parser';
import type { Podcast } from '../types/feed.types';
import { createHash } from '../lib/caching';
import { version } from '../../package.json';
import { waitForConidition } from '../lib/wait-for';

export const initializeStore = defineMiddleware(async ({ request, params }, next) => {
  const locale = getRequestHeader(request, 'accept-language', 'en-US');
  const { feed, episodeId } = params;

  if (!feed) {
    throw Error('Missing Feed Url');
  }

  store.dispatch(actions.lifecycle.initializeApp({ feed, locale, episodeId: toInteger(episodeId) }));

  const data: Podcast = await parseFeed({ feed, episodeId: toInteger(episodeId) });
  const cacheKey: string | null = data.etag ? await createHash(`${data.etag}${version}`) : null;

  store.dispatch(actions.lifecycle.dataFetched({ data, cacheKey, version }));

  await waitForConidition(() => selectors.colors.initialized(store.getState()), 1000)

  return next();
});

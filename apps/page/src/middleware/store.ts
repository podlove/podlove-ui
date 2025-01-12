import { defineMiddleware } from 'astro:middleware';
import { toInteger } from 'lodash-es';
import { actions, store } from '../logic';
import { getRequestHeader } from '../lib/middleware';
import parseFeed from '../logic/data/feed-parser';
import type { Podcast } from '../types/feed.types';
import { createHash } from '../lib/caching';
import { getRequestParams } from './request-param';

const version = import.meta.env.VITE_COMMIT_HASH;

export const initializeStore = defineMiddleware(async ({ request }, next) => {
  const locale = getRequestHeader(request, 'accept-language', 'en-US');
  const { feed, episodeId, customDomain, primaryColor } = getRequestParams(request);

  if (!feed) {
    throw new Error('Missing Feed');
  }

  store.dispatch(
    actions.lifecycle.initializeApp({
      feed,
      locale,
      episodeId: toInteger(episodeId),
      customDomain
    })
  );

  const data: Podcast = await parseFeed({ feed, episodeId: toInteger(episodeId) });
  const cacheKey: string | null = data.etag ? await createHash(`${data.etag}${version}`) : null;

  store.dispatch(actions.lifecycle.dataFetched({ data, cacheKey, version }));

  if (primaryColor) {
    store.dispatch(actions.theme.initializeTheme({ primaryColor }));
  }

  return next();
});

import { defineMiddleware } from "astro:middleware";
import { store, selectors } from '../logic';

export const setEtag = defineMiddleware(async (_, next) => {
  const cacheKey = selectors.runtime.cacheKey(store.getState());

  if (!cacheKey) {
    return next();
  }

  const response = await next();

  if ((response as Response).headers) {
    (response as Response).headers.set('ETag', `"${cacheKey}"`);
  }

  return response;
});

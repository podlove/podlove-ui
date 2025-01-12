import { defineMiddleware } from "astro:middleware";
import { getRequestParams } from "./request-param";

export const handleCustomDomain = defineMiddleware(async ({ request, rewrite, originPathname }, next) => {
  const { feed, episodeId } = getRequestParams(request);

  if (feed && episodeId && originPathname !== `/feed/${feed}/episode/${episodeId}`) {
    return rewrite(`/feed/${feed}/episode/${episodeId}`);
  }

  if (feed && originPathname !== '/feed') {
    return rewrite('/feed');
  }

  if (!feed && originPathname !== '/search') {
    return rewrite('/search');
  }

  return next();
});

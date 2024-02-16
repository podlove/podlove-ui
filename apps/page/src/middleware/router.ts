import type { MiddlewareEndpointHandler } from 'astro';
import { defineMiddleware, sequence } from 'astro:middleware';
import micromatch from 'micromatch';

export function defineMiddlewareRouter(router: Record<string, MiddlewareEndpointHandler>) {
  const entries = Object.entries(router);
  return defineMiddleware((context, next) =>
    sequence(
      ...entries
        .filter(([path]) => micromatch.isMatch(context.url.pathname, path))
        .map(([_, handler]) => handler)
    )(context, next)
  );
}

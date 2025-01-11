import type { MiddlewareHandler } from 'astro';
import { defineMiddleware } from 'astro:middleware';
import multimatch from 'multimatch';

export function defineMiddlewareRouter(entries: [string, MiddlewareHandler][]): MiddlewareHandler {
  return defineMiddleware((context, next) => {
    const match = entries.find(([path]) => multimatch(context.url.pathname, path).length > 0);

    if (!match) {
      return next();
    }

    const [, routeHandler] = match;

    return routeHandler(context, next);
  });
}

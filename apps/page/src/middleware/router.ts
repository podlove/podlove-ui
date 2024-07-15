import { defineMiddleware, sequence } from 'astro:middleware';
import multimatch from 'multimatch';

export function defineMiddlewareRouter(router: Record<string, any>) {
  const entries = Object.entries(router);
  return defineMiddleware((context, next) =>
    sequence(
      ...entries
        .filter(([path]) => multimatch(context.url.pathname, path).length > 0)
        .map(([_, handler]) => handler)
    )(context, next)
  );
}

import { sequence } from 'astro:middleware';

import { initializeStore } from './store';
import { setEtag } from './caching';
import { defineMiddlewareRouter } from './router';
import { extractRequestParams } from './request-param';
import { handleCustomDomain } from './custom-domain';

export const onRequest = defineMiddlewareRouter([
  ['/feed/**', sequence(extractRequestParams, initializeStore, setEtag)],
  ['/api/**', sequence()],
  ['/search**', sequence()],
  ['/**', sequence(extractRequestParams, handleCustomDomain, initializeStore, setEtag)]
]);

import { sequence } from 'astro:middleware';

import { initializeStore } from './store';
import { setEtag } from './caching';
import { defineMiddlewareRouter } from './router'

export const onRequest = defineMiddlewareRouter({
  '/feed/**': sequence(initializeStore, setEtag),
  '/proxy**': sequence()
})

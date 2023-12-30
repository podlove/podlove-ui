import { sequence } from 'astro:middleware';
import { initializeStore } from './store';

export const onRequest = sequence(initializeStore);

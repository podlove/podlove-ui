import { createAction } from 'redux-actions';
import type { PodloveWebPlayerKeyboardEvent } from '@podlove/types';
import { KEY_DOWN, KEY_UP } from './types.js';

export const keyDown = createAction<PodloveWebPlayerKeyboardEvent>(KEY_DOWN);
export const keyUp = createAction<PodloveWebPlayerKeyboardEvent>(KEY_UP);

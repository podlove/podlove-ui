import { createAction } from 'redux-actions';
import { PodloveWebPlayerConfig } from '@podlove/types';
import { INIT } from './types.js';

export type initPayload = PodloveWebPlayerConfig;

export const init = createAction<initPayload>(INIT);

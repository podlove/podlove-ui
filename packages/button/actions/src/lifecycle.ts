import { createAction } from 'redux-actions';
import type { PodloveSubscribeButtonConfig } from '@podlove/types';
import { INIT } from './types';

export type initPayload = PodloveSubscribeButtonConfig;

export const init = createAction<initPayload>(INIT);

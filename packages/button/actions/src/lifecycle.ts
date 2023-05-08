import { createAction } from 'redux-actions';
import type { PodloveSubscribeButtonConfig, PodloveRuntime, PodloveTheme } from '@podlove/types';
import { INIT } from './types';

export type initPayload = PodloveSubscribeButtonConfig & {
  runtime: PodloveRuntime;
  theme: PodloveTheme;
};

export const init = createAction<initPayload>(INIT);

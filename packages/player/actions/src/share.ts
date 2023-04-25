import { createAction } from 'redux-actions';
import type { PodloveWebPlayerChannel, PodloveWebPlayerContent } from '@podlove/types';
import { SELECT_CONTENT, SELECT_CHANNEL } from './types';

export type selectContentPayload = PodloveWebPlayerContent;
export type selectChannelPayload = PodloveWebPlayerChannel;

export const selectContent = createAction<selectContentPayload>(SELECT_CONTENT);
export const selectChannel = createAction<selectChannelPayload>(SELECT_CHANNEL);

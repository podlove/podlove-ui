import { createAction } from 'redux-actions';
import { SELECT_EMBED_SIZE } from './types';

export type selectEmbedSizePayload = '250x400' | '320x400' | '375x400' | '600x290' | '768x290';

export const selectEmbedSize = createAction<selectEmbedSizePayload>(SELECT_EMBED_SIZE);

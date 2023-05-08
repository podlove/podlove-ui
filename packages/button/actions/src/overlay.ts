import { createAction } from 'redux-actions';
import { HIDE_OVERLAY, SHOW_OVERLAY } from './types';

export type hidePayload = void;
export type showPayload = void;

export const hide = createAction<hidePayload>(HIDE_OVERLAY);
export const show = createAction<showPayload>(SHOW_OVERLAY);

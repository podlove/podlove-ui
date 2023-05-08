import { createAction } from 'redux-actions';
import { SHOW_FINISH_CARD, HIDE_FINISH_CARD } from './types';

export type hidePayload = void;
export interface showPayload {
  icon: string | null;
  install: string | null;
  title: string | null;
  link: string | null;
  os: string | null;
  rss: string | null;
  type: string | null;
}

export const hide = createAction<hidePayload>(HIDE_FINISH_CARD);
export const show = createAction<showPayload>(SHOW_FINISH_CARD);

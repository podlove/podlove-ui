import { prop } from 'ramda';
import { handleActions } from 'redux-actions';

import * as list from '@podlove/button-actions/list';
import * as overlay from '@podlove/button-actions/overlay';
import * as finishCard from '@podlove/button-actions/finish-card';

export interface State {
  overlay: boolean;
  finish: boolean;
  list: boolean;
}

export const INITIAL_STATE: State = {
  overlay: false,
  finish: false,
  list: true
};

export const reducer = handleActions<
  State,
  list.showPayload | overlay.showPayload | overlay.hidePayload | finishCard.showPayload
>(
  {
    [list.show.toString()]: (state): State => ({ ...state, finish: false, list: true }),
    [overlay.show.toString()]: (state): State => ({ ...state, overlay: true }),
    [overlay.hide.toString()]: (state): State => ({
      ...state,
      overlay: false,
      finish: false,
      list: true
    }),
    [finishCard.show.toString()]: (state): State => ({ ...state, list: false, finish: true })
  },
  INITIAL_STATE
);

export const selectors = {
  overlay: prop('overlay') as (input: State) => boolean,
  finish: prop('finish') as (input: State) => boolean,
  list: prop('list') as (input: State) => boolean
};

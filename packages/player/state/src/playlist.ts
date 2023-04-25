import { compose, find, prop, identity } from 'ramda';
import { Action, handleActions } from 'redux-actions';
import { playlist } from '@podlove/player-config';
import { toPlayerTime } from '@podlove/utils/time';
import { ready, readyPayload } from '@podlove/player-actions/lifecycle';
import {
  markActive,
  markActivePayload,
  selectEpisode,
  selectEpisodePayload
} from '@podlove/player-actions/playlist';

export interface PlaylistItem {
  title: string;
  config: string;
  duration: number;
  active?: boolean;
}

export type State = PlaylistItem[];

const INITIAL_STATE: State = [];

const active = (state: State, payload: number): State =>
  state.map((item, index) => ({ ...item, active: payload === index }));

export const reducer = handleActions<
  State,
  readyPayload | selectEpisodePayload | markActivePayload
>(
  {
    [ready.toString()]: (state: State, { payload }: Action<readyPayload>) => {
      if (state.length > 0) {
        return state;
      }

      return playlist(payload).map((item) => ({
        ...item,
        duration: toPlayerTime(item.duration),
        active: !!item.active
      }));
    },
    [selectEpisode.toString()]: (
      state: State,
      { payload: { index: index } }: Action<selectEpisodePayload>
    ) => {
      if (state.length > 0) {
        return state;
      }

      return active(state, index);
    },
    [markActive.toString()]: (state: State, { payload }: Action<markActivePayload>) => {
      if (state.length > 0) {
        return state;
      }

      return active(state, payload)
    }
  },
  INITIAL_STATE
);

const episode = find(({ active }) => active) as (input: State) => PlaylistItem;

export const selectors = {
  list: identity as (input: State) => State,
  episode,
  title: compose(prop('title'), episode) as (input: State) => string,
  config: compose(prop('config'), episode) as (input: State) => string
};

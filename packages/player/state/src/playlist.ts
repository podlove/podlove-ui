import { get } from 'lodash-es';
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
      { payload: { index } }: Action<selectEpisodePayload>
    ) => {
      if (state.length === 0) {
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

const episode = (state: State): PlaylistItem => state.find(({ active }) => active);

export const selectors = {
  list: (state: State) => state,
  episode,
  title: (state: State): string => get(episode(state), 'title'),
  config: (state: State): string => get(episode(state), 'config')
};

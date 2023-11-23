import { prop } from 'ramda';
import { Action, handleActions } from 'redux-actions';
import { toInt } from '@podlove/utils/helper';
import { simulatePlaytime, simulatePlaytimePayload } from '@podlove/player-actions/timepiece';
import { disableGhost, enableGhost } from '@podlove/player-actions/progress';

export interface State {
  active: boolean;
  time: number | null;
}

export const INITIAL_STATE: State = {
  active: false,
  time: null
};

export const reducer = handleActions<State, simulatePlaytimePayload>(
  {
    [simulatePlaytime.toString()]: (state, { payload }: Action<simulatePlaytimePayload>) => ({
      ...state,
      time: state.active ? toInt(payload) : null
    }),

    [enableGhost.toString()]: (state) => {
      return {
        ...state,
        active: true
      };
    },

    [disableGhost.toString()]: (state) => ({
      ...state,
      active: false,
      time: null
    })
  },
  INITIAL_STATE
);

export const selectors = {
  time: prop('time') as (input: State) => null | number,
  active: prop('active') as (input: State) => boolean
};

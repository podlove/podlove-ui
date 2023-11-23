import { prop } from 'ramda';
import { Action, handleActions } from 'redux-actions';
import { toInt } from '@podlove/utils/helper';
import { duration, playtime } from '@podlove/player-config';
import { ready } from '@podlove/player-actions/lifecycle';

import { readyPayload } from '@podlove/player-actions/lifecycle';
import { backendDuration } from '@podlove/player-actions/timepiece';
import { backendDurationPayload } from '@podlove/player-actions/timepiece';
import { backendPlaytime } from '@podlove/player-actions/timepiece';
import { backendPlaytimePayload } from '@podlove/player-actions/timepiece';
import { requestPlaytime } from '@podlove/player-actions/timepiece';
import { requestPlaytimePayload } from '@podlove/player-actions/timepiece';
import { backendLiveSync } from '@podlove/player-actions/timepiece';
import { backendLiveSyncPayload } from '@podlove/player-actions/timepiece';

export interface State {
  duration: number;
  playtime: number;
  livesync: number;
}

export const INITIAL_STATE: State = {
  duration: 0,
  playtime: 0,
  livesync: 0
};

export const reducer = handleActions<State, readyPayload | backendDurationPayload | backendPlaytimePayload | requestPlaytimePayload | backendLiveSyncPayload>(
  {
    [ready.toString()]: (state, { payload }: Action<readyPayload>) => ({
      ...state,
      duration: duration(payload),
      playtime: playtime(payload)
    }),
    [backendDuration.toString()]: (state, { payload }: Action<backendDurationPayload>) => ({
      ...state,
      duration: toInt(payload || state.duration)
    }),
    [backendPlaytime.toString()]: (state, { payload }: Action<backendPlaytimePayload>) => ({
      ...state,
      playtime: toInt(payload)
    }),
    [requestPlaytime.toString()]: (state, { payload }: Action<requestPlaytimePayload>) => ({
      ...state,
      playtime: toInt(payload)
    }),
    [backendLiveSync.toString()]: (state, { payload }: Action<backendLiveSyncPayload>) => ({
      ...state,
      livesync: toInt(payload)
    })
  },
  INITIAL_STATE
);

export const selectors = {
  playtime: prop('playtime') as (input: State) => number,
  duration: prop('duration') as (input: State) => number,
  livesync: prop('livesync') as (input: State) => number,
}

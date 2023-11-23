import { prop } from 'ramda';
import { Action, handleActions } from 'redux-actions';
import { compose } from 'ramda';

import { inRange } from '@podlove/utils/math';
import { toFloat } from '@podlove/utils/helper';

import {
  setVolume,
  setRate,
  mute,
  unmute,
  setVolumeActionPayload,
  muteActionPayload,
  unmuteActionPayload,
  setRateActionPayload
} from '@podlove/player-actions/audio';

export interface State {
  volume: number;
  muted: boolean;
  rate: number;
}

export const INITIAL_STATE: State = {
  volume: 1,
  muted: false,
  rate: 1
};

const inVolumeRange = compose<any[], number, number>(inRange(0, INITIAL_STATE.volume), toFloat);
const inRateRange = compose<any[], number, number>(inRange(0.5, 4), toFloat);

export const reducer = handleActions<State, setVolumeActionPayload | muteActionPayload | unmuteActionPayload | setRateActionPayload>(
  {
    [setVolume.toString()]: (state: State, { payload }: Action<setVolumeActionPayload>): State => ({
      ...state,
      volume: inVolumeRange(payload)
    }),

    [mute.toString()]: (state: State): State => ({
      ...state,
      muted: true
    }),

    [unmute.toString()]: (state: State): State => ({
      ...state,
      muted: false
    }),

    [setRate.toString()]: (state: State, { payload }: Action<setRateActionPayload>): State => ({
      ...state,
      rate: inRateRange(payload)
    })
  },
  INITIAL_STATE
);

export const selectors = {
  volume: prop('volume') as (input: State) => number,
  muted: prop('muted') as (input: State) => boolean,
  rate: prop('rate') as (input: State) => number,
}

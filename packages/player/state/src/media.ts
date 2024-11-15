import { Action, handleActions } from 'redux-actions';
import { PodloveWebPlayerAudio } from '@podlove/types';
import { media } from '@podlove/player-config';
import { ready, readyPayload } from '@podlove/player-actions/lifecycle';

export type State = PodloveWebPlayerAudio[];
export const INITIAL_STATE: State = [];

export const reducer = handleActions<State, readyPayload>(
  {
    [ready.toString()]: (_, { payload }: Action<readyPayload>) => media(payload)
  },
  INITIAL_STATE
);

export const selectors = {
  media: (state: State) => state
};

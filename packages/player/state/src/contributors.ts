import { Action, handleActions } from 'redux-actions';
import { get } from 'lodash-es';

import { PodloveWebPlayerContributor } from '@podlove/types';
import { ready, readyPayload } from '@podlove/player-actions/lifecycle';

export type State = PodloveWebPlayerContributor[];

export const INITIAL_STATE: State = [];

export const reducer = handleActions<State, readyPayload>(
  {
    [ready.toString()]: (_, { payload }: Action<readyPayload>) =>
      get(payload, 'contributors', [])
  },
  INITIAL_STATE
);

export const selectors = {
  contributors: (state: State) => state
};

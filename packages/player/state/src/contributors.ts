import { Action, handleActions } from 'redux-actions';
import { identity, propOr } from 'ramda';

import { PodloveWebPlayerContributor } from '@podlove/types';
import { ready, readyPayload } from '@podlove/player-actions/lifecycle';

export type State = PodloveWebPlayerContributor[];

export const INITIAL_STATE: State = [];

export const reducer = handleActions<State, readyPayload>(
  {
    [ready.toString()]: (_, { payload }: Action<readyPayload>) =>
      propOr([], 'contributors', payload)
  },
  INITIAL_STATE
);

export const selectors = {
  contributors: identity as (input: State) => State
};

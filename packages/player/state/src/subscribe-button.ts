import { Action, handleActions } from 'redux-actions';

import * as config from '@podlove/player-config';
import { constructed, constructedPayload } from '@podlove/player-actions/lifecycle';

export type State = boolean;

export const INITIAL_STATE: State = false;

export const reducer = handleActions<State, constructedPayload>(
  {
    [constructed.toString()]: (_, { payload }: Action<constructedPayload>) =>
      !!config.subscribeButton(payload)
  },
  INITIAL_STATE
);

export const selectors = {
  available: (state: State) => state
};

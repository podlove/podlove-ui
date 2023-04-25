import { Action, handleActions } from 'redux-actions';
import { identity } from 'ramda';
import { channels } from '@podlove/player-config';
import { PodloveWebPlayerChannel } from '@podlove/types'
import { ready, readyPayload } from '@podlove/player-actions/lifecycle';

export type State = PodloveWebPlayerChannel[];

export const INITIAL_STATE: State = [
  'facebook',
  'twitter',
  'whats-app',
  'linkedin',
  'pinterest',
  'xing',
  'mail',
  'link'
];

export const reducer = handleActions<State, readyPayload>(
  {
    [ready.toString()]: (_, { payload }: Action<readyPayload>) => channels(payload)
  },
  INITIAL_STATE
);

export const selectors = {
  channels: identity as (input: State) => State
};

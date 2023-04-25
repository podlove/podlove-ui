import { identity } from 'ramda';
import { handleActions } from 'redux-actions';
import { constructed, restore } from '@podlove/player-actions/lifecycle';
import { backendEnd, backendLoadingEnd } from '@podlove/player-actions/play';
import { backendPlaytime } from '@podlove/player-actions/timepiece';

export type State = 'initialized' | 'active' | 'ended';

const INITIAL_STATE: State = 'initialized';

export const reducer = handleActions<State, void>(
  {
    [constructed.toString()]: () => 'initialized',
    [backendLoadingEnd.toString()]: () => 'active',
    [backendPlaytime.toString()]: () => 'active',
    [restore.toString()]: () => 'active',
    [backendEnd.toString()]: () => 'ended'
  },
  INITIAL_STATE
);

export const selectors = {
  playstate: identity
};

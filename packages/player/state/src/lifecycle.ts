import { handleActions } from 'redux-actions';
import { ready, constructed, init } from '@podlove/player-actions/lifecycle';

export type State = null | 'constructed' | 'init' | 'ready';

export const INITIAL_STATE: State = null;

export const reducer = handleActions<State, void>(
  {
    [constructed.toString()]: () => 'constructed',
    [init.toString()]: () => 'init',
    [ready.toString()]: () => 'ready'
  },
  INITIAL_STATE
);

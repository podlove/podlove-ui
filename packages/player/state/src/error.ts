import { Action, handleActions } from 'redux-actions';
import { hideError, hideErrorPayload, showError, showErrorPayload } from '@podlove/player-actions/error';

export interface State {
  active: boolean;
  retry: boolean;
  icon: string | null;
  title: string | null;
  message: string | null;
}

export const INITIAL_STATE: State = {
  active: false,
  icon: null,
  title: null,
  message: null,
  retry: false
};

export const reducer = handleActions<State, showErrorPayload | hideErrorPayload>(
  {
    [showError.toString()]: (state, { payload }: Action<showErrorPayload>) => ({
      ...state,
      active: true,
      ...payload
    } as State),
    [hideError.toString()]: () => INITIAL_STATE
  },
  INITIAL_STATE
);

export const selectors = {
  active: (state: State) => state.active,
  icon: (state: State) => state.icon,
  title: (state: State) => state.title,
  message: (state: State) => state.message,
  retry: (state: State) => state.retry,
};

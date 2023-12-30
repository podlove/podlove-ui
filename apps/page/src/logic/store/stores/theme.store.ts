import { handleActions, type Action } from 'redux-actions';

export interface State {
  background: string | null;
}

export const reducer = handleActions<State, any>(
  {

  },
  { background: null }
);

export const selectors = {
  background: (state: State) => state.background
};

import { init } from '@podlove/player-actions/lifecycle';
import { Action, Store } from 'redux';
import State from '../../src/store/state.js';

export const setState =
  (...fragments) =>
  ({ PODLOVE_STORE }) => {
    const state = fragments.reduce((result, item) => Object.assign({}, result, item), {});
    PODLOVE_STORE.dispatch(init(state));
  };

export const onUpdate = (store: Store<State>) => (type: string) => (assertion: (state: State, action: Action) => void) => {
  const subscription = store.subscribe(() => {
    const action = store.getState().lastAction;

    if (action.type !== type) {
      return;
    }

    assertion(store.getState(), action);
    subscription();
  });
};

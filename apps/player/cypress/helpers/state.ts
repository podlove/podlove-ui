import { curry } from 'ramda';
import { init } from '@podlove/player-actions/lifecycle';

export const setState =
  (...fragments) =>
  ({ PODLOVE_STORE }) => {
    const state = fragments.reduce((result, item) => Object.assign({}, result, item), {});
    PODLOVE_STORE.dispatch(init(state));
  };

export const onUpdate = curry((store, type, assertion) => {
  const subscription = store.subscribe(() => {
    const action = store.getState().lastAction;

    if (action.type !== type) {
      return;
    }

    assertion(store.getState(), action);
    subscription();
  });
});

import { createStore as createReduxStore, applyMiddleware, compose, type Store } from 'redux';
import sagasEngine from '@podlove/player-sagas/middleware';

import selectors from './selectors';
import actions from './actions';
import reducers from './reducers';
import type State from './state';

export function createStore(): Store<State> {
  let composeEnhancers = compose;
  let preloadedState = undefined;

  if (globalThis.window) {
    composeEnhancers = (globalThis.window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    preloadedState = (globalThis.window as any).REDUX_STATE
  }

  const store = createReduxStore(
    reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(sagasEngine.middleware)),
  );

  return store;
}

export { selectors, actions, type State };

import { type Store } from 'redux';
import { createStore, actions, selectors, type State } from './store';
import { createSideEffects } from './sagas';

const store: Store<State> = createStore();

createSideEffects();

export { store, actions, selectors };

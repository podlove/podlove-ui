import { createStore, compose, applyMiddleware, Store } from 'redux';

import reducers from './reducers';
import sagas from '../sagas';
import runtimeSaga from '../sagas/runtime';
import State from './state';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store: Store<State> = createStore(reducers, composeEnhancers(applyMiddleware(sagas.middleware)));

sagas.run(runtimeSaga);

export default store;

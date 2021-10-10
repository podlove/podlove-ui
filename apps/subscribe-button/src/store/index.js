import { createStore, compose, applyMiddleware } from 'redux'
import reducers from './reducers'
import sagas from '../sagas'
import runtimeSaga from '../sagas/runtime'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(sagas.middleware)))

sagas.run(runtimeSaga)

export default store

import Vue from 'vue'

import { createStore, compose, applyMiddleware } from 'redux'
import { connect } from 'redux-vuex'
import reducers from './reducers'
import sagas from '../sagas'
import runtimeSaga from '../sagas/runtime'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(sagas.middleware)))

sagas.run(runtimeSaga)

connect({
  Vue,
  store,
  binding: 'appStore'
})

export default store

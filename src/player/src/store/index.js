import Vue from 'vue'
import sagas from '@podlove/sagas'
import runtimeSaga from '@podlove/sagas/runtime'
import { createStore, applyMiddleware, compose } from 'redux'
import { connect } from 'redux-vuex'

import reducers from './reducers'
import actions from './actions'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(sagas.middleware)))

connect({ Vue, store, actions })

sagas.run(runtimeSaga)

export default store

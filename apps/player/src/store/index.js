import Vue from 'vue'
import sagas from '@podlove/sagas'
import runtimeSaga from '@podlove/sagas/runtime'
import lifecycleSaga from '@podlove/sagas/lifecycle'
import playerSaga from '@podlove/sagas/player'
import { createStore, applyMiddleware, compose } from 'redux'
import { connect } from 'redux-vuex'

import reducers from './reducers'
import actions from './actions'
import selectors from './selectors'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(sagas.middleware)))

connect({ Vue, store, actions })

// Connect Sagas
sagas.run(
  lifecycleSaga,
  runtimeSaga,
  playerSaga({ selectMedia: selectors.media, selectPlaytime: selectors.playtime })
)

export default store

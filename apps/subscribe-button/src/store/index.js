import Vue from 'vue'

import { createStore } from 'redux'
import { connect } from 'redux-vuex'

import reducers from './reducers'

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

connect({
  Vue,
  store
})

export default store

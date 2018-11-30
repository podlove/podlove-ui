import Vue from 'vue'
import { head } from 'lodash'

import App from './src/App'
import store from './src/store'

window.PODLOVE_STORE = store

new Vue({
  el: head(document.getElementsByTagName('podlove-web-player')),
  render: h => h(App)
})

/* eslint-disable no-global-assign, no-unused-vars */
/* globals __webpack_public_path__ */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './lang'

import List from './src/List'
import store from './src/store'

Vue.use(VueI18n)

// Use public path from application
__webpack_public_path__ = window.resourceBaseUrl || '/'

window.PODLOVE_STORE = store

const i18n = new VueI18n({
  locale: 'de',
  fallbackLocale: 'de',
  messages
})

new Vue({
  i18n,
  ...List
}).$mount('#app')

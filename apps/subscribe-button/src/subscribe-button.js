/* eslint-disable no-global-assign, no-unused-vars */
/* globals __webpack_public_path__ */
import { head } from 'ramda'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import App from '.'
import store from './store'

Vue.use(VueI18n)

// Use public path from application
__webpack_public_path__ = window.resourceBaseUrl || '/'

window.PSB_STORE = store

const i18n = new VueI18n({
  locale: 'de',
  fallbackLocale: 'de',
  messages: {
    // en: require('./lang/en.json'),
    de: require('../lang/de.json')
    // eo: require('./lang/eo.json')
  }
})

new Vue({
  i18n,
  el: head(document.getElementsByTagName('subscribe-button')),
  render: h => h(App)
})

/* eslint-disable no-global-assign, no-unused-vars */
/* globals __webpack_public_path__ */

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { head } from 'ramda'

import App from './src'
import store from './src/store'
import './src/directives'

Vue.use(VueI18n)

// Use public path from application
__webpack_public_path__ = window.resourceBaseUrl || '/'

window.PODLOVE_STORE = store

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: require('./lang/en.json'),
    de: require('./lang/de.json'),
    eo: require('./lang/eo.json')
  }
})

new Vue({
  i18n,
  el: head(document.getElementsByTagName('podlove-player')),
  render: h => h(App)
})

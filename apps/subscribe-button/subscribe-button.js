import Vue from 'vue'
import VueI18n from 'vue-i18n'

import App from './src'
import store from './src/store'

Vue.use(VueI18n)

// Use public path from application
// __webpack_public_path__ = window.resourceBaseUrl || '/'

window.PODLOVE_STORE = store

const i18n = new VueI18n({
  locale: 'de',
  fallbackLocale: 'de',
  messages: {
    // en: require('./lang/en.json'),
    de: require('./lang/de.json')
    // eo: require('./lang/eo.json')
  }
})

new Vue({
  i18n,
  el: document.getElementsByTagName('subscribe-button')[0],
  render: h => h(App)
})

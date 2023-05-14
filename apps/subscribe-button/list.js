/* eslint-disable no-global-assign, no-unused-vars */
/* globals __webpack_public_path__ */
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { provideStore } from 'redux-vuex'

import messages from './lang'

import List from './src/List'
import store from './src/store'

// Use public path from application
__webpack_public_path__ = window.resourceBaseUrl || '/'

window.PODLOVE_STORE = store

const i18n = createI18n({
  locale: 'de',
  fallbackLocale: 'en',
  messages
})

const app = createApp(List)

provideStore({ store, app })

app.use(i18n)
app.mount('#app')

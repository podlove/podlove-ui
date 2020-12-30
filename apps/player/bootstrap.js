/* eslint no-undef: 0 */
import { createApp } from 'vue/dist/vue.esm-bundler'
import { createI18n } from 'vue-i18n'
import { provideStore } from 'redux-vuex'

// Store
import { store, actions } from './src/store'

// Translations
import translations from './lang'

// Tooltip
import VTooltip from 'v-tooltip'

// Components
import components from './src/components'

// Use public path from application
__webpack_public_path__ = window.resourceBaseUrl || '/'

window.PODLOVE_STORE = store

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: translations
})

const app = createApp({
  components
})

provideStore({ store, app, actions })

app.use(i18n)
app.use(VTooltip)
app.mount('#app')

// @ts-ignore
import { createApp } from 'vue/dist/vue.esm-bundler'
import { createI18n } from 'vue-i18n'
import { provideStore } from 'redux-vuex'

// Store
import { store, actions } from './store/index.js'

// Translations
import translations from '../lang/index.js'

// Components
import components from './components/index.js'

export default function () {
  const i18n = createI18n({
    locale: 'en',
    legacy: false,
    fallbackLocale: 'en',
    messages: translations
  })

  const app = createApp({
    components
  })

  provideStore({ store, app, actions })

  app.use(i18n)

  return { app, store }
}

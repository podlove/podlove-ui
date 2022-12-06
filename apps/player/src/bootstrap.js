import './style.css'
import { createApp } from 'vue/dist/vue.esm-bundler'
import { createI18n } from 'vue-i18n'
import { provideStore } from 'redux-vuex'

// Store
import { store, actions } from './store'

// Translations
import translations from '../lang'

// Components
import components from './components'

// Use public path from application
window.__dynamicImportHandler__ = (importer) => window.resourceBaseUrl || '/' + importer

export default function bootstrap() {
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

  return { app, store }
}

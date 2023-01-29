import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { provideStore } from 'redux-vuex'

import messages from '../lang'

import Button from './Button.vue'
import store from './store'

// Use public path from application
window.__dynamicImportHandler__ = (importer) => window.resourceBaseUrl || '/' + importer

export default () => {
  const i18n = createI18n({
    locale: 'de',
    fallbackLocale: 'en',
    messages
  })

  const app = createApp(Button)

  app.use(i18n)
  provideStore({ store, app })

  return { store, app }
}

import { App, createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { provideStore } from 'redux-vuex';

import translations from '../lang/index.js';

import Button from './Button.vue';
import store from './store/index.js';
import { Store } from 'redux';

export default function (): { store: Store, app: App }  {
  const i18n = createI18n({
    locale: 'en',
    legacy: false,
    fallbackLocale: 'en',
    messages: translations
  });

  const app = createApp(Button);

  app.use(i18n);
  provideStore({ store, app });

  return { store, app };
}

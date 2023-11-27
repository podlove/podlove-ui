import { createApp, App } from 'vue';
import { createI18n } from 'vue-i18n';
import { provideStore } from 'redux-vuex';
import { Store } from 'redux';

import messages from '../lang/index.js';

import Button from './Button.vue';
import store from './store/index.js';

export default (): { store: Store, app: App } => {
  const i18n = createI18n({
    legacy: false,
    locale: 'de',
    fallbackLocale: 'en',
    globalInjection: true,
    messages
  });

  const app = createApp(Button);

  app.use(i18n);
  provideStore({ store, app });

  return { store, app };
};

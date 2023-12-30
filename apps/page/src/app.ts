import { provideStore } from 'redux-vuex';
import { createI18n } from 'vue-i18n';
import type { App } from 'vue';
import { messages, defaultLang, getLanguage } from './i18n';
import { store, actions } from './logic';

export default (app: App) => {
  const i18n = createI18n({
    legacy: false,
    locale: getLanguage(), // set locale
    fallbackLocale: defaultLang,
    messages
  });

  app.use(i18n);
  provideStore({ app, store, actions });
};

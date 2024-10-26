import { provideStore } from 'redux-vuex';
import { provideTranslations } from '@podlove/utils/translate';
import type { App } from 'vue';
import { messages, defaultLang, getLanguage } from './i18n';
import { store } from './logic';

export default (app: App<any>) => {
  provideTranslations({ lang: getLanguage(), defaultLang, messages, app });
  provideStore({ app, store });
};

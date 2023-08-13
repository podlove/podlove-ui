import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { provideStore } from 'redux-vuex';

import translations from '../lang/index.js';

import Button from './Button.vue';
import store from './store/index.js';

export default function ({ baseUrl }: { baseUrl?: string }) {
  // Use public path from application
  (window as any).__dynamicImportHandler__ = (importer) => baseUrl || '/' + importer;

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

// import { findNode } from '@podlove/utils/dom';
// import { init } from '@podlove/button-actions/lifecycle';
// import { createI18n } from 'vue-i18n';

// import type { PodloveSubscribeButtonConfig } from '@podlove/types';

// import createButton from './app.js';
// import parseConfig from './embed/config.js';
// import overlayStyle from './embed/overlay.js';

// import translations from '../lang/index.js';

// export async function createApp({ baseUrl }: { baseUrl?: string }) {
//   // Use public path from application
//   (window as any).__dynamicImportHandler__ = (importer) => baseUrl || '/' + importer;

//   const { app, store } = createButton();

//   const i18n = createI18n({
//     locale: 'en',
//     legacy: false,
//     fallbackLocale: 'en',
//     messages: translations
//   });
// }

// return {
//   mount: (selector: string | HTMLElement) => {
//     const entry = findNode(selector);
//     const shadow = entry.attachShadow({ mode: 'open' });

//     const styling = document.createElement('style');
//     styling.textContent = styles;

//     app.mount(shadow as unknown as HTMLElement);

//     shadow.appendChild(styling);

//     store.dispatch(init(config));

//     overlayStyle(store, entry);

//     return store;
//   },
//   store
// };

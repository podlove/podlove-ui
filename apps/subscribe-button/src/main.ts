import { findNode } from '@podlove/utils/dom';
import { init } from '@podlove/button-actions/lifecycle';
import type { PodloveSubscribeButtonConfig } from '@podlove/types';

import createButton from './app';
import parseConfig from './embed/config';
import overlayStyle from './embed/overlay';

import styles from './env.css?inline';

export async function createApp(
  buttonConfig: Partial<PodloveSubscribeButtonConfig>,
  additionalConfig?: Partial<PodloveSubscribeButtonConfig>
) {
  const config = await parseConfig(buttonConfig, additionalConfig);
  const { app, store } = createButton();

  return {
    mount: (selector: string | HTMLElement) => {
      const entry = findNode(selector);
      const shadow = entry.attachShadow({ mode: 'open' });

      // const styling = document.createElement('link');
      // styling.setAttribute('rel', 'stylesheet');
      // styling.setAttribute('href', './dist/subscribe-button.css');

      const styling = document.createElement('style');
      styling.textContent = styles;

      app.mount(shadow as unknown as HTMLElement);

      shadow.appendChild(styling);

      store.dispatch(init(config));

      overlayStyle(store, entry);

      return store;
    },
    store
  };
}

import { App } from 'vue';
import { Store } from 'redux';
import { PodloveSubscribeButtonConfig } from '@podlove/types';
import { init } from '@podlove/button-actions/lifecycle';
import { json } from '@podlove/utils/request';
import styles from './styles.css?inline';

import createSubscribeButton from './app.js'
import pkg from '../package.json';

interface AppInstance {
  store: Store;
  app: App;
}

class PodloveSubscribeButton extends HTMLElement {
  private instance: AppInstance;

  async connectedCallback() {
    this.instance = createSubscribeButton();

    if (!this.getAttribute('config')) {
      return;
    }

    await this.init(this.getAttribute('config'));
  }

  private async fetchConfig(config: string | PodloveSubscribeButtonConfig): Promise<PodloveSubscribeButtonConfig> {
    try {
      return await json<PodloveSubscribeButtonConfig>(config);
    } catch (err) {
      console.warn(
        `Podlove Subscribe Button ${pkg.version}`,
        `Couldn't parse transcripts, falling back to empty list`
      );
      return {} as PodloveSubscribeButtonConfig;
    }
  }

  private mount() {
    // @ts-ignore
    const shadow = import.meta.env.MODE === 'development' ? this : this.attachShadow({ mode: 'open' });
    this.instance.app.mount(shadow);
    const styling = document.createElement('style');
    styling.appendChild(document.createTextNode(styles));
    shadow.appendChild(styling);
  }

  public async init(
    config: string | PodloveSubscribeButtonConfig
  ): Promise<Store> {
    const resolvedConfig = await this.fetchConfig(config)
    this.instance.store.dispatch(init(resolvedConfig));

    this.dispatchEvent(
      new CustomEvent<Store>('init', {
        bubbles: true,
        cancelable: false,
        detail: this.instance.store
      })
    );

    this.mount();

    return this.instance.store;
  }
}

if (customElements.get('podlove-subscribe-button') === undefined) {
  customElements.define('podlove-subscribe-button', PodloveSubscribeButton);
}

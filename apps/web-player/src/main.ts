import createPlayer from '@podlove/player';
import { Store } from 'redux';
import { App } from 'vue';
import createSubscribeButton from '@podlove/subscribe-button';
import { init as playerInit } from '@podlove/player-actions/lifecycle';
import { init as buttonInit } from '@podlove/button-actions/lifecycle';
import { PodloveWebPlayerConfig, PodloveWebPlayerEpisode } from '@podlove/types';
import * as configParser from '@podlove/player-config';

import { parseConfig, parseEpisode, subscribeButtonConfig } from './lib/data.js';
import { createEntry } from './lib/entry.js';
import connect from './lib/connect.js';
import restore from './lib/restore.js';
import { mergeDeepRight } from 'ramda';

class PodloveWebPlayer extends HTMLElement {
  public player: { store: Store; app: App };
  public subscribeButton: { store: Store; app: App };

  async connectedCallback() {
    this.player = createPlayer();
    this.subscribeButton = createSubscribeButton();

    if (!this.getAttribute('episode')) {
      return;
    }

    await this.init(this.getAttribute('episode'), this.getAttribute('config'));
  }

  public async init(
    episode: string | PodloveWebPlayerEpisode,
    config: string | PodloveWebPlayerConfig
  ) {
    const [resolvedEpisode, resolvedConfig] = await Promise.all([
      parseEpisode(episode),
      parseConfig(config, episode)
    ]);

    const data = mergeDeepRight(resolvedEpisode, resolvedConfig);
    this.player.store.dispatch(playerInit(data as unknown as PodloveWebPlayerEpisode));

    if (configParser.subscribeButton(data)) {
      this.subscribeButton.store.dispatch(buttonInit(subscribeButtonConfig(data)));
    }

    // inter store connection
    connect(
      { store: this.player.store, prefix: 'PLAYER' },
      { store: this.subscribeButton.store, prefix: 'BUTTON' }
    );

    restore(resolvedConfig, this.player.store);

    const entry = await createEntry(this);

    this.player.app.mount(entry.player);
    this.subscribeButton.app.mount(entry.subscribeButton);

    return { player: this.player, subscribeButton: this.subscribeButton };
  }
}

customElements.define('podlove-web-player', PodloveWebPlayer);

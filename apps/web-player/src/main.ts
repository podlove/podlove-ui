import { propOr } from 'ramda';
import createPlayer from '@podlove/player';
import createSubscribeButton from '@podlove/subscribe-button';
import { init as playerInit } from '@podlove/player-actions/lifecycle';
import { init as buttonInit } from '@podlove/button-actions/lifecycle';
import { PodloveWebPlayerConfig, PodloveWebPlayerEpisode } from '@podlove/types';
import * as configParser from '@podlove/player-config';

import { parseConfig, subscribeButtonConfig } from './lib/config.js';
import { createEntry } from './lib/entry.js';
import connect from './lib/connect.js';
import restore from './lib/restore.js';

export default async function (
  episode: string | PodloveWebPlayerEpisode,
  meta: string | PodloveWebPlayerConfig
) {
  // Use public path from application
  const config = await parseConfig(episode, meta);

  const baseUrl = propOr('', 'base', config.reference);

  globalThis.__dynamicImportHandler__ = (importer) => baseUrl || '/' + importer;

  const player = createPlayer();
  const subscribeButton = createSubscribeButton();

  player.store.dispatch(playerInit(config));

  if (configParser.subscribeButton(config)) {
    subscribeButton.store.dispatch(buttonInit(subscribeButtonConfig(config)));
  }
  // inter store connection
  connect(
    { store: player.store, prefix: 'PLAYER' },
    { store: subscribeButton.store, prefix: 'BUTTON' }
  );

  restore(config, player.store);

  const mount = async (
    selector: string | HTMLElement
  ): Promise<{
    player: HTMLElement;
    subscribeButton: HTMLElement;
  }> => {
    const entry = await createEntry(selector);

    player.app.mount(entry.player);
    subscribeButton.app.mount(entry.subscribeButton);

    return {
      player: entry.player,
      subscribeButton: entry.subscribeButton
    };
  };

  return { mount, player, subscribeButton };
}

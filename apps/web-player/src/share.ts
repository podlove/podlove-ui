/* eslint-disable no-console */
import { init } from '@podlove/player-actions/lifecycle';
import createPlayer from '@podlove/player';
import { propOr } from 'ramda';

import pkg from '../package.json';

import { parseConfig } from './lib/config.js';
import restore from './lib/restore.js';

export default async ({ episode, config }) => {
  try {
    const playerConfig = await parseConfig(episode, config);
    const baseUrl = propOr('', 'base', playerConfig.reference);

    globalThis.__dynamicImportHandler__ = (importer) => baseUrl || '/' + importer;

    const { store, app } = createPlayer();
    store.dispatch(init(playerConfig));
    restore(playerConfig, store);

    return app;
  } catch (err) {
    console.group(`Can't load Podlove Webplayer ${pkg.version}`);
    console.error('config', episode);
    console.error(err);
    console.groupEnd();
  }
};

/* eslint-disable no-console */
import { init } from '@podlove/player-actions/lifecycle';
import createPlayer from '@podlove/player';
import { propOr } from 'ramda';

import { parseConfig } from './lib/config.js';
import restore from './lib/restore.js';
import './styles.css';

export default async ({ episode, config }) => {
  const playerConfig = await parseConfig(episode, config);
  const baseUrl = propOr('', 'base', playerConfig.reference);

  globalThis.__dynamicImportHandler__ = (importer) => baseUrl || '/' + importer;

  const { store, app } = createPlayer();
  store.dispatch(init(playerConfig));
  restore(playerConfig, store);

  return { store, app };
};

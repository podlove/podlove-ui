import { createSelector } from 'reselect';
import { selectors as playlist } from '@podlove/player-state/playlist';

import root from './root.js';

export default {
  list: createSelector(root.playlist, playlist.list),
  config: createSelector(root.playlist, playlist.config)
};

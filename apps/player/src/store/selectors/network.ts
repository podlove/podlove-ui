import { createSelector } from 'reselect';
import { selectors as network } from '@podlove/player-state/network';

import root from './root.js';

const buffer = createSelector(root.network, network.buffer);

export default {
  buffer
};

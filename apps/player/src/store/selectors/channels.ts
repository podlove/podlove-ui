import { createSelector } from 'reselect';
import { selectors } from '@podlove/player-state/channels';
import root from './root.js';

export default createSelector(root.channels, selectors.channels);

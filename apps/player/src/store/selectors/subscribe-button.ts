import { selectors as subscribeButton } from '@podlove/player-state/subscribe-button';
import root from './root.js';
import { createSelector } from 'reselect';

export default {
  available: createSelector(root.subscribeButton, subscribeButton.available)
};

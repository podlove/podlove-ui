import { selectors as audio } from '@podlove/player-state/audio';

import root from './root.js';
import { createSelector } from 'reselect';

const volume = createSelector(root.audio, audio.volume);
const muted = createSelector(root.audio, audio.muted);
const rate = createSelector(root.audio, audio.rate);

const icon = (state) => {
  if (muted(state)) {
    return 'speaker-0';
  }

  if (volume(state) >= 0.75) {
    return 'speaker-75';
  }

  if (volume(state) >= 0.5) {
    return 'speaker-50';
  }

  if (volume(state) > 0) {
    return 'speaker-25';
  }

  return 'speaker-0';
};

export default {
  volume,
  muted,
  icon,
  rate
};

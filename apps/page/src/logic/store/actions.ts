import { setVolume } from '@podlove/player-actions/audio';
import { setRate } from '@podlove/player-actions/audio';
import { simulatePlaytime } from '@podlove/player-actions/timepiece';
import { enableGhost, disableGhost } from '@podlove/player-actions/progress';

import { actions as lifecycle } from './stores/runtime.store';
import { actions as episodes } from './stores/episodes.store';
import { actions as search } from './stores/search.store';
import { actions as player } from './stores/player.store';
import { actions as playbar } from './stores/playbar.store';
import { actions as subscribeButton } from './stores/subscribe-button.store';
import { actions as router } from './stores/router.store';

export default {
  episodes,
  player,
  playbar,
  subscribeButton,
  search,
  lifecycle,
  router,
  setVolume,
  setRate,
  simulatePlaytime,
  disableGhost,
  enableGhost
};

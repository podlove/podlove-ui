import { combineReducers } from 'redux';
import { reducer as driver } from '@podlove/player-state/driver';
import { reducer as show } from '@podlove/player-state/show';
import { reducer as media } from '@podlove/player-state/media';
import { reducer as timepiece } from '@podlove/player-state/timepiece';
import { reducer as episode } from '@podlove/player-state/episode';
import { reducer as audio } from '@podlove/player-state/audio';
import { reducer as network } from '@podlove/player-state/network';
import { reducer as ghost } from '@podlove/player-state/ghost';
import { reducer as chapters } from '@podlove/player-state/chapters';
import { reducer as quantiles } from '@podlove/player-state/quantiles';

import { reducer as runtime } from './stores/runtime.store';
import { reducer as theme } from './stores/theme.store';
import { reducer as podcast } from './stores/podcast.store';
import { reducer as action } from './stores/action.store';
import { reducer as episodes } from './stores/episodes.store';
import { reducer as playbar } from './stores/playbar.store';
import { reducer as player } from './stores/player.store';
import { reducer as search } from './stores/search.store';
import { reducer as subscribeButton } from './stores/subscribe-button.store';
import { reducer as router } from './stores/router.store';
import { reducer as contributors } from './stores/contributors.store';
import { reducer as view } from './stores/view.store';
import { reducer as colors } from './stores/colors.store';

export default combineReducers({
  runtime,
  action,
  episodes,
  playbar,
  podcast,
  theme,
  player: combineReducers({
    quantiles,
    chapters,
    ghost,
    network,
    driver,
    show,
    media,
    timepiece,
    episode,
    audio,
    current: player
  }),
  search,
  subscribeButton,
  router,
  contributors,
  view,
  colors
});

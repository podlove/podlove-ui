import { type State as driver } from '@podlove/player-state/driver';
import { type State as show } from '@podlove/player-state/show';
import { type State as media } from '@podlove/player-state/media';
import { type State as timepiece } from '@podlove/player-state/timepiece';
import { type State as episode } from '@podlove/player-state/episode';
import { type State as audio } from '@podlove/player-state/audio';
import { type State as network } from '@podlove/player-state/network';
import { type State as ghost } from '@podlove/player-state/ghost';
import { type State as chapters } from '@podlove/player-state/chapters';
import { type State as quantiles } from '@podlove/player-state/quantiles';

import { type State as runtime } from './stores/runtime.store';
import { type State as theme } from './stores/theme.store';
import { type State as podcast } from './stores/podcast.store';
import { type State as action } from './stores/action.store';
import { type State as episodes } from './stores/episodes.store';
import { type State as playbar } from './stores/playbar.store';
import { type State as player } from './stores/player.store';
import { type State as router } from './stores/router.store';
import { type State as search } from './stores/search.store';
import { type State as subscribeButton } from './stores/subscribe-button.store';

export default interface State {
  runtime: runtime,
  podcast: podcast,
  action: action,
  episodes: episodes,
  playbar: playbar,
  theme: theme,
  player: {
    quantiles: quantiles,
    chapters: chapters,
    ghost: ghost,
    network: network,
    driver: driver,
    show: show,
    media: media,
    timepiece: timepiece,
    episode: episode,
    audio: audio,
    current: player
  },
  router: router,
  search: search,
  subscribeButton: subscribeButton
};

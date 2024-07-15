import { type State as runtime } from './stores/runtime.store';
import { type State as podcast } from './stores/podcast.store';
import { type State as action } from './stores/action.store';
import { type State as episodes } from './stores/episodes.store';
import { type State as playbar } from './stores/playbar.store';
import { type State as player } from './stores/player.store';
import { type State as search } from './stores/search.store';
import { type State as subscribeButton } from './stores/subscribe-button.store';
import { type State as router } from './stores/router.store';
import { type State as contributors } from './stores/contributors.store';
import { type State as view } from './stores/view.store';
import { type State as colors } from './stores/colors.store';

export default interface State {
  runtime: runtime,
  podcast: podcast,
  action: action,
  episodes: episodes,
  playbar: playbar,
  search: search,
  subscribeButton: subscribeButton,
  player: player,
  router: router,
  contributors: contributors,
  view: view,
  colors: colors
};

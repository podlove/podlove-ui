import sagasEngine from '@podlove/player-sagas/middleware';

import { selectors } from '../store';
import dataSagas from './data.sagas';
import episodeSagas from './episode.sagas';
import playbarSagas from './playbar.sagas';

export function createSideEffects() {
  const sagas = [
    dataSagas({ selectInitializedApp: selectors.runtime.initialized }),
    episodeSagas({
      selectEpisode: selectors.episode.data,
      selectShow: selectors.podcast.show,
      selectRate: selectors.player.audio.rate,
      selectVolume: selectors.player.audio.volume,
      selectMuted: selectors.player.audio.muted,
      selectCurrentEpisode: selectors.current.episode,
      selectPlaying: selectors.player.playing
    }),
    playbarSagas({
      selectRate: selectors.player.audio.rate,
      selectMuted: selectors.player.audio.muted
    })
  ];
  sagasEngine.run(...sagas);
}

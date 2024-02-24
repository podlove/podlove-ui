import sagasEngine from '@podlove/player-sagas/middleware';
import { quantilesSaga } from '@podlove/player-sagas/quantiles';
import { chaptersSaga } from '@podlove/player-sagas/chapters';
import { stepperSaga } from '@podlove/player-sagas/stepper';
import { lifeCycleSaga } from '@podlove/player-sagas/lifecycle';

import { selectors } from '../store';
import dataSagas from './data.sagas';
import episodeSagas from './episode.sagas';
import playbarSagas from './playbar.sagas';
import routerSaga from './router.sagas';

import { isClient } from '../../lib/runtime';
import serviceworkerSaga from './serviceworker.sagas';
import searchSaga from './search.sagas';
import layoutSaga from './layout.sagas';

export async function createSideEffects() {
  const sagas = [
    lifeCycleSaga,
    routerSaga,
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
    chaptersSaga({
      selectDuration: selectors.player.duration,
      selectPlaytime: selectors.player.playtime,
      selectCurrentChapter: selectors.player.chapters.current,
      selectChapterList: selectors.player.chapters.list
    }),
    stepperSaga({
      selectDuration: selectors.player.duration,
      selectPlaytime: selectors.player.playtime,
      selectLivesync: selectors.player.livesync
    }),
    quantilesSaga,
    playbarSagas({
      selectRate: selectors.player.audio.rate,
      selectMuted: selectors.player.audio.muted
    }),
    layoutSaga({
      selectSearchOverlayVisible: selectors.search.visible,
      selectSubscribeOverlayVisible: selectors.subscribeButton.visible,
    })
  ] as any[];

  if (isClient()) {
    sagas.push(serviceworkerSaga({
      selectFeed: selectors.podcast.feed,
      selectCacheKey: selectors.runtime.cacheKey,
    }));

    sagas.push(searchSaga({
      selectInitialized: selectors.search.initialized,
      selectEpisodes: selectors.episodes.list,
      selectContributors: selectors.contributors.list,
      selectVisible: selectors.search.visible,
      selectResults: selectors.search.results,
      selectSelectedResult: selectors.search.selectedResult,
    }))

    const { playerSaga } = await import('@podlove/player-sagas/player');

    sagas.push(
      playerSaga({
        selectMedia: selectors.player.media,
        selectPlaytime: selectors.player.playtime,
        selectPoster: selectors.player.image,
        selectTitle: selectors.player.title,
        mountPoint: document.getElementById('media-container') as HTMLDivElement
      })
    );
  }

  sagasEngine.run(...sagas);
}

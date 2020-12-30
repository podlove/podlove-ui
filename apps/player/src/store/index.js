import sagas from '@podlove/player-sagas'
import { runtimeSaga } from '@podlove/player-sagas/runtime'
import { lifeCycleSaga } from '@podlove/player-sagas/lifecycle'
import { playerSaga } from '@podlove/player-sagas/player'
import { componentsSaga } from '@podlove/player-sagas/components'
import { chaptersSaga } from '@podlove/player-sagas/chapters'
import { quantilesSaga } from '@podlove/player-sagas/quantiles'
import { versionSaga } from '@podlove/player-sagas/version'
import { transcriptsSaga } from '@podlove/player-sagas/transcripts'
import { stepperSaga } from '@podlove/player-sagas/stepper'
import { errorSaga } from '@podlove/player-sagas/error'
import { keyboardSaga } from '@podlove/player-sagas/keyboard'
import { playlistSaga } from '@podlove/player-sagas/playlist'
import { mediaSessionSaga } from '@podlove/player-sagas/media-session'

import { createStore, applyMiddleware, compose } from 'redux'
import { version } from '../../package'

import reducers from './reducers'
import actions from './actions'
import selectors from './selectors'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(sagas.middleware)))

// Connect Sagas
sagas.run(
  lifeCycleSaga,
  runtimeSaga,
  componentsSaga({
    selectPlaylist: selectors.playlist.list,
    selectChapters: selectors.chapters.list,
    selectTranscripts: selectors.transcripts.hasTranscripts,
    selectFiles: selectors.files.files,
    selectEpisodeCover: selectors.episode.poster,
    selectEpisodeTitle: selectors.episode.title,
    selectEpisodeSubtitle: selectors.episode.subtitle,
    selectShowTitle: selectors.show.title,
    selectShowCover: selectors.show.poster,
    selectRuntimeMode: selectors.mode,
    selectRuntimePlatform: selectors.platform,
    selectChannels: selectors.channels,
    selectEmbedLink: selectors.share.hasEmbedLink
  }),
  quantilesSaga,
  chaptersSaga({
    selectDuration: selectors.duration,
    selectPlaytime: selectors.playtime,
    selectCurrentChapter: selectors.chapters.current,
    selectChapterList: selectors.chapters.list
  }),
  playerSaga({
    selectMedia: selectors.media,
    selectPlaytime: selectors.playtime,
    selectPoster: selectors.driver.image,
    selectTitle: selectors.driver.title
  }),
  versionSaga({ version: pkg.version }),
  transcriptsSaga({
    selectChapters: selectors.chapters.list,
    selectSpeakers: selectors.contributors.list,
    selectPlaytime: selectors.playtime
  }),
  stepperSaga({
    selectDuration: selectors.duration,
    selectPlaytime: selectors.playtime,
    selectLivesync: selectors.livesync
  }),
  errorSaga,
  keyboardSaga({
    selectDuration: selectors.duration,
    selectPlaytime: selectors.playtime,
    selectPlaystate: selectors.driver.playing,
    selectRate: selectors.audio.rate,
    selectVolume: selectors.audio.volume,
    selectMuted: selectors.audio.muted
  }),
  playlistSaga({
    selectEpisodeConfig: selectors.playlist.config,
    selectPlaystate: selectors.driver.playing,
    selectVolume: selectors.audio.volume,
    selectRate: selectors.audio.rate,
    selectMuted: selectors.audio.muted,
    selectPlaylist: selectors.playlist.list,
    selectReference: selectors.reference.episode
  }),
  mediaSessionSaga({
    selectPoster: selectors.driver.image,
    selectDuration: selectors.duration,
    selectPlaytime: selectors.playtime,
    selectShow: selectors.show.title,
    selectTitle: selectors.episode.title,
    selectChapterTitle: selectors.chapters.title
  })
)

export { actions, selectors, store }

import Vue from 'vue'
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

import { createStore, applyMiddleware, compose } from 'redux'
import { connect } from 'redux-vuex'
import { version } from '../../package'

import reducers from './reducers'
import actions from './actions'
import selectors from './selectors'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(sagas.middleware)))

connect({ Vue, store, actions })

// Connect Sagas
sagas.run(
  lifeCycleSaga,
  runtimeSaga,
  componentsSaga,
  quantilesSaga,
  chaptersSaga({
    selectDuration: selectors.duration,
    selectPlaytime: selectors.playtime,
    selectCurrentChapter: selectors.chapters.current,
    selectChapterList: selectors.chapters.list
  }),
  playerSaga({ selectMedia: selectors.media, selectPlaytime: selectors.playtime }),
  versionSaga({ version }),
  transcriptsSaga({
    selectChapters: selectors.chapters.list,
    selectSpeakers: selectors.contributors
  }),
  stepperSaga({
    selectDuration: selectors.duration,
    selectPlaytime: selectors.playtime
  })
)

export default store

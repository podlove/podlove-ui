import { put, takeEvery, select } from 'redux-saga/effects'
import { isEmpty } from 'ramda'
import {
  READY,
  BACKEND_PLAY,
  BACKEND_PAUSE,
  BACKEND_LOADING_START,
  BACKEND_LOADING_END,
  BACKEND_END,
  SET_TRANSCRIPTS_TIMELINE,
  SET_CHAPTERS_LIST
} from '@podlove/player-actions/types'
import {
  showPlayingButton,
  showLoadingButton,
  showPauseButton,
  showProgressBar,
  showSteppersControls,
  showChapterControls,
  showReplayButton,
  hideComponentTab,
  showComponentTab,
  hideChapterControls,
  showInfoPoster,
  hideInfoPoster,
  hideEpisodeTitle,
  showSubtitle,
  showEpisodeTitle,
  hideSubtitle,
  showShowTitle,
  hideShowTitle,
  showVolumeSlider,
  hideVolumeSlider,
  showRateSlider
} from '@podlove/player-actions/components'

export const componentsSaga = ({
  selectTranscripts,
  selectChapters,
  selectFiles,
  selectEpisodeCover,
  selectEpisodeTitle,
  selectEpisodeSubtitle,
  selectShowTitle,
  selectShowCover,
  selectRuntimeMode
}) =>
  function* saga() {
    yield takeEvery(READY, init, {
      selectFiles,
      selectEpisodeCover,
      selectEpisodeTitle,
      selectEpisodeSubtitle,
      selectShowTitle,
      selectShowCover,
      selectRuntimeMode
    })
    yield takeEvery(SET_TRANSCRIPTS_TIMELINE, transcripts, { selectTranscripts })
    yield takeEvery(SET_CHAPTERS_LIST, chapters, { selectChapters })
    yield takeEvery(BACKEND_PLAY, play, { selectChapters })
    yield takeEvery(BACKEND_PAUSE, pause)
    yield takeEvery(BACKEND_LOADING_START, loading)
    yield takeEvery(BACKEND_LOADING_END, loaded)
    yield takeEvery(BACKEND_END, replay)
  }

export function* init({
  selectFiles,
  selectEpisodeCover,
  selectEpisodeTitle,
  selectEpisodeSubtitle,
  selectShowCover,
  selectRuntimeMode,
  selectShowTitle
}) {
  const files = yield select(selectFiles)
  const showCover = yield select(selectShowCover)
  const episodeCover = yield select(selectEpisodeCover)
  const episodeTitle = yield select(selectEpisodeTitle)
  const subtitle = yield select(selectEpisodeSubtitle)
  const showTitle = yield select(selectShowTitle)
  const mode = yield select(selectRuntimeMode)

  // Header
  yield put(!!showCover || !!episodeCover ? showInfoPoster() : hideInfoPoster())
  yield put(episodeTitle ? showEpisodeTitle() : hideEpisodeTitle())
  yield put(subtitle ? showSubtitle() : hideSubtitle())
  yield put(showTitle ? showShowTitle() : hideShowTitle())

  // Tabs
  yield put(!isEmpty(files) ? showComponentTab('files') : hideComponentTab('files'))
  yield put(showComponentTab('info'))
  yield put(showComponentTab('audio'))
  yield put(showComponentTab('share'))

  // Audio Inputs
  yield put(mode === 'native' ? showVolumeSlider() : hideVolumeSlider())
  yield put(showRateSlider())
}

export function* transcripts({ selectTranscripts }) {
  const transcripts = !isEmpty(yield select(selectTranscripts))
  yield put(transcripts ? showComponentTab('transcripts') : hideComponentTab('transcripts'))
}

export function* chapters({ selectChapters }) {
  const chapters = !isEmpty(yield select(selectChapters))
  yield put(chapters ? showComponentTab('chapters') : hideComponentTab('chapters'))
}

export function* play({ selectChapters }) {
  const chapters = !isEmpty(yield select(selectChapters))

  yield put(showPlayingButton())
  yield put(showProgressBar())
  yield put(showSteppersControls())
  yield put(chapters ? showChapterControls() : hideChapterControls())
}

export function* pause() {
  yield put(showPauseButton())
}

export function* loading() {
  yield put(showLoadingButton())
}

export function* loaded({ payload }) {
  if (payload.paused) {
    yield put(showPauseButton())
  } else {
    yield put(showPlayingButton())
  }
}

export function* replay() {
  yield put(showReplayButton())
}

import { compose, propOr, includes, equals, length } from 'ramda'
import {
  showInfoTab,
  hideInfoTab,
  showChaptersTab,
  hideChaptersTab,
  showFilesTab,
  hideFilesTab,
  showAudioTab,
  hideAudioTab,
  showShareTab,
  hideShareTab,
  showTranscriptsTab,
  hideTranscriptsTab,

  // Header
  showInfoPoster,
  hideInfoPoster,
  showShowTitle,
  hideShowTitle,
  showEpisodeTitle,
  hideEpisodeTitle,
  showSubtitle,
  hideSubtitle,

  // Controls
  showChapterControls,
  hideChapterControls,
  showSteppersControls,
  hideSteppersControls,
  showProgressBar,
  hideProgressBar
} from '@podlove/player-actions/visible-components'

const emptyList = compose(
  equals(0),
  length
)

const infoTab = includes('tabInfo')
const chaptersTab = includes('tabChapters')
const filesTab = includes('tabFiles')
const audioTab = includes('tabAudio')
const shareTab = includes('tabShare')
const transcriptsTab = includes('tabTranscripts')
const poster = includes('poster')
const showTitle = includes('showTitle')
const episodeTitle = includes('episodeTitle')
const subtitle = includes('subtitle')
const progressbar = includes('progressbar')
const controlSteppers = includes('controlSteppers')
const controlChapters = includes('controlChapters')

export const setVisibleComponents = (config, store) => {
  const visibleComponents = propOr([], 'visibleComponents', config)

  if (emptyList(visibleComponents)) {
    return
  }

  if (infoTab(visibleComponents)) {
    store.dispatch(showInfoTab())
  } else {
    store.dispatch(hideInfoTab())
  }

  if (chaptersTab(visibleComponents)) {
    store.dispatch(showChaptersTab())
  } else {
    store.dispatch(hideChaptersTab())
  }

  if (filesTab(visibleComponents)) {
    store.dispatch(showFilesTab())
  } else {
    store.dispatch(hideFilesTab())
  }

  if (audioTab(visibleComponents)) {
    store.dispatch(showAudioTab())
  } else {
    store.dispatch(hideAudioTab())
  }

  if (shareTab(visibleComponents)) {
    store.dispatch(showShareTab())
  } else {
    store.dispatch(hideShareTab())
  }

  if (transcriptsTab(visibleComponents)) {
    store.dispatch(showTranscriptsTab())
  } else {
    store.dispatch(hideTranscriptsTab())
  }

  if (poster(visibleComponents)) {
    store.dispatch(showInfoPoster())
  } else {
    store.dispatch(hideInfoPoster())
  }

  if (showTitle(visibleComponents)) {
    store.dispatch(showShowTitle())
  } else {
    store.dispatch(hideShowTitle())
  }

  if (episodeTitle(visibleComponents)) {
    store.dispatch(showEpisodeTitle())
  } else {
    store.dispatch(hideEpisodeTitle())
  }

  if (subtitle(visibleComponents)) {
    store.dispatch(showSubtitle())
  } else {
    store.dispatch(hideSubtitle())
  }

  if (progressbar(visibleComponents)) {
    store.dispatch(showProgressBar())
  } else {
    store.dispatch(hideProgressBar())
  }

  if (controlSteppers(visibleComponents)) {
    store.dispatch(showSteppersControls())
  } else {
    store.dispatch(hideSteppersControls())
  }

  if (controlChapters(visibleComponents)) {
    store.dispatch(showChapterControls())
  } else {
    store.dispatch(hideChapterControls())
  }
}

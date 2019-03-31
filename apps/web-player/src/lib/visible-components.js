import { compose, propOr, includes, equals, length } from 'ramda'
import {
  showComponentTab,
  hideComponentTab,
  showInfoPoster,
  hideInfoPoster,
  showShowTitle,
  hideShowTitle,
  showEpisodeTitle,
  hideEpisodeTitle,
  showSubtitle,
  hideSubtitle,
  hideChapterControls,
  showChapterControls,
  showSteppersControls,
  hideSteppersControls,
  showProgressBar,
  hideProgressBar
} from '@podlove/player-actions/components'

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
    store.dispatch(showComponentTab('info'))
  } else {
    store.dispatch(hideComponentTab('info'))
  }

  if (chaptersTab(visibleComponents)) {
    store.dispatch(showComponentTab('chapters'))
  } else {
    store.dispatch(hideComponentTab('chapters'))
  }

  if (filesTab(visibleComponents)) {
    store.dispatch(showComponentTab('files'))
  } else {
    store.dispatch(hideComponentTab('files'))
  }

  if (audioTab(visibleComponents)) {
    store.dispatch(showComponentTab('audio'))
  } else {
    store.dispatch(hideComponentTab('audio'))
  }

  if (shareTab(visibleComponents)) {
    store.dispatch(showComponentTab('share'))
  } else {
    store.dispatch(hideComponentTab('share'))
  }

  if (transcriptsTab(visibleComponents)) {
    store.dispatch(showComponentTab('transcripts'))
  } else {
    store.dispatch(hideComponentTab('transcripts'))
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

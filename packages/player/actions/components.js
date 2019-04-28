import { createAction } from 'redux-actions'

import {
  SHOW_COMPONENT_INFO,
  SHOW_COMPONENT_INFO_POSTER,
  SHOW_COMPONENT_CONTROLS_BUTTON,
  SHOW_COMPONENT_TAB,
  SHOW_COMPONENT_VOLUME_SLIDER,
  SHOW_COMPONENT_RATE_SLIDER,
  SHOW_COMPONENT_CHANNELS,
  SHOW_COMPONENT_PROGRESSBAR,
  SHOW_COMPONENT_CONTROLS_STEPPERS,
  SHOW_COMPONENT_CONTROLS_CHAPTERS,
  SHOW_COMPONENT_CONTROLS_BUTTON_LOADING,
  SHOW_COMPONENT_CONTROLS_BUTTON_REPLAY,
  SHOW_COMPONENT_CONTROLS_BUTTON_REMAINING,
  SHOW_COMPONENT_CONTROLS_BUTTON_DURATION,
  SHOW_COMPONENT_CONTROLS_BUTTON_RETRY,
  SHOW_COMPONENT_CONTROLS_BUTTON_PLAYING,
  SHOW_COMPONENT_CONTROLS_BUTTON_PAUSE,
  SHOW_COMPONENT_SHOW_TITLE,
  SHOW_COMPONENT_EPISODE_TITLE,
  SHOW_COMPONENT_SUBTITLE,
  HIDE_COMPONENT_INFO,
  HIDE_COMPONENT_INFO_POSTER,
  HIDE_COMPONENT_ERROR,
  HIDE_COMPONENT_CONTROLS_CHAPTERS,
  HIDE_COMPONENT_CONTROLS_STEPPERS,
  HIDE_COMPONENT_CONTROLS_BUTTON,
  HIDE_COMPONENT_PROGRESSBAR,
  HIDE_COMPONENT_TAB,
  HIDE_COMPONENT_VOLUME_SLIDER,
  HIDE_COMPONENT_RATE_SLIDER,
  HIDE_COMPONENT_CHANNELS,
  HIDE_COMPONENT_SHOW_TITLE,
  HIDE_COMPONENT_EPISODE_TITLE,
  HIDE_COMPONENT_SUBTITLE
} from './types'

export const showInfo = createAction(SHOW_COMPONENT_INFO)
export const showShowTitle = createAction(SHOW_COMPONENT_SHOW_TITLE)
export const showEpisodeTitle = createAction(SHOW_COMPONENT_EPISODE_TITLE)
export const showSubtitle = createAction(SHOW_COMPONENT_SUBTITLE)
export const showProgressBar = createAction(SHOW_COMPONENT_PROGRESSBAR)
export const showInfoPoster = createAction(SHOW_COMPONENT_INFO_POSTER)
export const showChapterControls = createAction(SHOW_COMPONENT_CONTROLS_CHAPTERS)
export const showSteppersControls = createAction(SHOW_COMPONENT_CONTROLS_STEPPERS)
export const showButtonControl = createAction(SHOW_COMPONENT_CONTROLS_BUTTON)
export const showLoadingButton = createAction(SHOW_COMPONENT_CONTROLS_BUTTON_LOADING)
export const showReplayButton = createAction(SHOW_COMPONENT_CONTROLS_BUTTON_REPLAY)
export const showRemainingButton = createAction(SHOW_COMPONENT_CONTROLS_BUTTON_REMAINING)
export const showDurationButton = createAction(SHOW_COMPONENT_CONTROLS_BUTTON_DURATION)
export const showRetryButton = createAction(SHOW_COMPONENT_CONTROLS_BUTTON_RETRY)
export const showPlayingButton = createAction(SHOW_COMPONENT_CONTROLS_BUTTON_PLAYING)
export const showPauseButton = createAction(SHOW_COMPONENT_CONTROLS_BUTTON_PAUSE)
export const showComponentTab = createAction(SHOW_COMPONENT_TAB)
export const showVolumeSlider = createAction(SHOW_COMPONENT_VOLUME_SLIDER)
export const showRateSlider = createAction(SHOW_COMPONENT_RATE_SLIDER)
export const showChannelsSelection = createAction(SHOW_COMPONENT_CHANNELS)

export const hideInfo = createAction(HIDE_COMPONENT_INFO)
export const hideError = createAction(HIDE_COMPONENT_ERROR)
export const hideProgressBar = createAction(HIDE_COMPONENT_PROGRESSBAR)
export const hideInfoPoster = createAction(HIDE_COMPONENT_INFO_POSTER)
export const hideShowTitle = createAction(HIDE_COMPONENT_SHOW_TITLE)
export const hideEpisodeTitle = createAction(HIDE_COMPONENT_EPISODE_TITLE)
export const hideSubtitle = createAction(HIDE_COMPONENT_SUBTITLE)
export const hideChapterControls = createAction(HIDE_COMPONENT_CONTROLS_CHAPTERS)
export const hideSteppersControls = createAction(HIDE_COMPONENT_CONTROLS_STEPPERS)
export const hideButtonControl = createAction(HIDE_COMPONENT_CONTROLS_BUTTON)
export const hideComponentTab = createAction(HIDE_COMPONENT_TAB)
export const hideVolumeSlider = createAction(HIDE_COMPONENT_VOLUME_SLIDER)
export const hideRateSlider = createAction(HIDE_COMPONENT_RATE_SLIDER)
export const hideChannelsSelection = createAction(HIDE_COMPONENT_CHANNELS)

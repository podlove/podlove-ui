import { createAction } from 'redux-actions'

import {
  SHOW_COMPONENT_INFO,
  SHOW_COMPONENT_ERROR,
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
  SHOW_COMPONENT_CONTROLS_BUTTON_PAUSE
} from './types'

export const showInfo = createAction(SHOW_COMPONENT_INFO)
export const showError = createAction(SHOW_COMPONENT_ERROR)
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
export const showComponentTab = createAction(SHOW_COMPONENT_TAB, (tab, visibility) => ({ tab, visibility }))
export const showVolumeSlider = createAction(SHOW_COMPONENT_VOLUME_SLIDER)
export const showRateSlider = createAction(SHOW_COMPONENT_RATE_SLIDER)
export const showChannelsSelection = createAction(SHOW_COMPONENT_CHANNELS)

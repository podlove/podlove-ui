import { handleActions } from 'redux-actions'
import {
  SHOW_COMPONENT_INFO_POSTER,
  SHOW_COMPONENT_TAB,
  SHOW_COMPONENT_VOLUME_SLIDER,
  SHOW_COMPONENT_RATE_SLIDER,
  SHOW_COMPONENT_CONTROLS_BUTTON_PLAYING,
  SHOW_COMPONENT_CONTROLS_BUTTON_PAUSE,
  SHOW_COMPONENT_CONTROLS_BUTTON_DURATION,
  SHOW_COMPONENT_CONTROLS_BUTTON_LOADING,
  SHOW_COMPONENT_CONTROLS_BUTTON_REPLAY,
  SHOW_COMPONENT_CONTROLS_BUTTON_REMAINING,
  SHOW_COMPONENT_CONTROLS_BUTTON_RETRY,
  SHOW_COMPONENT_CONTROLS_CHAPTERS,
  SHOW_COMPONENT_CONTROLS_STEPPERS,
  SHOW_COMPONENT_PROGRESSBAR,
  SHOW_COMPONENT_SHOW_TITLE,
  SHOW_COMPONENT_EPISODE_TITLE,
  SHOW_COMPONENT_SUBTITLE,
  HIDE_COMPONENT_INFO_POSTER,
  HIDE_COMPONENT_ERROR,
  HIDE_COMPONENT_CONTROLS_CHAPTERS,
  HIDE_COMPONENT_CONTROLS_STEPPERS,
  HIDE_COMPONENT_CONTROLS_BUTTON,
  HIDE_COMPONENT_PROGRESSBAR,
  HIDE_COMPONENT_TAB,
  HIDE_COMPONENT_VOLUME_SLIDER,
  HIDE_COMPONENT_RATE_SLIDER,
  HIDE_COMPONENT_SHOW_TITLE,
  HIDE_COMPONENT_EPISODE_TITLE,
  HIDE_COMPONENT_SUBTITLE
} from '@podlove/player-actions/types'

export const INITIAL_STATE = {
  playButton: 'duration',
  progressBar: false,
  chapterButtons: false,
  stepperButtons: false,
  volumeControl: false,
  rateControl: false,
  poster: false,
  info: {
    episodeTitle: false,
    showTitle: false,
    subtitle: false
  },
  tabs: {
    info: false,
    chapters: false,
    transcript: false,
    share: false,
    files: false,
    audio: false,
    playlist: false
  }
}

export const reducer = handleActions(
  {
    [HIDE_COMPONENT_ERROR]: state => ({
      ...state,
      error: false
    }),
    [SHOW_COMPONENT_INFO_POSTER]: state => ({
      ...state,
      poster: true
    }),
    [HIDE_COMPONENT_INFO_POSTER]: state => ({
      ...state,
      poster: false
    }),
    [HIDE_COMPONENT_CONTROLS_BUTTON]: state => ({
      ...state,
      playButton: false
    }),
    [SHOW_COMPONENT_CONTROLS_BUTTON_PLAYING]: state => ({
      ...state,
      playButton: 'playing'
    }),
    [SHOW_COMPONENT_CONTROLS_BUTTON_DURATION]: state => ({
      ...state,
      playButton: 'duration'
    }),
    [SHOW_COMPONENT_CONTROLS_BUTTON_PAUSE]: state => ({
      ...state,
      playButton: 'paused'
    }),
    [SHOW_COMPONENT_CONTROLS_BUTTON_LOADING]: state => ({
      ...state,
      playButton: 'loading'
    }),
    [SHOW_COMPONENT_CONTROLS_BUTTON_REPLAY]: state => ({
      ...state,
      playButton: 'replay'
    }),
    [SHOW_COMPONENT_CONTROLS_BUTTON_REMAINING]: state => ({
      ...state,
      playButton: 'remaining'
    }),
    [SHOW_COMPONENT_CONTROLS_BUTTON_RETRY]: state => ({
      ...state,
      playButton: 'retry'
    }),
    [SHOW_COMPONENT_CONTROLS_CHAPTERS]: state => ({
      ...state,
      chapterButtons: true
    }),
    [HIDE_COMPONENT_CONTROLS_CHAPTERS]: state => ({
      ...state,
      chapterButtons: false
    }),
    [SHOW_COMPONENT_CONTROLS_STEPPERS]: state => ({
      ...state,
      stepperButtons: true
    }),
    [HIDE_COMPONENT_CONTROLS_STEPPERS]: state => ({
      ...state,
      stepperButtons: false
    }),
    [SHOW_COMPONENT_PROGRESSBAR]: state => ({
      ...state,
      progressBar: true
    }),
    [HIDE_COMPONENT_PROGRESSBAR]: state => ({
      ...state,
      progressBar: false
    }),
    [SHOW_COMPONENT_VOLUME_SLIDER]: state => ({
      ...state,
      volumeControl: true
    }),
    [HIDE_COMPONENT_VOLUME_SLIDER]: state => ({
      ...state,
      volumeControl: false
    }),
    [SHOW_COMPONENT_RATE_SLIDER]: state => ({
      ...state,
      rateControl: true
    }),
    [HIDE_COMPONENT_RATE_SLIDER]: state => ({
      ...state,
      rateControl: false
    }),
    [SHOW_COMPONENT_TAB]: (state, { payload }) => ({
      ...state,
      tabs: {
        ...state.tabs,
        [payload]: true
      }
    }),
    [HIDE_COMPONENT_TAB]: (state, { payload }) => ({
      ...state,
      tabs: {
        ...state.tabs,
        [payload]: false
      }
    }),
    [SHOW_COMPONENT_SHOW_TITLE]: state => ({
      ...state,
      info: {
        ...state.info,
        showTitle: true
      }
    }),
    [HIDE_COMPONENT_SHOW_TITLE]: state => ({
      ...state,
      info: {
        ...state.info,
        showTitle: false
      }
    }),
    [SHOW_COMPONENT_EPISODE_TITLE]: state => ({
      ...state,
      info: {
        ...state.info,
        episodeTitle: true
      }
    }),
    [HIDE_COMPONENT_EPISODE_TITLE]: state => ({
      ...state,
      info: {
        ...state.info,
        episodeTitle: false
      }
    }),
    [SHOW_COMPONENT_SUBTITLE]: state => ({
      ...state,
      info: {
        ...state.info,
        subtitle: true
      }
    }),
    [HIDE_COMPONENT_SUBTITLE]: state => ({
      ...state,
      info: {
        ...state.info,
        subtitle: false
      }
    })
  },
  INITIAL_STATE
)

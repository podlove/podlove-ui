import { handleActions } from 'redux-actions'
import {
  SHOW_COMPONENT_CONTROLS_BUTTON_PLAYING,
  SHOW_COMPONENT_CONTROLS_BUTTON_PAUSE,
  SHOW_COMPONENT_CONTROLS_BUTTON_DURATION,
  SHOW_COMPONENT_CONTROLS_BUTTON_LOADING,
  SHOW_COMPONENT_CONTROLS_BUTTON_REPLAY,
  SHOW_COMPONENT_CONTROLS_BUTTON_REMAINING,
  SHOW_COMPONENT_CONTROLS_BUTTON_RETRY,
  SHOW_COMPONENT_CONTROLS_CHAPTERS,
  SHOW_COMPONENT_CONTROLS_STEPPERS,
  SHOW_COMPONENT_PROGRESSBAR
 } from '@podlove/actions/types'

export const INITIAL_STATE = {
  playButton: 'duration',
  progressBar: false,
  chapterButtons: false,
  stepperButtons: false,
  volumeControl: true,
  rateControl: true
}

export const reducer = handleActions({
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
  [SHOW_COMPONENT_CONTROLS_STEPPERS]: state => ({
    ...state,
    stepperButtons: true
  }),
  [SHOW_COMPONENT_PROGRESSBAR]: state => ({
    ...state,
    progressBar: true
  })
}, INITIAL_STATE)

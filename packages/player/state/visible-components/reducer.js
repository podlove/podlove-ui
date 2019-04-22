import { handleActions } from 'redux-actions'
import {
  SHOW_VISIBLE_COMPONENTS_TAB_INFO,
  SHOW_VISIBLE_COMPONENTS_TAB_CHAPTERS,
  SHOW_VISIBLE_COMPONENTS_TAB_FILES,
  SHOW_VISIBLE_COMPONENTS_TAB_AUDIO,
  SHOW_VISIBLE_COMPONENTS_TAB_SHARE,
  SHOW_VISIBLE_COMPONENTS_TAB_TRANSCRIPTS,
  SHOW_VISIBLE_COMPONENTS_HEADER_POSTER,
  SHOW_VISIBLE_COMPONENTS_HEADER_TITLE,
  SHOW_VISIBLE_COMPONENTS_HEADER_EPISODE,
  SHOW_VISIBLE_COMPONENTS_HEADER_SUBTITLE,
  SHOW_VISIBLE_COMPONENTS_CONTROLS_STEPPER,
  SHOW_VISIBLE_COMPONENTS_CONTROLS_CHAPTERS,
  SHOW_VISIBLE_COMPONENTS_CONTROLS_PROGRESSBAR,
  HIDE_VISIBLE_COMPONENTS_TAB_INFO,
  HIDE_VISIBLE_COMPONENTS_TAB_CHAPTERS,
  HIDE_VISIBLE_COMPONENTS_TAB_FILES,
  HIDE_VISIBLE_COMPONENTS_TAB_AUDIO,
  HIDE_VISIBLE_COMPONENTS_TAB_SHARE,
  HIDE_VISIBLE_COMPONENTS_TAB_TRANSCRIPTS,
  HIDE_VISIBLE_COMPONENTS_HEADER_POSTER,
  HIDE_VISIBLE_COMPONENTS_HEADER_TITLE,
  HIDE_VISIBLE_COMPONENTS_HEADER_EPISODE,
  HIDE_VISIBLE_COMPONENTS_HEADER_SUBTITLE,
  HIDE_VISIBLE_COMPONENTS_CONTROLS_STEPPER,
  HIDE_VISIBLE_COMPONENTS_CONTROLS_CHAPTERS,
  HIDE_VISIBLE_COMPONENTS_CONTROLS_PROGRESSBAR
} from '@podlove/player-actions/types'

export const INITIAL_STATE = {
  tabs: {
    info: true,
    chapters: true,
    files: true,
    audio: true,
    share: true,
    transcripts: true
  },
  header: {
    poster: true,
    title: true,
    episode: true,
    subtitle: true
  },
  controls: {
    steppers: true,
    chapters: true,
    progressbar: true
  }
}

export const reducer = handleActions(
  {
    [SHOW_VISIBLE_COMPONENTS_TAB_INFO]: state => ({
      ...state,
      tabs: {
        ...state.tabs,
        info: true
      }
    }),
    [HIDE_VISIBLE_COMPONENTS_TAB_INFO]: state => ({
      ...state,
      tabs: {
        ...state.tabs,
        info: false
      }
    }),
    [SHOW_VISIBLE_COMPONENTS_TAB_AUDIO]: state => ({
      ...state,
      tabs: {
        ...state.tabs,
        audio: true
      }
    }),
    [HIDE_VISIBLE_COMPONENTS_TAB_AUDIO]: state => ({
      ...state,
      tabs: {
        ...state.tabs,
        audio: false
      }
    }),
    [SHOW_VISIBLE_COMPONENTS_TAB_CHAPTERS]: state => ({
      ...state,
      tabs: {
        ...state.tabs,
        chapters: true
      }
    }),
    [HIDE_VISIBLE_COMPONENTS_TAB_CHAPTERS]: state => ({
      ...state,
      tabs: {
        ...state.tabs,
        chapters: false
      }
    }),
    [SHOW_VISIBLE_COMPONENTS_TAB_FILES]: state => ({
      ...state,
      tabs: {
        ...state.tabs,
        files: true
      }
    }),
    [HIDE_VISIBLE_COMPONENTS_TAB_FILES]: state => ({
      ...state,
      tabs: {
        ...state.tabs,
        files: false
      }
    }),
    [SHOW_VISIBLE_COMPONENTS_TAB_SHARE]: state => ({
      ...state,
      tabs: {
        ...state.tabs,
        share: true
      }
    }),
    [HIDE_VISIBLE_COMPONENTS_TAB_SHARE]: state => ({
      ...state,
      tabs: {
        ...state.tabs,
        share: false
      }
    }),
    [SHOW_VISIBLE_COMPONENTS_TAB_TRANSCRIPTS]: state => ({
      ...state,
      tabs: {
        ...state.tabs,
        transcripts: true
      }
    }),
    [HIDE_VISIBLE_COMPONENTS_TAB_TRANSCRIPTS]: state => ({
      ...state,
      tabs: {
        ...state.tabs,
        transcripts: false
      }
    }),
    [SHOW_VISIBLE_COMPONENTS_HEADER_POSTER]: state => ({
      ...state,
      header: {
        ...state.header,
        poster: true
      }
    }),
    [HIDE_VISIBLE_COMPONENTS_HEADER_POSTER]: state => ({
      ...state,
      header: {
        ...state.header,
        poster: false
      }
    }),
    [SHOW_VISIBLE_COMPONENTS_HEADER_TITLE]: state => ({
      ...state,
      header: {
        ...state.header,
        title: true
      }
    }),
    [HIDE_VISIBLE_COMPONENTS_HEADER_TITLE]: state => ({
      ...state,
      header: {
        ...state.header,
        title: false
      }
    }),
    [SHOW_VISIBLE_COMPONENTS_HEADER_EPISODE]: state => ({
      ...state,
      header: {
        ...state.header,
        episode: true
      }
    }),
    [HIDE_VISIBLE_COMPONENTS_HEADER_EPISODE]: state => ({
      ...state,
      header: {
        ...state.header,
        episode: false
      }
    }),
    [SHOW_VISIBLE_COMPONENTS_HEADER_SUBTITLE]: state => ({
      ...state,
      header: {
        ...state.header,
        subtitle: true
      }
    }),
    [HIDE_VISIBLE_COMPONENTS_HEADER_SUBTITLE]: state => ({
      ...state,
      header: {
        ...state.header,
        subtitle: false
      }
    }),
    [SHOW_VISIBLE_COMPONENTS_CONTROLS_STEPPER]: state => ({
      ...state,
      controls: {
        ...state.controls,
        steppers: true
      }
    }),
    [HIDE_VISIBLE_COMPONENTS_CONTROLS_STEPPER]: state => ({
      ...state,
      controls: {
        ...state.controls,
        steppers: false
      }
    }),
    [SHOW_VISIBLE_COMPONENTS_CONTROLS_CHAPTERS]: state => ({
      ...state,
      controls: {
        ...state.controls,
        chapters: true
      }
    }),
    [HIDE_VISIBLE_COMPONENTS_CONTROLS_CHAPTERS]: state => ({
      ...state,
      controls: {
        ...state.controls,
        chapters: false
      }
    }),
    [SHOW_VISIBLE_COMPONENTS_CONTROLS_PROGRESSBAR]: state => ({
      ...state,
      controls: {
        ...state.controls,
        progressbar: true
      }
    }),
    [HIDE_VISIBLE_COMPONENTS_CONTROLS_PROGRESSBAR]: state => ({
      ...state,
      controls: {
        ...state.controls,
        progressbar: false
      }
    })
  },
  INITIAL_STATE
)

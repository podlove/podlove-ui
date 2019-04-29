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
import { reducer, INITIAL_STATE } from './reducer'

const state = type => expect(reducer(INITIAL_STATE, { type }))
const expected = result => ({
  ...INITIAL_STATE,
  ...result
})

describe('components', () => {
  describe('error', () => {
    test('should disable error on HIDE_COMPONENT_ERROR', () => {
      state(HIDE_COMPONENT_ERROR).toEqual(expected({ error: false }))
    })
  })

  describe('poster', () => {
    test('should enable poster on SHOW_COMPONENT_INFO_POSTER', () => {
      state(SHOW_COMPONENT_INFO_POSTER).toEqual(expected({ poster: true }))
    })

    test('should disable poster on HIDE_COMPONENT_INFO_POSTER', () => {
      state(HIDE_COMPONENT_INFO_POSTER).toEqual(expected({ poster: false }))
    })
  })

  describe('playButton', () => {
    test('should disable playButton on HIDE_COMPONENT_CONTROLS_BUTTON', () => {
      state(HIDE_COMPONENT_CONTROLS_BUTTON).toEqual(expected({ playButton: false }))
    })

    test('should set playButton to playing on SHOW_COMPONENT_CONTROLS_BUTTON_PLAYING', () => {
      state(SHOW_COMPONENT_CONTROLS_BUTTON_PLAYING).toEqual(expected({ playButton: 'playing' }))
    })

    test('should set playButton to duration on SHOW_COMPONENT_CONTROLS_BUTTON_DURATION', () => {
      state(SHOW_COMPONENT_CONTROLS_BUTTON_DURATION).toEqual(expected({ playButton: 'duration' }))
    })

    test('should set playButton to paused on SHOW_COMPONENT_CONTROLS_BUTTON_PAUSE', () => {
      state(SHOW_COMPONENT_CONTROLS_BUTTON_PAUSE).toEqual(expected({ playButton: 'paused' }))
    })

    test('should set playButton to loading on SHOW_COMPONENT_CONTROLS_BUTTON_LOADING', () => {
      state(SHOW_COMPONENT_CONTROLS_BUTTON_LOADING).toEqual(expected({ playButton: 'loading' }))
    })

    test('should set playButton to replay on SHOW_COMPONENT_CONTROLS_BUTTON_REPLAY', () => {
      state(SHOW_COMPONENT_CONTROLS_BUTTON_REPLAY).toEqual(expected({ playButton: 'replay' }))
    })

    test('should set playButton to remaining on SHOW_COMPONENT_CONTROLS_BUTTON_REMAINING', () => {
      state(SHOW_COMPONENT_CONTROLS_BUTTON_REMAINING).toEqual(expected({ playButton: 'remaining' }))
    })

    test('should set playButton to retry on SHOW_COMPONENT_CONTROLS_BUTTON_RETRY', () => {
      state(SHOW_COMPONENT_CONTROLS_BUTTON_RETRY).toEqual(expected({ playButton: 'retry' }))
    })
  })

  describe('chapterButton', () => {
    test('should enable chapterButton on SHOW_COMPONENT_CONTROLS_CHAPTERS', () => {
      state(SHOW_COMPONENT_CONTROLS_CHAPTERS).toEqual(expected({ chapterButtons: true }))
    })

    test('should disable chapterButton on HIDE_COMPONENT_CONTROLS_CHAPTERS', () => {
      state(HIDE_COMPONENT_CONTROLS_CHAPTERS).toEqual(expected({ chapterButtons: false }))
    })
  })

  describe('stepperButton', () => {
    test('should enable stepperButton on SHOW_COMPONENT_CONTROLS_STEPPERS', () => {
      state(SHOW_COMPONENT_CONTROLS_STEPPERS).toEqual(expected({ stepperButtons: true }))
    })

    test('should disable stepperButton on HIDE_COMPONENT_CONTROLS_STEPPERS', () => {
      state(HIDE_COMPONENT_CONTROLS_STEPPERS).toEqual(expected({ stepperButtons: false }))
    })
  })

  describe('progressBar', () => {
    test('should enable progressBar on SHOW_COMPONENT_PROGRESSBAR', () => {
      state(SHOW_COMPONENT_PROGRESSBAR).toEqual(expected({ progressBar: true }))
    })

    test('should disable progressBar on HIDE_COMPONENT_PROGRESSBAR', () => {
      state(HIDE_COMPONENT_PROGRESSBAR).toEqual(expected({ progressBar: false }))
    })
  })

  describe('volumeControl', () => {
    test('should enable volumeControl on SHOW_COMPONENT_VOLUME_SLIDER', () => {
      state(SHOW_COMPONENT_VOLUME_SLIDER).toEqual(expected({ volumeControl: true }))
    })

    test('should disable volumeControl on HIDE_COMPONENT_VOLUME_SLIDER', () => {
      state(HIDE_COMPONENT_VOLUME_SLIDER).toEqual(expected({ volumeControl: false }))
    })
  })

  describe('rateControl', () => {
    test('should enable rateControl on SHOW_COMPONENT_RATE_SLIDER', () => {
      state(SHOW_COMPONENT_RATE_SLIDER).toEqual(expected({ rateControl: true }))
    })

    test('should disable rateControl on HIDE_COMPONENT_RATE_SLIDER', () => {
      state(HIDE_COMPONENT_RATE_SLIDER).toEqual(expected({ rateControl: false }))
    })
  })

  describe('tabs', () => {
    test('should enable a tab on SHOW_COMPONENT_TAB', () => {
      expect(reducer(INITIAL_STATE, { type: SHOW_COMPONENT_TAB, payload: 'info' })).toEqual({
        ...INITIAL_STATE,
        tabs: { ...INITIAL_STATE.tabs, info: true }
      })
    })

    test('should disable a tab on HIDE_COMPONENT_TAB', () => {
      expect(
        reducer(
          { ...INITIAL_STATE, tabs: { ...INITIAL_STATE.tabs, info: false } },
          { type: HIDE_COMPONENT_TAB, payload: 'info' }
        )
      ).toEqual({ ...INITIAL_STATE, tabs: { ...INITIAL_STATE.tabs, info: false } })
    })
  })

  describe('showTitle', () => {
    test('should enable showTitle on SHOW_COMPONENT_SHOW_TITLE', () => {
      expect(reducer(INITIAL_STATE, { type: SHOW_COMPONENT_SHOW_TITLE })).toEqual({
        ...INITIAL_STATE,
        info: { ...INITIAL_STATE.info, showTitle: true }
      })
    })

    test('should disable a tab on HIDE_COMPONENT_SHOW_TITLE', () => {
      expect(
        reducer(
          { ...INITIAL_STATE, info: { ...INITIAL_STATE.info, showTitle: true } },
          { type: HIDE_COMPONENT_SHOW_TITLE }
        )
      ).toEqual({ ...INITIAL_STATE, info: { ...INITIAL_STATE.info, showTitle: false } })
    })
  })

  describe('episodeTitle', () => {
    test('should enable episodeTitle on SHOW_COMPONENT_EPISODE_TITLE', () => {
      expect(reducer(INITIAL_STATE, { type: SHOW_COMPONENT_EPISODE_TITLE })).toEqual({
        ...INITIAL_STATE,
        info: { ...INITIAL_STATE.info, episodeTitle: true }
      })
    })

    test('should disable a tab on HIDE_COMPONENT_EPISODE_TITLE', () => {
      expect(
        reducer(
          { ...INITIAL_STATE, info: { ...INITIAL_STATE.info, episodeTitle: true } },
          { type: HIDE_COMPONENT_EPISODE_TITLE }
        )
      ).toEqual({ ...INITIAL_STATE, info: { ...INITIAL_STATE.info, episodeTitle: false } })
    })
  })

  describe('subtitle', () => {
    test('should enable subtitle on SHOW_COMPONENT_SUBTITLE', () => {
      expect(reducer(INITIAL_STATE, { type: SHOW_COMPONENT_SUBTITLE })).toEqual({
        ...INITIAL_STATE,
        info: { ...INITIAL_STATE.info, subtitle: true }
      })
    })

    test('should disable a tab on HIDE_COMPONENT_SUBTITLE', () => {
      expect(
        reducer(
          { ...INITIAL_STATE, info: { ...INITIAL_STATE.info, subtitle: true } },
          { type: HIDE_COMPONENT_SUBTITLE }
        )
      ).toEqual({ ...INITIAL_STATE, info: { ...INITIAL_STATE.info, subtitle: false } })
    })
  })
})

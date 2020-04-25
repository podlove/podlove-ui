import {
  BACKEND_PAUSE,
  BACKEND_ERROR,
  BACKEND_PLAY,
  BACKEND_LOADING_END
} from '@podlove/player-actions/types'
import { reducer, INITIAL_STATE } from './reducer'

describe('driver', () => {
  test('should set the playing state to false on BACKEND_PAUSE', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: BACKEND_PAUSE
      })
    ).toEqual({
      playing: false
    })

    expect(
      reducer(
        {
          playing: true
        },
        {
          type: BACKEND_PAUSE
        }
      )
    ).toEqual({
      playing: false
    })
  })

  test('should set the playing state to false on BACKEND_ERROR', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: BACKEND_ERROR
      })
    ).toEqual({
      playing: false
    })

    expect(
      reducer(
        {
          playing: true
        },
        {
          type: BACKEND_ERROR
        }
      )
    ).toEqual({
      playing: false
    })
  })

  test('should set the playing state to true on BACKEND_PLAY', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: BACKEND_PLAY
      })
    ).toEqual({
      playing: true
    })

    expect(
      reducer(
        {
          playing: true
        },
        {
          type: BACKEND_PLAY
        }
      )
    ).toEqual({
      playing: true
    })
  })

  test('should set the playing state accordingly on BACKEND_LOADING_END', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: BACKEND_LOADING_END,
        payload: {
          playing: true
        }
      })
    ).toEqual({
      playing: true
    })

    expect(
      reducer(
        {
          playing: true
        },
        {
          type: BACKEND_LOADING_END,
          payload: {
            playing: false
          }
        }
      )
    ).toEqual({
      playing: false
    })
  })
})

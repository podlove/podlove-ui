import { describe, test, expect } from 'vitest';
import { reducer, INITIAL_STATE } from './runtime'
import {
  SET_RUNTIME,
  SET_LANGUAGE,
  SET_VERSION,
  SET_MODE,
  READY
} from '@podlove/player-actions/types'

describe('runtime', () => {
  test(`it is a reducer function`, () => {
    expect(typeof reducer).toBe('function')
  })

  test(`it sets the runtime on SET_RUNTIME`, () => {
    const payload = {
      display: 'display',
      browser: 'browser',
      locale: 'locale',
      platform: 'platform',
      language: 'language'
    }

    const result = reducer(INITIAL_STATE, {
      type: SET_RUNTIME,
      payload
    })

    expect(result).toEqual({
      ...INITIAL_STATE,
      ...payload
    })
  })

  test(`it sets the language on SET_LANGUAGE`, () => {
    const result = reducer(INITIAL_STATE, {
      type: SET_LANGUAGE,
      payload: 'de'
    })

    expect(result).toEqual({
      ...INITIAL_STATE,
      language: 'de'
    })
  })

  test(`it sets the version on SET_VERSION`, () => {
    const result = reducer(INITIAL_STATE, {
      type: SET_VERSION,
      payload: '4.2.3'
    })

    expect(result).toEqual({
      ...INITIAL_STATE,
      version: '4.2.3'
    })
  })

  test(`it sets the mode on SET_MODE`, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: SET_MODE,
        payload: 'native'
      })
    ).toEqual({
      ...INITIAL_STATE,
      mode: 'native'
    })

    expect(
      reducer(INITIAL_STATE, {
        type: SET_MODE,
        payload: 'embed'
      })
    ).toEqual({
      ...INITIAL_STATE,
      mode: 'embed'
    })

    expect(
      reducer(INITIAL_STATE, {
        type: SET_MODE,
        payload: 'foo'
      })
    ).toEqual({
      ...INITIAL_STATE,
      mode: 'native'
    })
  })

  test(`it sets language and runtime on INIT`, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: READY,
        payload: {
          runtime: {
            language: 'es'
          }
        }
      })
    ).toEqual({
      ...INITIAL_STATE,
      language: 'es'
    })
  })
})

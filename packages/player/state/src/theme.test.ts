import { describe, test, expect } from 'vitest';
import { CONSTRUCTED, SET_THEME } from '@podlove/player-actions/types'
import { reducer as theme, INITIAL_STATE } from './theme.js'
import { PodloveTheme, PodloveWebPlayerEpisode } from '@podlove/types';

const tokens = {
  brand: '#E64415',
  brandDark: '#235973',
  brandDarkest: '#1A3A4A',
  brandLightest: '#E9F1F5',
  shadeDark: '#807E7C',
  shadeBase: '#807E7C',
  contrast: '#000',
  alt: '#fff'
}

describe('theme', () => {
  test(`theme: is a reducer function`, () => {
    expect(typeof theme).toBe('function')
  })

  const actions = [CONSTRUCTED, SET_THEME]

  actions.forEach((type) => {
    test(`theme: it sets the tokens on ${type}`, () => {
      const result = theme(INITIAL_STATE, {
        type,
        payload: {
          version: 5,
          theme: {
            tokens
          }
        } as unknown as PodloveWebPlayerEpisode
      })

      expect(result).toEqual({
        ...INITIAL_STATE,
        tokens
      })
    })
  })

  test(`it has a default fallback if no theme is provided`, () => {
    const result = theme(undefined, {
      type: CONSTRUCTED,
      payload: undefined as unknown as PodloveWebPlayerEpisode
    })

    expect(result).toEqual(INITIAL_STATE)
  })

  test(`it does nothing if a unknown action is dispatched`, () => {
    const result = theme('CUSTOM' as unknown as PodloveTheme, {
      type: 'NOT_A_REAL_TYPE',
      payload: {} as any
    })
    expect(result).toBe('CUSTOM')
  })
})

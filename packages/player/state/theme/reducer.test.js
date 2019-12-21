import { CONSTRUCTED, SET_THEME } from '@podlove/player-actions/types'
import { reducer as theme, INITIAL_STATE } from './reducer'

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

const fonts = {
  ci: {
    name: 'CiFont',
    family: ['CiFont'],
    weight: 800,
    src: ['./ci/font/src']
  },
  regular: {
    name: 'RegularFont',
    family: ['RegularFont'],
    weight: 300,
    src: ['./regular/font/src']
  },
  bold: {
    name: 'BoldFont',
    family: ['BoldFont'],
    weight: 700,
    src: ['./bold/font/src']
  }
}

describe('theme', () => {
  test(`theme: is a reducer function`, () => {
    expect(typeof theme).toBe('function')
  })

  const actions = [CONSTRUCTED, SET_THEME]

  actions.forEach(type => {
    test(`theme: it sets the fonts on ${type}`, () => {
      let result = theme(INITIAL_STATE, {
        type,
        payload: {
          version: 5,
          theme: {
            fonts
          }
        }
      })

      expect(result).toEqual({
        ...INITIAL_STATE,
        fonts
      })
    })

    test(`theme: it sets the tokens on ${type}`, () => {
      let result = theme(INITIAL_STATE, {
        type,
        payload: {
          version: 5,
          theme: {
            tokens
          }
        }
      })

      expect(result).toEqual({
        ...INITIAL_STATE,
        tokens
      })
    })
  })

  test(`it has a default fallback if no theme is provided`, () => {
    let result = theme(undefined, {
      type: CONSTRUCTED
    })

    expect(result).toEqual(INITIAL_STATE)
  })

  test(`it does nothing if a unknown action is dispatched`, () => {
    const result = theme('CUSTOM', {
      type: 'NOT_A_REAL_TYPE'
    })
    expect(result).toBe('CUSTOM')
  })
})

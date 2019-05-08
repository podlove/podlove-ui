import { reducer as theme, INITIAL_STATE } from './reducer'

describe('theme', () => {
  test(`theme: is a reducer function`, () => {
    expect(typeof theme).toBe('function')
  })

  test(`theme: it sets the theme on INIT`, () => {
    let result = theme(undefined, {
      type: 'INIT',
      payload: {
        theme: {
          main: '#fff',
          highlight: '#000'
        }
      }
    })

    expect(result).toEqual({
      ...INITIAL_STATE,
      main: '#fff',
      highlight: '#000',
      luminosity: 1
    })
  })

  test(`it has a default fallback if no theme is provided`, () => {
    let result = theme(undefined, {
      type: 'INIT'
    })

    expect(result).toEqual({
      ...INITIAL_STATE,
      highlight: undefined,
      negative: true,
      luminosity: 0.2276776612358553
    })
  })

  test(`it sets the theme on SET_THEME`, () => {
    let result = theme(undefined, {
      type: 'SET_THEME',
      payload: {
        main: '#fff',
        highlight: '#b00'
      }
    })

    expect(result).toEqual({
      ...INITIAL_STATE,
      main: '#fff',
      highlight: '#b00',
      luminosity: 1
    })
  })

  test(`it does nothing if a unknown action is dispatched`, () => {
    const result = theme('CUSTOM', {
      type: 'NOT_A_REAL_TYPE'
    })
    expect(result).toBe('CUSTOM')
  })
})

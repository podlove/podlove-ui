import { reducer as theme } from './reducer'

describe('theme', () => {
  test(`theme: is a reducer function`, () => {
    expect(typeof theme).toBe('function')
  })

  test(`theme: it sets the theme on INIT`, () => {
    let result = theme(undefined, {
      type: 'INIT',
      paylaod: {
        theme: {
          main: '#fff',
          highlight: '#000'
        }
      }
    })

    expect(typeof result).toBe('object')
  })

  test(`it has a default fallback if no theme is provided`, () => {
    let result = theme(undefined, {
      type: 'INIT'
    })

    expect(typeof result).toBe('object')
  })

  test(`it sets the theme on SET_THEME`, () => {
    let result = theme(undefined, {
      type: 'SET_THEME',
      paylaod: {
        theme: {
          main: '#fff'
        }
      }
    })

    expect(typeof result).toBe('object')
  })

  test(`it does nothing if a unknown action is dispatched`, () => {
    const result = theme('CUSTOM', {
      type: 'NOT_A_REAL_TYPE'
    })
    expect(result).toBe('CUSTOM')
  })
})

import { describe, test, expect } from 'vitest';
import { SHOW_ERROR, HIDE_ERROR } from '@podlove/player-actions/types'
import { reducer as error, INITIAL_STATE } from './error'

describe('error', () => {
  test(`it is a reducer function`, () => {
    expect(typeof error).toBe('function')
  })

  test(`shows an error on SHOW_ERROR`, () => {
    const result = error(
      {},
      {
        type: SHOW_ERROR,
        payload: {
          icon: 'icon',
          title: 'title',
          message: 'message',
          retry: true
        }
      }
    )

    expect(result).toEqual({
      icon: 'icon',
      title: 'title',
      message: 'message',
      retry: true,
      active: true
    })
  })

  test(`resets the state on HIDE_ERROR`, () => {
    const result = error(
      { some: 'foo' },
      {
        type: HIDE_ERROR
      }
    )

    expect(result).toEqual(INITIAL_STATE)
  })
})

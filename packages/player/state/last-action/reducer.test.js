import { reducer, INITIAL_STATE } from './reducer'

describe('last-action', () => {
  test('it replays the given action', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: 'foo',
        payload: 'bar'
      })
    ).toEqual({
      type: 'foo',
      payload: 'bar'
    })
  })
})

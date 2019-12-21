import { equals } from 'ramda'
import { eventChannel } from 'redux-saga'
import { fork, take, call } from 'redux-saga/effects'

export const channel = host =>
  eventChannel(emitter => {
    const pipe = args => {
      emitter(args || {})
    }

    host(pipe)

    return () => {}
  })

export const mediaControl = event => cb => navigator.mediaSession.setActionHandler(event, cb)

export const matchAction = (matchType, matchPayload) => ({ type, payload }) =>
  type === matchType && equals(matchPayload, payload)

export function* takeOnce(pattern, saga, ...args) {
  return yield fork(function* once() {
    let done = false
    while (!done) {
      const action = yield take(pattern)
      done = true
      yield call(saga, ...args.concat(action))
    }
  })
}

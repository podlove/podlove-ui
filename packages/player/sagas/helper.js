import { equals } from 'ramda'
import { eventChannel } from 'redux-saga'

export const channel = host =>
  eventChannel(emitter => {
    const pipe = args => {
      emitter(args)
    }

    host(pipe)

    return () => {}
  })

export const matchAction = (matchType, matchPayload) => ({ type, payload }) =>
  type === matchType && equals(matchPayload, payload)

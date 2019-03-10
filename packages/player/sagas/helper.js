import { eventChannel } from 'redux-saga'

export const channel = host => eventChannel(emitter => {
  const pipe = (args) => {
    emitter(args)
  }

  host(pipe)

  return () => {}
})

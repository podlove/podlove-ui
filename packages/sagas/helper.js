import { eventChannel } from 'redux-saga'

export const channel = host => eventChannel(emitter => {
  const pipe = (args) => {
    console.log('call')
    emitter(args)
  }

  host(pipe)

  return () => {}
})

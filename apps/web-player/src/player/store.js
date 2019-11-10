import { curry } from 'ramda'

const lifecycle = curry((event, cb, store) => {
  const unsubscribe = store.subscribe(() => {
    const { lifecycle } = store.getState()
    if (lifecycle !== event) {
      return
    }

    unsubscribe()
    cb(store)
  })

  store.dispatch({ type: 'PLUGIN_CONNECT' })
})

export const ready = lifecycle('ready')
export const constructed = lifecycle('constructed')

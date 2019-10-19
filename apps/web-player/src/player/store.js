import { curry } from 'ramda'

export const ready = curry((cb, store) => {
  const unsubscribe = store.subscribe(() => {
    const { lifecycle } = store.getState()

    if (lifecycle !== 'ready') {
      return
    }

    unsubscribe()
    cb(store)
  })
})

import { init } from '@podlove/player-actions/init'
import { CONSTRUCTED } from '@podlove/player-actions/types'
import createPlayer from '../src/bootstrap'

const initState = (store, state) =>
  new Promise((resolve) => {
    const subscription = store.subscribe(() => {
      const state = store.getState()

      if (state.lastAction.type === CONSTRUCTED) {
        resolve(store)
      }
    })

    store.dispatch(init(state))
    resolve(store)
    subscription()
  })

window.BOOTSTRAP = (template = '', state = {}) => {
  document.getElementById('app').innerHTML = template
  const { app, store } = createPlayer()

  app.mount('#app')
  return initState(store, state)
}

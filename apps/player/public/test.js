import createPlayer from '../src/bootstrap'

const initState = (store, state) =>
  new Promise((resolve) => {
    const subscription = store.subscribe(() => {
      const state = store.getState()

      if (state.lastAction.type === 'PLAYER_CONSTRUCTED') {
        resolve(store)
      }
    })

    store.dispatch({ type: 'PLAYER_INIT', state })
    resolve(store)
    subscription()
  })

window.BOOTSTRAP = (template = '', state = {}) => {
  document.getElementById('app').innerHTML = template
  const { app, store } = createPlayer()

  app.mount('#app')
  return initState(store, state)
}

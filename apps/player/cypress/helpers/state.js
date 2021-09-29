const { curry } = require('ramda')

const setState =
  (...fragments) =>
  ({ PODLOVE_STORE }) => {
    const state = fragments.reduce((result, item) => Object.assign({}, result, item), {})
    PODLOVE_STORE.dispatch({ type: 'PLAYER_INIT', payload: state })
  }

const onUpdate = curry((store, type, assertion) => {
  const subscription = store.subscribe(() => {
    const action = store.getState().lastAction

    if (action.type !== type) {
      return
    }

    assertion(store.getState(), action)
    subscription()
  })
})

module.exports = { setState, onUpdate }

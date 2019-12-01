/* eslint-disable no-empty */
import { prop } from 'ramda'

export default (...stores) =>
  stores.forEach(sender => {
    sender.store.subscribe(() => {
      const action = prop('lastAction', sender.store.getState())
      const type = prop('type', action)

      try {
        stores.forEach(reciever => {
          // prohibit emits to itself
          if (reciever.prefix === sender.prefix) {
            return
          }

          // prohibit system emits
          if (type.startsWith('@')) {
            return
          }

          // only emit events that are directed to this store
          if (!type.startsWith(reciever.prefix)) {
            return
          }

          reciever.store.dispatch(action)
        })
      } catch (err) {}
    })
  })

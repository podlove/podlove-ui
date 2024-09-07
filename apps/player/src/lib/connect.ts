/* eslint-disable no-empty */
import { get } from 'lodash-es'
import { Store } from 'redux'

export default (...stores: { store: Store, prefix: string }[]) =>
  stores.forEach((sender) => {
    sender.store.subscribe(() => {
      const action = get( sender.store.getState(), 'lastAction')
      const type = get(action, 'type')

      try {
        stores.forEach((reciever) => {
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

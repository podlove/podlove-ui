import { toggleTab } from '@podlove/player-actions/tabs'
import { activeTab as getActiveTab } from '@podlove/player-config'
import { ready } from './store'

export const activeTab = (config, store) => {
  const tab = getActiveTab(config)

  if (!tab) {
    return
  }

  ready(store).then(() => {
    if (store.getState().tabs[tab]) {
      return
    }

    store.dispatch(toggleTab(tab))
  })
}

import { toggleTab } from '@podlove/player-actions/tabs'
import { getActiveTab } from '@podlove/player-config'
import { ready } from './store'

export const activeTab = (config, store) => {
  const tab = getActiveTab(config)

  if (!tab) {
    return
  }

  ready(() => {
    if (store.getState().tabs[tab]) {
      return
    }

    store.dispatch(toggleTab(tab))
  }, store)
}

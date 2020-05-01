import { toggleTab } from '@podlove/player-actions/tabs'
import { activeTab as getActiveTab } from '@podlove/player-config'
import { path, isEmpty } from 'ramda'
import { ready } from './store'

export const activeTab = (config, store) => {
  const tab = getActiveTab(config)

  if (!tab) {
    return
  }

  ready(store).then(() => {
    const state = store.getState()

    // if the tab is already active
    if (path(['tabs', tab], state)) {
      return
    }

    // if the chapters tab is selected but chapters aren't available
    if (tab === 'chapters' && isEmpty(path(['chapters', 'list'], state))) {
      return
    }

    store.dispatch(toggleTab(tab))
  })
}

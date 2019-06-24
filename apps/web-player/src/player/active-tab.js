import { toggleTab } from '@podlove/player-actions/tabs'
import { getActiveTab } from '@podlove/utils/config'

export const activeTab = (config, store) => {
  const tab = getActiveTab(config)

  tab && store.dispatch(toggleTab(tab))
}

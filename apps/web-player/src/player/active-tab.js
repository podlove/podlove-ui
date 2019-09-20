import { toggleTab } from '@podlove/player-actions/tabs'
import { getActiveTab } from '../../../../packages/player/config'

export const activeTab = (config, store) => {
  const tab = getActiveTab(config)

  tab && store.dispatch(toggleTab(tab))
}

import { sharePlaytime } from '@podlove/player-config'
import { showSharePlaytime, hideSharePlaytime } from '@podlove/player-actions/visible-components'
import { ready } from './store'

export const visibleComponents = (config, store) => {
  const playtime = sharePlaytime(config)

  ready(store).then(store => {
    if (playtime) {
      store.dispatch(showSharePlaytime())
    } else {
      store.dispatch(hideSharePlaytime())
    }
  })
}

import throttle from '@podlove/utils/throttle'
import { selectors } from '@podlove/player-state/timepiece'
import { requestPlaytime } from '@podlove/player-actions/timepiece'
import { restore } from '@podlove/player-actions/lifecycle'
import { showPauseButton } from '@podlove/player-actions/components'
import { loadQuantiles } from '@podlove/player-actions/quantiles'
import { toggleTab } from '@podlove/player-actions/tabs'
import { compose, propOr, isEmpty, curry } from 'ramda'
import LocalStorage from '@podlove/utils/localstorage'
import { hashCode } from 'hashcode'
import { ready } from './store'

const selectPlaytime = compose(selectors.playtime, propOr({}, 'timepiece'))

const selectQuantiles = propOr([], 'quantiles')

const selectTabs = propOr({}, 'tabs')

const recordState = curry((key, storage, store) => {
  store.subscribe(
    throttle(() => {
      const state = store.getState()
      const playtime = selectPlaytime(state)
      const tabs = selectTabs(state)
      const quantiles = selectQuantiles(state)

      storage.put(key, { playtime, tabs, quantiles })
    }, 1000)
  )
})

export const persistPlayer = (config, store) => {
  const storage = LocalStorage('pwp')
  const key = hashCode().value(config)
  const [, existing = {}] = storage.get(key)
  const record = recordState(key, storage)

  ready(store).then(() => {
    const { tabs } = store.getState()

    if (!isEmpty(existing)) {
      store.dispatch(restore())
      store.dispatch(showPauseButton())
    }

    if (existing.tabs) {
      const tab = Object.keys(existing.tabs).find(tab => existing.tabs[tab])
      // prevent double toggling
      if (!tabs[tab]) {
        store.dispatch(toggleTab(tab))
      }
    }

    if (existing.playtime) {
      store.dispatch(requestPlaytime(existing.playtime))
    }

    if (existing.quantiles) {
      store.dispatch(loadQuantiles(existing.quantiles))
    }

    record(store)
  })
}

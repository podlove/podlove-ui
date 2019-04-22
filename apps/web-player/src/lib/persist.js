import throttle from '@podlove/utils/throttle'
import { selectors } from '@podlove/player-state/timepiece'
import { requestPlaytime } from '@podlove/player-actions/timepiece'
import {
  showPauseButton,
  showSteppersControls,
  showChapterControls,
  showProgressBar
} from '@podlove/player-actions/components'
import { loadQuantiles } from '@podlove/player-actions/quantiles'
import { toggleTab } from '@podlove/player-actions/tabs'
import { compose, propOr, isEmpty } from 'ramda'
import LocalStorage from 'localstorage'
import { hashCode } from 'hashcode'

const selectPlaytime = compose(
  selectors.playtime,
  propOr({}, 'timepiece')
)

const selectQuantiles = propOr([], 'quantiles')

const selectTabs = propOr({}, 'tabs')

export const persistPlayer = (config, store) => {
  const storage = new LocalStorage('pwp-')
  const key = hashCode().value(config)
  const [, existing = {}] = storage.get(key)

  if (!isEmpty(existing)) {
    store.dispatch(showPauseButton())
    store.dispatch(showSteppersControls())
    store.dispatch(showChapterControls())
    store.dispatch(showProgressBar())
  }

  if (existing.tabs) {
    const tab = Object.keys(existing.tabs).find(tab => existing.tabs[tab])
    store.dispatch(toggleTab(tab))
  }

  if (existing.playtime) {
    store.dispatch(requestPlaytime(existing.playtime))
  }

  if (existing.quantiles) {
    store.dispatch(loadQuantiles(existing.quantiles))
  }

  store.subscribe(
    throttle(() => {
      const state = store.getState()
      const playtime = selectPlaytime(state)
      const tabs = selectTabs(state)
      const quantiles = selectQuantiles(state)

      storage.put(key, { playtime, tabs, quantiles })
    }, 1000)
  )
}

import { propOr, compose } from 'ramda'
import { selectors } from '@podlove/player-state/timepiece'
import { requestPlay, requestPause } from '@podlove/player-actions/play'
import { requestPlaytime } from '@podlove/player-actions/timepiece'
import { urlParameters } from '@podlove/utils/location'
import { showPauseButton } from '@podlove/player-actions/components'
import { restore } from '@podlove/player-actions/lifecycle'
import { ready } from './store'

const selectPlaytime = compose(
  selectors.playtime,
  propOr({}, 'timepiece')
)

const stopAt = (stoptime, store) => {
  const unsubscribe = store.subscribe(() => {
    if (selectPlaytime(store.getState()) < stoptime) {
      return
    }

    unsubscribe()
    store.dispatch(requestPause())
  })
}

export const applyUrlParameters = store => {
  ready(() => {
    const { starttime, stoptime, autoplay } = urlParameters()
    if (starttime || autoplay || stoptime) {
      store.dispatch(restore())
      store.dispatch(showPauseButton())
    }

    if (starttime) {
      store.dispatch(requestPlaytime(starttime))
    }

    if (autoplay) {
      store.dispatch(requestPlay())
    }

    if (stoptime) {
      stopAt(stoptime, store)
    }
  }, store)
}

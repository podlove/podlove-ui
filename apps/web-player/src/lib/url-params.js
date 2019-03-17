import { propOr, compose } from 'ramda'
import { selectors } from '@podlove/player-state/timepiece'
import { requestPlay, requestPause } from '@podlove/player-actions/play'
import { requestPlaytime } from '@podlove/player-actions/timepiece'
import { urlParameters } from '@podlove/utils/location'

const selectPlaytime = compose(
  selectors.playtime,
  propOr({}, 'timepiece')
)

const stopAt = (stoptime, store) => {
  let stopped = false

  store.subscribe(() => {
    if (stopped) {
      return
    }

    if (selectPlaytime(store.getState()) < stoptime) {
      return
    }

    stopped = true
    store.dispatch(requestPause())
  })
}

export const applyUrlParameters = store => {
  const { starttime, stoptime, autoplay } = urlParameters

  if (starttime) {
    store.dispatch(requestPlaytime(starttime))
  }

  if (autoplay) {
    store.dispatch(requestPlay())
  }

  if (stoptime) {
    stopAt(stoptime, store)
  }
}

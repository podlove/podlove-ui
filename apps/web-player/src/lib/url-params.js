import { propOr, compose } from 'ramda'
import { selectors } from '@podlove/player-state/timepiece'
import { requestPlay, requestPause } from '@podlove/player-actions/play'
import { requestPlaytime } from '@podlove/player-actions/timepiece'
import { urlParameters } from '@podlove/utils/location'
import {
  showPauseButton,
  showSteppersControls,
  showChapterControls,
  showProgressBar
} from '@podlove/player-actions/components'

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

  if (starttime || autoplay || stoptime) {
    store.dispatch(showPauseButton())
    store.dispatch(showSteppersControls())
    store.dispatch(showChapterControls())
    store.dispatch(showProgressBar())
  }

  if (starttime) {
    store.dispatch(requestPlaytime(starttime + 1000))
  }

  if (autoplay) {
    store.dispatch(requestPlay())
  }

  if (stoptime) {
    stopAt(stoptime + 1000, store)
  }
}

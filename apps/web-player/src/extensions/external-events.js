import { compose, prop } from 'ramda'
import { toPlayerTime } from '@podlove/utils/time'
import { requestPlaytime } from '@podlove/player-actions/timepiece'
import { toggleTab } from '@podlove/player-actions/tabs'
import { requestPlay, requestPause } from '@podlove/player-actions/play'

const isPlayerInstance = id => (data = {}) => (data.ref === id ? data : {})

const handleAction = store => (data = {}) => {
  switch (data.action) {
    case 'play':
      store.dispatch(requestPlay())
      break

    case 'pause':
      store.dispatch(requestPause())
      break
  }

  return data
}

const handleTab = store => (data = {}) => {
  data.tab && store.dispatch(toggleTab(data.tab))
  return data
}

const handleTime = store => (data = {}) => {
  data.time && store.dispatch(requestPlaytime(toPlayerTime(data.time)))
  return data
}

const eventHandler = (id, store) =>
  compose(
    handleTime(store),
    handleTab(store),
    handleAction(store),
    isPlayerInstance(id),
    prop('dataset'),
    prop('target')
  )

/**
 * External Events registry
 *
 * rel="podlove-web-player"
 *   data-ref="web-player-id"
 *   data-action="play|pause"
 *   data-tab="info"
 *   data-time="00:10:12"
 */
const registerExternalEvents = id => store => {
  const references = [...document.querySelectorAll('[rel="podlove-web-player"]')]
  references.forEach(ref => ref.addEventListener('click', eventHandler(id, store)))

  return store
}

if (typeof window.registerExternalEvents === 'undefined') {
  window.registerExternalEvents = registerExternalEvents
}

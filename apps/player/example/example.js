import { init } from '@podlove/player-actions/init'

import episode from './episode.json'
import config from './config.json'

window.addEventListener(
  'load',
  () => {
    window.PODLOVE_STORE.dispatch(init(Object.assign({}, episode, config)))
  },
  false
)

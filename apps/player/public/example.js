import { init } from '@podlove/player-actions/init'
import createPlayer from '../src/bootstrap'

import episode from './episode.json'
import config from './config.json'

const { app, store } = createPlayer()

window.addEventListener(
  'load',
  () => {
    app.mount('#app')
    store.dispatch(init(Object.assign({}, episode, config)))
  },
  false
)

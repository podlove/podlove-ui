import example from './example.json'
import { init } from '@podlove/player-actions/init'

window.addEventListener('load', () => {
  window.PODLOVE_STORE.dispatch(init(example))
}, false)


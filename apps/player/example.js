import example from './example.json'
import { init } from '@podlove/actions/init'

window.addEventListener('load', () => {
  window.PODLOVE_STORE.dispatch(init(example))
}, false)


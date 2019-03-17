import example from './example.json'
import transcripts from './transcripts.json'
import { init } from '@podlove/player-actions/init'

window.addEventListener('load', () => {
  window.PODLOVE_STORE.dispatch(init(Object.assign({}, example, { transcripts })))
}, false)


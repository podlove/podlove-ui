import { init } from '@podlove/player-actions/init'

import example from './example.json'
import transcripts from './transcripts.json'

window.addEventListener(
  'load',
  () => {
    window.PODLOVE_STORE.dispatch(init(Object.assign({}, example, { transcripts })))
  },
  false
)

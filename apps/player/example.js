import example from './example.json'
import transcript from './transcript.json'
import { init } from '@podlove/player-actions/init'
import { initTranscripts } from '@podlove/player-actions/transcripts'

window.addEventListener('load', () => {
  window.PODLOVE_STORE.dispatch(init(example))
  window.PODLOVE_STORE.dispatch(initTranscripts(transcript))
}, false)


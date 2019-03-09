import example from './example.json'
import transcript from './transcript.json'
import { init } from '@podlove/actions/init'
import { initTranscripts } from '@podlove/actions/transcripts'

window.addEventListener('load', () => {
  window.PODLOVE_STORE.dispatch(init(example))
  window.PODLOVE_STORE.dispatch(initTranscripts(transcript))
}, false)


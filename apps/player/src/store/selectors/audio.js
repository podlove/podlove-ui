import { compose } from 'ramda'
import { selectors as audio } from '@podlove/player-state/audio'

import root from './root'

const volume = compose(audio.volume, root.audio)
const muted = compose(audio.muted, root.audio)
const rate = compose(audio.rate, root.audio)

const icon = state => {
  if (muted(state)) {
    return 'speaker-0'
  }

  if (volume(state) >= 0.75) {
    return 'speaker-75'
  }

  if (volume(state) >= 0.5) {
    return 'speaker-50'
  }

  if (volume(state) > 0) {
    return 'speaker-25'
  }

  return 'speaker-0'
}

export default {
  volume,
  muted,
  icon,
  rate
}

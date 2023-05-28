import { createSelector } from 'reselect'
import { selectors as runtime } from '@podlove/player-state/runtime'
import { compose } from 'ramda'

import root from './root.js'

const target = compose((mode) => (mode === 'native' ? '_parent' : '_blank'), runtime.mode)

const fixed = compose((mode) => mode === 'embed', runtime.mode)

export default {
  language: createSelector(root.runtime, runtime.language),
  platform: createSelector(root.runtime, runtime.platform),
  mode: createSelector(root.runtime, runtime.mode),
  locale: createSelector(root.runtime, runtime.locale),
  version: createSelector(root.runtime, runtime.version),
  target: createSelector(root.runtime, target),
  fixed: createSelector(root.runtime, fixed)
}

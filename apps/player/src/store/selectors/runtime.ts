import { createSelector } from 'reselect'
import { selectors as runtime } from '@podlove/player-state/runtime'

import root from './root.js'

export default {
  language: createSelector(root.runtime, runtime.language),
  platform: createSelector(root.runtime, runtime.platform),
  mode: createSelector(root.runtime, runtime.mode),
  locale: createSelector(root.runtime, runtime.locale),
  version: createSelector(root.runtime, runtime.version),
  target: createSelector(root.runtime, (runtime) => runtime.mode === 'native' ? '_parent' : '_blank'),
  fixed: createSelector(root.runtime, (runtime) => runtime.mode === 'embed')
}

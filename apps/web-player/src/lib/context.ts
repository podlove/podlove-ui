/* eslint-disable no-global-assign, no-unused-vars */
/* global BASE, MODE, resourceBaseUrl, __webpack_public_path__ */

import { propOr } from 'ramda'
import { CompleteConfig } from '@podlove/player-config'

export const create = (config: CompleteConfig) => {
  window['resourceBaseUrl'] = MODE === 'cdn' ? BASE : propOr(BASE, 'base', config.reference)
  __webpack_public_path__ = window['resourceBaseUrl']
}

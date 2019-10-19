/* eslint-disable no-global-assign, no-unused-vars */
/* global BASE, MODE, resourceBaseUrl, __webpack_public_path__ */

import { propOr } from 'ramda'

export const create = (config = {}) => {
  window.resourceBaseUrl = MODE === 'cdn' ? BASE : propOr(BASE, 'base', config.reference)
  __webpack_public_path__ = window.resourceBaseUrl
}

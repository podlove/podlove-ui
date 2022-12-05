import { createAction } from './action-creator'

import {
  ERROR_POSTER_LOAD,
  SHOW_ERROR,
  HIDE_ERROR,
  ERROR_CONFIG_MEDIA,
  ERROR_CONFIG_MISSING
} from './types'

export const errorPosterLoad = createAction(ERROR_POSTER_LOAD)
export const showError = createAction(SHOW_ERROR)
export const hideError = createAction(HIDE_ERROR)
export const errorMissingMedia = createAction(ERROR_CONFIG_MEDIA)
export const errorConfigMissing = createAction(ERROR_CONFIG_MISSING)

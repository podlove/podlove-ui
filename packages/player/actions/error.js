import { createAction } from 'redux-actions'

import { ERROR_POSTER_LOAD, SHOW_ERROR, HIDE_ERROR, ERROR_CONFIG_MEDIA } from './types'

export const errorPosterLoad = createAction(ERROR_POSTER_LOAD)
export const showError = createAction(SHOW_ERROR)
export const hideError = createAction(HIDE_ERROR)
export const errorMissingMedia = createAction(ERROR_CONFIG_MEDIA)

import { createAction } from './action-creator'
import { FILE_HOVER, FILE_SELECT } from './types'

export const selectFile = createAction(FILE_SELECT)
export const hoverFile = createAction(FILE_HOVER)

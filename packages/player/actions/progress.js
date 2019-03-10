import { ENABLE_GHOST_MODE, DISABLE_GHOST_MODE } from './types'
import { createAction } from 'redux-actions'

export const enableGhost = createAction(ENABLE_GHOST_MODE)
export const disableGhost = createAction(DISABLE_GHOST_MODE)

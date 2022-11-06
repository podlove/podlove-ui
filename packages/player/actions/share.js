import { createAction } from './action-creator'
import { SELECT_CONTENT, SELECT_CHANNEL } from './types'

export const selectContent = createAction(SELECT_CONTENT)
export const selectChannel = createAction(SELECT_CHANNEL)

import { createAction } from 'redux-actions'
import { SELECT_CONTENT, SELECT_SHARE_EMBED_SIZE, SELECT_CHANNEL } from './types'

export const selectContent = createAction(SELECT_CONTENT)
export const selectEmbedSize = createAction(SELECT_SHARE_EMBED_SIZE)
export const selectChannel = createAction(SELECT_CHANNEL)

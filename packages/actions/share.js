import { createAction } from 'redux-actions'
import { SELECT_SHARE_CONTENT, SELECT_SHARE_EMBED_SIZE, SELECT_SHARE_CHANNEL } from './types'

export const selectShareContent = createAction(SELECT_SHARE_CONTENT)
export const selectChannel = createAction(SELECT_SHARE_CHANNEL)
export const selectEmbedSize = createAction(SELECT_SHARE_EMBED_SIZE)

import { createAction } from 'redux-actions'
import { NEXT_PLAYLIST_ENTRY, SELECT_PLAYLIST_ENTRY } from './types'

export const nextEpisode = createAction(NEXT_PLAYLIST_ENTRY)
export const selectEpisode = createAction(SELECT_PLAYLIST_ENTRY)

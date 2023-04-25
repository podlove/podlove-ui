import { createAction } from 'redux-actions'
import { NEXT_PLAYLIST_ENTRY, SELECT_PLAYLIST_ENTRY, MARK_PLAYLIST_ENTRY_ACTIVE } from './types'

export type nextEpisodePayload = { play: boolean };
export type selectEpisodePayload = { index: number, play: boolean };
export type markActivePayload = number;

export const nextEpisode = createAction<nextEpisodePayload>(NEXT_PLAYLIST_ENTRY)
export const selectEpisode = createAction<selectEpisodePayload>(SELECT_PLAYLIST_ENTRY)
export const markActive = createAction<markActivePayload>(MARK_PLAYLIST_ENTRY_ACTIVE)

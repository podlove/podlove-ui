import { createAction } from 'redux-actions'
import { FILE_HOVER, FILE_SELECT } from './types'
import type { PodloveWebPlayerFile } from '@podlove/types'

export type selectFilePayload = PodloveWebPlayerFile
export type hoverFilePayload = PodloveWebPlayerFile

export const selectFile = createAction<selectFilePayload>(FILE_SELECT)
export const hoverFile = createAction<hoverFilePayload>(FILE_HOVER)

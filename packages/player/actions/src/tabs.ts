import { createAction } from 'redux-actions'
import type { PodloveWebPlayerTab } from '@podlove/types';

import { TOGGLE_TAB } from './types'

export type toggleTabPayload = PodloveWebPlayerTab;

export const toggleTab = createAction<toggleTabPayload>(TOGGLE_TAB)

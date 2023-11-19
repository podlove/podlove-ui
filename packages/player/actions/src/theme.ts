import { createAction } from 'redux-actions';
import type { PodloveWebPlayerEpisode } from '@podlove/types';

import { SET_THEME } from './types.js';

export type setThemePayload = PodloveWebPlayerEpisode;

export const setTheme = createAction<setThemePayload>(SET_THEME);

import { createAction } from 'redux-actions';
import type { PodloveTheme } from '@podlove/types';

import { SET_THEME } from './types.js';

export type setThemePayload = { theme: PodloveTheme };

export const setTheme = createAction<setThemePayload>(SET_THEME);

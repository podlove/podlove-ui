import { createAction } from 'redux-actions';
import type { PodloveWebPlayerTheme } from '@podlove/types';

import { SET_THEME } from './types';

export type setThemePayload = { theme: PodloveWebPlayerTheme };

export const setTheme = createAction<setThemePayload>(SET_THEME);

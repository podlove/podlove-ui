import { ENABLE_GHOST_MODE, DISABLE_GHOST_MODE } from './types.js';
import { createAction } from 'redux-actions';

export type enableGhostPayload = void;
export type disableGhosttPayload = void;

export const enableGhost = createAction<enableGhostPayload>(ENABLE_GHOST_MODE);
export const disableGhost = createAction<disableGhosttPayload>(DISABLE_GHOST_MODE);

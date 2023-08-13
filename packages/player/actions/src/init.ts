import { createAction } from 'redux-actions';
import { INIT } from './types.js';

export const init = createAction<any>(INIT);

import { createSelector } from 'reselect';
import { selectors as playstate } from '@podlove/player-state/playstate';

import root from './root.js';

export default createSelector(root.playstate, playstate.playstate);

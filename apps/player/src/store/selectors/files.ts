import { createSelector } from 'reselect';
import { selectors as files } from '@podlove/player-state/files';

import root from './root.js';

export default {
  files: createSelector(root.files, files.files)
};

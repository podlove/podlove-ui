import { scope } from '@podlove/utils/helper';
import { selectors as theme } from '@podlove/player-state/theme';
import root from './root.js';


export default {
  ...scope(theme, root.theme)
};

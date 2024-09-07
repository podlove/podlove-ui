import { selectors as theme } from '@podlove/player-state/theme';
import root from './root.js';
import { createSelector } from 'reselect';

export default {
  brand: createSelector(root.theme, theme.brand),
  brandDark: createSelector(root.theme, theme.brandDark),
  brandDarkest: createSelector(root.theme, theme.brandDarkest),
  brandLightest: createSelector(root.theme, theme.brandLightest),
  shadeDark: createSelector(root.theme, theme.shadeDark),
  shadeBase: createSelector(root.theme, theme.shadeBase),
  contrast: createSelector(root.theme, theme.contrast),
  alt: createSelector(root.theme, theme.alt)
};

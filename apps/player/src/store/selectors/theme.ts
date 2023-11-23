import { createSelector } from 'reselect';
import { scope } from '@podlove/utils/helper';
import { PodloveThemeFont } from '@podlove/types';
import { selectors as theme } from '@podlove/player-state/theme';
import root from './root.js';

const fontStyle = (input: PodloveThemeFont) => ({
  'font-family': (input.family || []).map((font) => `${font}`).join(', '),
  'font-weight': input.weight
});

export default {
  ...scope(theme, root.theme),
  fonts: createSelector(
    root.theme,
    (state) => [theme.fontRegular(state), theme.fontBold(state), theme.fontCi(state)]
  ),
  fontRegular: createSelector(root.theme, createSelector(theme.fontRegular, fontStyle)),
  fontBold: createSelector(root.theme, createSelector(theme.fontBold, fontStyle)),
  fontCi: createSelector(root.theme, createSelector(theme.fontCi, fontStyle))
};

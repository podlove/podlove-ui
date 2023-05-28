import { createSelector } from 'reselect'
import { scope } from '@podlove/utils/helper'
import { selectors as theme } from '@podlove/player-state/theme'
import root from './root.js'

const fontStyle = ({ weight = 300, family = [] } = {}) => ({
  'font-family': family.map((font) => `${font}`).join(', '),
  'font-weight': weight
})

export default {
  ...scope(theme, root.theme),
  fonts: createSelector(
    (state) => [theme.fontRegular(state), theme.fontBold(state), theme.fontCi(state)],
    root.theme
  ),
  fontRegular: createSelector(root.theme, theme.fontRegular, fontStyle),
  fontBold: createSelector(root.theme, theme.fontBold, fontStyle),
  fontCi: createSelector(root.theme, theme.fontCi, fontStyle)
}

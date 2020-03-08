import { compose } from 'ramda'
import { scope } from '@podlove/utils/helper'
import { selectors as theme } from '@podlove/player-state/theme'
import root from './root'

const fontStyle = ({ weight = 300, family = [] } = {}) => ({
  'font-family': family.map(font => `"${font}"`).join(', '),
  'font-weight': weight
})

export default {
  ...scope(theme, root.theme),
  fonts: compose(
    state => [theme.fontRegular(state), theme.fontBold(state), theme.fontCi(state)],
    root.theme
  ),
  fontRegular: compose(fontStyle, theme.fontRegular, root.theme),
  fontBold: compose(fontStyle, theme.fontBold, root.theme),
  fontCi: compose(fontStyle, theme.fontCi, root.theme)
}

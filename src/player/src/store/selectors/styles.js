import { compose } from 'lodash/fp'
import color from 'color'
import { selectors as theme } from '@podlove/state/theme'
import root from './root'

const fallbackColor = (first, second) => first || second

const wrapper = state => ({
  background: theme.lightColor(state)
})

const header = state => ({
  background: theme.mainColor(state)
})

const poster = state => ({
  'border-color': theme.isNegative(state) ? theme.lightColor(state) : theme.darkColor(state)
})

const title = state => ({
  color: fallbackColor(theme.highlightColor(state), theme.isNegative(state) ? theme.lightColor(state) : theme.darkColor(state))
})

const description = state => ({
  color: color(theme.isNegative(state) ? theme.lightColor(state) : theme.darkColor(state)).fade(0.25)
})

export default {
  wrapper: compose(wrapper, root.theme),
  header: compose(header, root.theme),
  poster: compose(poster, root.theme),
  title: compose(title, root.theme),
  description: compose(description, root.theme)
}

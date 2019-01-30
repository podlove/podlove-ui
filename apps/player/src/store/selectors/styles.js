import { compose } from 'lodash/fp'
import color from 'color'
import { selectors as theme } from '@podlove/state/theme'
import { luminosity } from '@podlove/utils/color'
import root from './root'

const fallbackColor = (first, second) => first || second

const textColor = state => fallbackColor(theme.highlightColor(state), theme.isNegative(state) ? theme.lightColor(state) : theme.darkColor(state))

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
  color: textColor(state)
})

const description = state => ({
  color: color(theme.isNegative(state) ? theme.lightColor(state) : theme.darkColor(state)).fade(0.25)
})

const button = state => ({
  background: textColor(state),
  color: theme.mainColor(state)
})

const controls = state => ({
  background: theme.mainColor(state)
})

const progress = state => ({
  background: theme.mainColor(state)
})

const progressBar = state => ({
  range: luminosity(0.05, theme.mainColor(state)) ? color(theme.lightColor(state)).fade(0.25).string() : color(theme.darkColor(state)).fade(0.75).string(),
  thumb: textColor(state),
  highlight: theme.mainColor(state)
})

const timer = state => color(textColor(state)).fade(0.5).string()

const chapterTitle = state => ({
  color: textColor(state)
})

export default {
  wrapper: compose(wrapper, root.theme),
  header: compose(header, root.theme),
  poster: compose(poster, root.theme),
  title: compose(title, root.theme),
  description: compose(description, root.theme),
  button: compose(button, root.theme),
  controls: compose(controls, root.theme),
  progress: compose(progress, root.theme),
  progressBar: compose(progressBar, root.theme),
  timer: compose(timer, root.theme),
  chapterTitle: compose(chapterTitle, root.theme)
}

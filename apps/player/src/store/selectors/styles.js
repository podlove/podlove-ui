import { compose } from 'lodash/fp'
import color from 'color'
import { selectors as theme } from '@podlove/player-state/theme'
import root from './root'

const fallbackColor = (first, second) => first || second

const monoColor = state =>
  theme.isNegative(state) ? theme.lightColor(state) : theme.darkColor(state)

const textColor = state => fallbackColor(theme.highlightColor(state), monoColor(state))

const wrapper = state => ({
  background: theme.lightColor(state)
})

const header = state => ({
  background: theme.mainColor(state)
})

const poster = state => ({
  'border-color': monoColor(state)
})

const title = state => ({
  color: textColor(state)
})

const description = state => ({
  color: color(monoColor(state)).fade(0.25)
})

const button = state => ({
  background: theme.mainColor(state),
  color: textColor(state),
  border: theme.isNegative(state)
    ? color(theme.mainColor(state))
        .lighten(0.1)
        .string()
    : theme.greyColor(state)
})

const buttonLight = state => ({
  ...button(state),
  background: color(theme.mainColor(state))
    .lighten(0.2)
    .string()
})

const buttonInverted = state => ({
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
  range:
    theme.luminosity(state) < 0.05
      ? color(theme.lightColor(state))
          .fade(0.25)
          .string()
      : color(theme.darkColor(state))
          .fade(0.75)
          .string(),
  thumb: textColor(state),
  highlight: theme.mainColor(state)
})

const timer = state =>
  color(textColor(state))
    .fade(0.5)
    .string()

const chapterTitle = state => ({
  color: textColor(state)
})

const tabsHead = state => ({
  background:
    theme.luminosity(state) < 0.15
      ? color(theme.mainColor(state))
          .lighten(0.2 - theme.luminosity(state))
          .string()
      : color(theme.mainColor(state))
          .darken(0.2)
          .string(),
  backgroundActive: color(theme.mainColor(state))
    .fade(0.9)
    .string(),
  color: monoColor(state),
  colorActive: theme.isNegative(state) ? theme.darkColor(state) : theme.lightColor(state)
})

const tabsBody = state => ({
  background: color(theme.mainColor(state))
    .fade(0.9)
    .string()
})

const imageCover = state =>
  color(theme.mainColor(state))
    .fade(0.25)
    .string()

const chapterIcon = state =>
  theme.isNegative(state) ? theme.mainColor(state) : theme.darkColor(state)

const activeChapter = state => ({
  'background-color': theme.isNegative(state)
    ? color(theme.mainColor(state))
        .fade(0.8)
        .string()
    : color(theme.darkColor(state))
        .fade(0.9)
        .string(),
  color: theme.darkColor(state)
})

const progressChapterColor = state =>
  theme.isNegative(state)
    ? color(theme.mainColor(state))
        .fade(0.1)
        .string()
    : color(theme.darkColor(state))
        .fade(0.1)
        .string()

const cardHeader = state => ({
  background: color(theme.mainColor(state))
    .fade(0.2)
    .string(),
  color: theme.isNegative(state) ? theme.lightColor(state) : theme.darkColor(state)
})

const cardBody = state => theme.lightColor(state)

const iconColor = monoColor
const iconBackground = state =>
  color(theme.mainColor(state))
    .lighten(0.2)
    .string()

const shareSectionStyle = state => ({
  background: color(theme.mainColor(state))
    .fade(0.8)
    .string()
})

const shareActiveContentStyle = state => ({
  background: color(theme.mainColor(state))
    .fade(0.2)
    .string(),
  color: theme.isNegative(state) ? theme.lightColor(state) : theme.darkColor(state)
})

const shareContentStyle = state => ({
  background: color(theme.mainColor(state))
    .fade(0.8)
    .string(),
  color: theme.isNegative(state) ? theme.darkColor(state) : theme.lightColor(state)
})

const inputStyle = state => ({
  background: color(theme.mainColor(state))
    .lighten(0.3)
    .string(),
  color: theme.isNegative(state) ? theme.lightColor(state) : theme.darkColor(state),
  border: theme.isNegative(state)
    ? color(theme.mainColor(state))
        .lighten(0.1)
        .string()
    : theme.greyColor(state)
})

const transcriptsChapter = state => ({
  background: color(theme.mainColor(state))
    .fade(0.8)
    .string(),
  color: theme.greyColor(state)
})

const transcriptsActive = state => ({
  background: color(theme.mainColor(state))
    .fade(0.6)
    .string(),
  color: theme.greyColor(state),
  border: `1px solid ${color(theme.mainColor(state))
    .fade(0.6)
    .string()}`
})

const transcriptsGhost = state => ({
  background: color(theme.greyColor(state))
    .fade(0.8)
    .string(),
  color: theme.greyColor(state),
  border: `1px solid ${color(theme.greyColor(state))
    .fade(0.8)
    .string()}`
})

const error = state => ({
  background: theme.mainColor(state),
  color: monoColor(state)
})

export default {
  negative: compose(
    theme.isNegative,
    root.theme
  ),
  wrapper: compose(
    wrapper,
    root.theme
  ),
  header: compose(
    header,
    root.theme
  ),
  poster: compose(
    poster,
    root.theme
  ),
  title: compose(
    title,
    root.theme
  ),
  description: compose(
    description,
    root.theme
  ),
  buttonInverted: compose(
    buttonInverted,
    root.theme
  ),
  button: compose(
    button,
    root.theme
  ),
  buttonLight: compose(
    buttonLight,
    root.theme
  ),
  controls: compose(
    controls,
    root.theme
  ),
  progress: compose(
    progress,
    root.theme
  ),
  progressBar: compose(
    progressBar,
    root.theme
  ),
  timer: compose(
    timer,
    root.theme
  ),
  chapterTitle: compose(
    chapterTitle,
    root.theme
  ),
  tabsHead: compose(
    tabsHead,
    root.theme
  ),
  tabsBody: compose(
    tabsBody,
    root.theme
  ),
  imageCover: compose(
    imageCover,
    root.theme
  ),
  chapterIcon: compose(
    chapterIcon,
    root.theme
  ),
  activeChapter: compose(
    activeChapter,
    root.theme
  ),
  progressChapterColor: compose(
    progressChapterColor,
    root.theme
  ),
  cardHeader: compose(
    cardHeader,
    root.theme
  ),
  cardBody: compose(
    cardBody,
    root.theme
  ),
  iconColor: compose(
    iconColor,
    root.theme
  ),
  iconBackground: compose(
    iconBackground,
    root.theme
  ),
  shareSectionStyle: compose(
    shareSectionStyle,
    root.theme
  ),
  shareActiveContentStyle: compose(
    shareActiveContentStyle,
    root.theme
  ),
  shareContentStyle: compose(
    shareContentStyle,
    root.theme
  ),
  inputStyle: compose(
    inputStyle,
    root.theme
  ),
  transcriptsChapter: compose(
    transcriptsChapter,
    root.theme
  ),
  transcriptsActive: compose(
    transcriptsActive,
    root.theme
  ),
  transcriptsGhost: compose(
    transcriptsGhost,
    root.theme
  ),
  error: compose(
    error,
    root.theme
  )
}

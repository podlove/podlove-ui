import { compose } from 'lodash/fp'
import color from 'color'
import { selectors as theme } from '@podlove/state/theme'
import root from './root'

const fallbackColor = (first, second) => first || second

const monoColor = state => theme.isNegative(state) ? theme.lightColor(state) : theme.darkColor(state)
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
  border: theme.isNegative(state) ? color(theme.mainColor(state)).lighten(0.1).string() : theme.greyColor(state)
})

const buttonLight = state => ({
  ...button(state),
  background: color(theme.mainColor(state)).lighten(0.2).string()
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
  range: theme.luminosity(state) < 0.05 ? color(theme.lightColor(state)).fade(0.25).string() : color(theme.darkColor(state)).fade(0.75).string(),
  thumb: textColor(state),
  highlight: theme.mainColor(state)
})

const timer = state => color(textColor(state)).fade(0.5).string()

const chapterTitle = state => ({
  color: textColor(state)
})

const tabsHead = state => ({
  background: theme.luminosity(state) < 0.15 ? color(theme.mainColor(state)).lighten(0.2 - theme.luminosity(state)).string() : color(theme.mainColor(state)).darken(0.2).string(),
  backgroundActive: color(theme.mainColor(state)).fade(0.9).string(),
  color: monoColor(state),
  colorActive: theme.isNegative(state) ? theme.darkColor(state) : theme.lightColor(state)
})

const tabsBody = state => ({
  background: color(theme.mainColor(state)).fade(0.9).string()
})

const imageCover = state => color(theme.mainColor(state)).fade(0.25).string()

const chapterIcon = state => theme.isNegative(state) ? theme.mainColor(state) : theme.darkColor(state)

const activeChapter = state => ({
  'background-color': theme.isNegative(state) ? color(theme.mainColor(state)).fade(0.8).string() : color(theme.darkColor(state)).fade(0.9).string(),
  color: theme.darkColor(state)
})

const progressChapterColor = state => theme.isNegative(state) ? color(theme.mainColor(state)).fade(0.1).string() : color(theme.darkColor(state)).fade(0.1).string()

const cardHeader = state => ({
  background: color(theme.mainColor(state)).fade(0.2).string(),
  color: theme.isNegative(state) ? theme.lightColor(state) : theme.darkColor(state)
})

const cardBody = state => theme.lightColor(state)

const iconColor = monoColor
const iconBackground = state => color(theme.mainColor(state)).lighten(0.2).string()

const shareSectionStyle = state => ({
  background: color(theme.mainColor(state)).fade(0.8).string()
})

const shareActiveContentStyle = state => ({
  background: color(theme.mainColor(state)).fade(0.2).string(),
  color: theme.isNegative(state) ? theme.lightColor(state) : theme.darkColor(state)
})

const shareContentStyle = state => ({
  background: color(theme.mainColor(state)).fade(0.8).string(),
  color: theme.isNegative(state) ? theme.darkColor(state) : theme.lightColor(state)
})

const inputStyle = state => ({
  background: color(theme.mainColor(state)).lighten(0.3).string(),
  color: theme.isNegative(state) ? theme.lightColor(state) : theme.darkColor(state),
  border: theme.isNegative(state) ? color(theme.mainColor(state)).lighten(0.1).string() : theme.greyColor(state)
})

const transcriptsChapter = state => ({
  background: color(theme.mainColor(state)).fade(0.8).string(),
  color: theme.greyColor(state)
})

const transcriptsActive = state => ({
  background: color(theme.mainColor(state)).fade(0.6).string(),
  color: theme.greyColor(state),
  border: `1px solid ${color(theme.mainColor(state)).fade(0.6).string()}`
})

const transcriptsGhost = state => ({
  background: color(theme.greyColor(state)).fade(0.8).string(),
  color: theme.greyColor(state),
  border: `1px solid ${color(theme.greyColor(state)).fade(0.8).string()}`
})

export default {
  negative: compose(theme.isNegative, root.theme),
  wrapper: compose(wrapper, root.theme),
  header: compose(header, root.theme),
  poster: compose(poster, root.theme),
  title: compose(title, root.theme),
  description: compose(description, root.theme),
  buttonInverted: compose(buttonInverted, root.theme),
  button: compose(button, root.theme),
  buttonLight: compose(buttonLight, root.theme),
  controls: compose(controls, root.theme),
  progress: compose(progress, root.theme),
  progressBar: compose(progressBar, root.theme),
  timer: compose(timer, root.theme),
  chapterTitle: compose(chapterTitle, root.theme),
  tabsHead: compose(tabsHead, root.theme),
  tabsBody: compose(tabsBody, root.theme),
  imageCover: compose(imageCover, root.theme),
  chapterIcon: compose(chapterIcon, root.theme),
  activeChapter: compose(activeChapter, root.theme),
  progressChapterColor: compose(progressChapterColor, root.theme),
  cardHeader: compose(cardHeader, root.theme),
  cardBody: compose(cardBody, root.theme),
  iconColor: compose(iconColor, root.theme),
  iconBackground: compose(iconBackground, root.theme),
  shareSectionStyle: compose(shareSectionStyle, root.theme),
  shareActiveContentStyle: compose(shareActiveContentStyle, root.theme),
  shareContentStyle: compose(shareContentStyle, root.theme),
  inputStyle: compose(inputStyle, root.theme),
  transcriptsChapter: compose(transcriptsChapter, root.theme),
  transcriptsActive: compose(transcriptsActive, root.theme),
  transcriptsGhost: compose(transcriptsGhost, root.theme)
}

// return {
//   negative,
//   background: light,
//   player: {
//     background: main,
//     poster: negative ? light : dark,
//     title: fallbackColor(highlight, negative ? light : dark),
//     text: negative ? light : dark,
//     progress: {
//       bar: negative ? light : dark,
//       thumb: fallbackColor(highlight, negative ? light : dark),
//       border: main,
//       seperator: main,
//       track: negative ? light : dark,
//       buffer: negative ? color(light).fade(0.5) : color(dark).fade(0.7),
//       range: luminosity < 0.05 ? color(light).fade(0.25) : color(dark).fade(0.75)
//     },
//     actions: {
//       background: fallbackColor(highlight, negative ? light : dark),
//       icon: main
//     },
//     timer: {
//       text: negative ? light : dark,
//       chapter: fallbackColor(highlight, negative ? light : dark)
//     }
//   },
//   tabs: {
//     header: {
//       background: luminosity < 0.15 ? color(main).lighten(0.2 - luminosity) : color(main).darken(0.2),
//       backgroundActive: color(main).fade(0.9),
//       color: negative ? light : dark,
//       colorActive: negative ? main : dark
//     },
//     body: {
//       background: color(main).fade(0.9),
//       text: grey,
//       textActive: dark,
//       icon: negative ? main : dark,
//       section: color(main).fade(0.8)
//     },
//     chapters: {
//       progress: color(negative ? main : dark).fade(0.1),
//       active: fallbackColor(highlight ? color(highlight).fade(0.5) : undefined, negative ? color(main).fade(0.8) : color(dark).fade(0.9)),
//       ghost: color(negative ? main : dark).fade(0.7)
//     },
//     share: {
//       content: {
//         active: {
//           background: color(main).fade(0.2),
//           color: negative ? light : dark
//         }
//       },
//       platform: {
//         background: color(main).fade(0.8),
//         icon: negative ? light : dark,
//         color: negative ? light : dark,
//         input: color(main).fade(0.2),
//         button: main
//       }
//     },
//     transcripts: {
//       chapter: {
//         background: color(main).fade(0.8),
//         text: color(grey)
//       },
//       active: {
//         background: color(main).fade(0.6),
//         text: negative ? main : color(grey)
//       },
//       ghost: {
//         background: color(grey).fade(0.8),
//         text: color(grey)
//       }
//     },
//     files: {
//       container: {
//         background: light
//       },
//       header: {
//         background: color(main).fade(0.2),
//         color: negative ? light : dark
//       }
//     }
//   },
//   overlay: {
//     button: negative ? light : dark,
//     background: color(main).lighten(0.9)
//   },
//   input: {
//     background: color(main).lighten(0.3),
//     color: negative ? light : dark,
//     border: negative ? color(main).lighten(0.1) : grey
//   },
//   button: {
//     background: main,
//     color: negative ? light : dark,
//     light: color(main).lighten(0.2),
//     border: negative ? color(main).lighten(0.1) : grey
//   },
//   icon: {
//     color: negative ? light : dark,
//     background: color(main).lighten(0.2)
//   }
// }

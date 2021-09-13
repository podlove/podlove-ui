import ChapterProgress from './ChapterProgress.vue'
import * as color from 'color'
import * as defaults from 'defaults'

export default {
  title: 'ChapterProgress',
  component: ChapterProgress
}

const Template = (args) => ({
  components: { ChapterProgress },
  setup() {
    return { args }
  },
  template: `
  <div style="background: ${color(defaults.background).fade(0.8).string()}">
    <chapter-progress v-bind="args">
    </chapter-progress>
  </div>
  `
})

export const Default = Template.bind({})

Default.args = {
  showLink: true,
  progressColor: defaults.background
}

Default.argTypes = {
  onChapter: {
    action: 'chapterAction'
  },
  onPlay: {
    action: 'playAction'
  },
  onGhost: {
    action: 'ghostAction'
  },
  onPlaytime: {
    action: 'playtimeAction'
  },
  onHover: {
    action: 'hoverAction'
  },
  onSimulate: {
    action: 'simulateAction'
  },
  chapter: {
    defaultValue: {
      start: 0,
      end: 5 * 60 * 1000,
      title: 'Chapter Title',
      href: 'http://google.de',
      linkTitle: 'Link Title',
      active: true
    },
    control: { type: 'object' }
  },
  ghost: {
    defaultValue: null,
    control: { type: 'number' }
  },
  playtime: {
    defaultValue: 2.5 * 60 * 1000,
    control: { type: 'number' }
  }
}

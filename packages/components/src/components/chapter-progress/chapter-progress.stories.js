import ChapterProgress from './ChapterProgress.vue'
import * as color from 'color'
import * as defaults from 'defaults'

export default {
  title: 'ChapterProgress',
  component: ChapterProgress
}

const Template = (args, { argTypes }) => ({
  components: { ChapterProgress },
  props: Object.keys(argTypes),
  template: `
  <div style="background: ${color(defaults.background).fade(0.8).string()}">
    <chapter-progress
      :chapter="chapter"
      :showLink="showLink"
      :playtime="playtime"
      :ghost="ghost"
      :progressColor="progressColor"
      @chapter="onChapter"
      @play="onPlay"
      @ghost="onGhost"
      @playtime="onPlaytime"
      @hover="onHover"
      @simulate="onSimulate"
    >
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

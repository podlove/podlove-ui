import { color, text, number, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ChapterProgress from '.'
import * as col from 'color'
import * as defaultVariables from 'defaults'

export default () => ({
  components: { ChapterProgress },
  props: {
    chapter: {
      type: Object,
      default: {
        start: number('chapter:start', 0),
        end: number('chapter:end', 5 * 60 * 1000),
        title: text('chapter:title', 'Chapter Title'),
        href: text('chapter:href', 'http://google.de'),
        linkTitle: text('chapter:linkTitle', 'Link Title'),
        active: boolean('chapter:active', true)
      }
    },
    showLink: {
      type: Boolean,
      default: boolean('showLink', true)
    },
    playtime: {
      type: Number,
      default: number('playtime', 2.5 * 60 * 1000)
    },
    ghost: {
      type: Number,
      default: number('ghost')
    },
    progressColor: {
      type: String,
      default: color('progressColor', defaultVariables.background)
    }
  },
  template: `
    <div style="background: ${col(defaultVariables.background)
      .fade(0.8)
      .string()}">
      <chapter-progress
        :chapter="chapter"
        :showLink="showLink"
        :playtime="playtime"
        :ghost="ghost"
        :progressColor="progressColor"
        @chapter="chapterAction"
        @play="playAction"
        @ghost="ghostAction"
        @playtime="playtimeAction"
        @hover="hoverAction"
        @simulate="simulateAction"
      >
      </chapter-progress>
    </div>`,
  methods: {
    chapterAction: action('@chapter'),
    playAction: action('@play'),
    playtimeAction: action('@playtime'),
    ghostAction: action('@ghost'),
    hoverAction: action('@hover'),
    simulateAction: action('@simulate')
  }
})

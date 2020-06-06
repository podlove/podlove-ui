import { color, text, number, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ProgressBar from '.'

export default () => ({
  components: { ProgressBar },
  props: {
    time: {
      default: number('time', 0)
    },
    duration: {
      default: number('duration', 1000)
    },
    ghost: {
      default: number('ghost', 450)
    },
    buffer: {
      default: () => object('buffer', [[0, 500]])
    },
    quantiles: {
      default: () => object('quantiles', [[50, 200]])
    },
    chapters: {
      default: () =>
        object('chapters', [
          {
            start: 0,
            end: 250
          },
          {
            start: 250,
            end: 500
          },
          {
            start: 500,
            end: 750
          },
          {
            start: 750,
            end: 1000
          }
        ])
    },
    progressColor: {
      default: color('progressColor', '#D1C477')
    },
    thumbColor: {
      default: color('thumbColor', '#000')
    },
    highlightColor: {
      default: color('highlightColor', '#D1C477')
    },
    label: {
      default: text('label', '')
    },
    title: {
      default: text('title', 'input title')
    }
  },
  template: `
    <progress-bar
      style="width: 400px"
      :title="title"
      :time="time"
      :duration="duration"
      :ghost="ghost"
      :quantiles="quantiles"
      :buffer="buffer"
      :chapters="chapters"
      :progressColor="progressColor"
      :thumbColor="thumbColor"
      :highlightColor="highlightColor"
      :label="label"
      @input="input"
      @simulate="simulate"
      @ghost="ghostAction"
    >
    </progress-bar>`,
  methods: { input: action('@click'), simulate: action('@simulate'), ghostAction: action('@ghost') }
})

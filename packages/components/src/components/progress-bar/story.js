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
      default: number('ghost')
    },
    buffer: {
      default: () => object('buffer', [[0, 500]])
    },
    quantiles: {
      default: () => object('quantiles', [[50, 200]])
    },
    chapters: {
      default: () => object('chapters', [{
        end: 400
      }])
    },
    progressColor: {
      default: color('color', '#f00')
    },
    thumbColor: {
      default: color('color', '#0f0')
    },
    highlightColor: {
      default: color('color', '#00f')
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
      style="width: 200px"
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
      @ghost="ghost"
    >
    </progress-bar>`,
  methods: { input: action('@click'), simulate: action('@simulate'), ghost: action('@ghost') }
})

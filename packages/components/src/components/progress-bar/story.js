import { color, text, number, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ProgressBar from '.'

export default () => ({
  components: { ProgressBar },
  data () {
    return {
      time: number('time', 0),
      duration: number('duration', 1000),
      ghost: number('ghost'),
      buffer: object('buffer', [[0, 500]]),
      quantiles: object('quantiles', [[50, 200]]),
      chapters: object('chapters', [{
        end: 400
      }])
    }
  },
  template: `
    <progress-bar
      style="width: 200px"
      title="${text('title', 'input title')}"
      :time="time"
      :duration="duration"
      :ghost="ghost"
      :quantiles="quantiles"
      :buffer="buffer"
      :chapters="chapters"
      progressColor="${color('color', '#f00')}"
      thumbColor="${color('color', '#0f0')}"
      highlightColor="${color('color', '#00f')}"
      label="${text('label', '')}"
      @input="input"
      @simulate="simulate"
    >
    </progress-bar>`,
  methods: { input: action('@click'), simulate: action('@simulate') }
})

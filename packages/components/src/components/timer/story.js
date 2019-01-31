import { number, color } from '@storybook/addon-knobs'

import Timer from '.'

export default () => ({
  components: { Timer },
  props: {
    time: {
      default: number('time', 5 * 60 * 1000)
    },
    color: {
      default: color('color', '#000')
    }
  },
  template: `
    <timer
      :time="time"
      :color="color"
    >
    </timer>`
})

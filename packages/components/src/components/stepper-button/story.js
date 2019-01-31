import { select, color } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import StepperButton from '.'

const types = { forward: 'forward', backwards: 'backwards' }

export default () => ({
  components: { StepperButton },
  props: {
    type: {
      default: select('type', types, 'forward')
    },
    color: {
      default: color('color', '#000')
    }
  },
  template: `
    <stepper-button
      :type="type"
      :color="color"
      @click="action"
    >
    </stepper-button>`,
  methods: { action: action('@click') }
})

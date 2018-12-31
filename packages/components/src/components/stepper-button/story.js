import { select, color } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import StepperButton from '.'

const types = { forward: 'forward', backwards: 'backwards' }

export default () => ({
  components: { StepperButton },
  template: `
    <stepper-button
      type="${select('type', types, 'forward')}"
      color="${color('color', '#000')}"
      @click="action"
    >
    </stepper-button>`,
  methods: { action: action('@click') }
})

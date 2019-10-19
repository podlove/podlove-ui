import InputCheckbox from '.'
import { boolean, text, color } from '@storybook/addon-knobs'
import * as defaultColors from 'defaults'
import { action } from '@storybook/addon-actions'

export default () => ({
  components: { InputCheckbox },
  props: {
    label: {
      default: text('label', 'Input Label')
    },

    disabled: {
      default: boolean('disabled', false)
    },

    value: {
      default: boolean('value', false)
    },

    color: {
      default: color('color', defaultColors.background)
    },

    borderColor: {
      default: color('borderColor', defaultColors.background)
    },

    background: {
      default: color('background', defaultColors.color)
    }
  },
  methods: {
    change: action('@change')
  },
  template: `
    <input-checkbox :value="value" :disabled="disabled" :label="label" :borderColor="borderColor" :background="background" @change="change"></input-checkbox>
  `
})

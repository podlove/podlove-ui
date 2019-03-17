import { boolean, text, color, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import InputSelect from '.'

import * as defaultColors from 'defaults'

export default () => ({
  components: { InputSelect },
  props: {
    disabled: {
      default: boolean('disabled', false)
    },

    value: {
      default: text('value', 'value-2')
    },

    options: {
      default: object('options', ['value-1', 'value-2', 'value-3', 'value-4'])
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
    <input-select :value="value" :disabled="disabled" :color="color" :options="options" :borderColor="borderColor" :background="background" @change="change"></input-select>
  `
})

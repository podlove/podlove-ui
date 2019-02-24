import { boolean, text, color } from '@storybook/addon-knobs'

import InputText from '.'

import * as defaultColors from 'defaults';

export default () => ({
  components: { InputText },
  props: {
    disabled: {
      default: boolean('disabled', false)
    },

    value: {
      default: text('value', 'my value')
    },

    color: {
      default: color('color', defaultColors.color)
    },

    borderColor: {
      default: color('borderColor', defaultColors.highlight)
    },

    background: {
      default: color('background', defaultColors.background)
    },

    block: {
      default: boolean('block', false)
    }
  },
  template: `
    <input-text :value="value" :disabled="disabled" :color="color" :borderColor="borderColor" :background="background" :block="block"></input-text>`
})

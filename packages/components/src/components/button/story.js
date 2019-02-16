import { color, boolean, text } from '@storybook/addon-knobs'

import ButtonComponent from '.'
import * as defaults from 'defaults'

export default () => ({
  components: { ButtonComponent },
  props: {
    textColor: {
      default: color('textColor', defaults.color)
    },
    backgroundColor: {
      default: color('backgroundColor', defaults.background)
    },
    borderColor: {
      default: color('borderColor', defaults.highlight)
    },
    href: {
      default: text('href')
    },
    disabled: {
      default: boolean('disabled', false)
    },
    text: {
      default: text('text', 'Button Text')
    }
  },
  template: `
    <button-component
      :textColor="textColor"
      :backgroundColor="backgroundColor"
      :borderColor="borderColor"
      :href="href"
      :disabled="disabled"
    >
      {{ text }}
    </button-component>`
})

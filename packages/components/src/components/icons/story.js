import { select, color, number } from '@storybook/addon-knobs'

import Icon from '.'

import iconTypes from './types'

const types = iconTypes.reduce((result, type) => ({
  ...result,
  [type]: type
}), {})

export default () => ({
  components: { Icon },
  template: `
    <icon
      type="${select('type', types, 'play')}"
      color="${color('color', '#000')}"
      :size="${number('size', 21)}"
    >
    </icon>`
})

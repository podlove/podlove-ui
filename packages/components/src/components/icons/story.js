import { select, color, number } from '@storybook/addon-knobs'

import Icon from '.'

import { types as iconTypes } from './types'

const types = iconTypes.reduce(
  (result, type) => ({
    ...result,
    [type]: type
  }),
  {}
)

export default () => ({
  components: { Icon },
  props: {
    type: {
      default: select('type', types, 'play')
    },
    color: {
      default: color('color', '#000')
    },
    size: {
      default: number('size', 21)
    }
  },
  template: `
    <icon
      :type="type"
      :color="color"
      :size="size"
    >
    </icon>`
})

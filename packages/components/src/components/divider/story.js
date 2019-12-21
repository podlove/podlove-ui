import { color } from '@storybook/addon-knobs'

import Divider from '.'

import * as defaultVariables from 'defaults'

export default () => ({
  components: { Divider },
  props: {
    color: {
      default: color('color', defaultVariables.color)
    }
  },
  template: `<divider :color="color"></divider>`
})

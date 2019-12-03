import { select, text, color } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Tooltip from '.'

const types = { hover: 'hover', click: 'click' }
const positions = {
  auto: 'auto',
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left'
}

export default () => ({
  components: { Tooltip },
  props: {
    trigger: {
      default: select('trigger', types, 'hover')
    },
    content: {
      default: text('content', 'Tooltip Content')
    },
    color: {
      default: color('color', '#fff')
    },
    background: {
      default: color('background', '#000')
    },
    placement: {
      default: select('placement', positions, 'bottom')
    }
  },
  template: `
    <tooltip :content="content" :trigger="trigger" :color="color" :background="background" :placement="placement" @click="action">
      <span>Tooltip trigger</span>
    </tooltip>`,
  methods: { action: action('@click') }
})

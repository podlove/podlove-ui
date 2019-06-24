import { select, boolean, text } from '@storybook/addon-knobs'
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
    negative: {
      default: boolean('negative', false)
    },
    placement: {
      default: select('placement', positions, 'bottom')
    }
  },
  template: `
    <tooltip :content="content" :trigger="trigger" :negative="negative" :placement="placement" @click="action">
      <span>Tooltip trigger</span>
    </tooltip>`,
  methods: { action: action('@click') }
})

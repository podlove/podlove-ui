import { select, boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Tooltip from '.'

const types = { hover: 'hover', click: 'click' }

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
    }
  },
  template: `
    <tooltip :content="content" :trigger="trigger" :negative="negative" @click="action">
      <span>Tooltip trigger</span>
    </tooltip>`,
  methods: { action: action('@click') }
})

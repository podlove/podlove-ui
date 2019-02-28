import { color, text, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ContentOption from '.'
import Icon from '../icons'
import { types as iconTypes } from '../icons/types'
import * as defaults from 'defaults'

const icons = iconTypes.reduce((result, type) => ({
  ...result,
  [type]: type
}), {})

export default () => ({
  components: { ContentOption, Icon },
  props: {
    content: {
      default: text('content', 'Show')
    },
    title: {
      default: text('title', 'Content Title')
    },
    type: {
      default: text('type', 'show')
    },
    icon: {
      default: select('icon', icons, 'play')
    },
    background: {
      default: color('background', defaults.background)
    },
    color: {
      default: color('color', defaults.color)
    }
  },
  template: `
    <content-option
      :content="content"
      :title="title"
      :type="type"
      :active="active"
      :icon="icon"
      @click="clickAction"
    >
      <icon slot="icon" :type="icon" />
    </content-option>`,
  methods: {
    clickAction: action('@click')
  }
})

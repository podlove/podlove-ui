import * as defaults from 'defaults'
import ContentOption from './ContentOption.vue'
import Icon from '../icons'
import { types as iconTypes } from '../icons/types'

export default {
  title: 'ContentOption',
  component: ContentOption
}

const Template = (args, { argTypes }) => ({
  components: { ContentOption, Icon },
  props: Object.keys(argTypes),
  template: `
  <content-option
      :content="content"
      :title="title"
      :type="type"
      :active="active"
      :icon="icon"
      :background="background"
      :color="color"
      @click="onClick"
    >
      <icon slot="icon" :type="icon" />
    </content-option>
  `
})

export const Default = Template.bind({})

Default.args = {
  content: 'Show',
  title: 'Content Title',
  type: 'show',
  background: defaults.background,
  color: defaults.color,
  active: false
}

Default.argTypes = {
  onClick: {
    action: 'clickAction'
  },
  icon: {
    defaultValue: 'play',
    options: iconTypes,
    control: {
      type: 'select'
    }
  }
}

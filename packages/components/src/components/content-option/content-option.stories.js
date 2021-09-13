import * as defaults from 'defaults'
import ContentOption from './ContentOption.vue'
import Icon from '../icons'
import { types as iconTypes } from '../icons/types'

export default {
  title: 'ContentOption',
  component: ContentOption
}

const Template = (args) => ({
  components: { ContentOption, Icon },
  setup() {
    return { args }
  },
  template: `
    <content-option v-bind="args">
      <template #icon>
        <icon :type="args.icon" />
      </template>
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

import Divider from './Divider.vue'
import * as defaults from 'defaults'

export default {
  title: 'Divider',
  component: Divider
}

const Template = (args) => ({
  components: { Divider },
  setup() {
    return { args }
  },
  template: `<divider v-bind="args"></divider>`
})

export const Default = Template.bind({})

Default.args = {
  color: defaults.color
}

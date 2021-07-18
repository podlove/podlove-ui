import Divider from './Divider.vue'
import * as defaults from 'defaults'

export default {
  title: 'Divider',
  component: Divider
}

const Template = (args, { argTypes }) => ({
  components: { Divider },
  props: Object.keys(argTypes),
  template: `<divider :color="color"></divider>`
})

export const Default = Template.bind({})

Default.args = {
  color: defaults.color
}

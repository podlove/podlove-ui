import InputText from './InputText.vue'
import * as defaults from 'defaults'

export default {
  title: 'InputText',
  component: InputText
}

const Template = (args) => ({
  components: { InputText },
  setup() {
    return { args }
  },
  template: `
    <input-text v-bind="args"></input-text>
  `
})

export const Default = Template.bind({})

Default.args = {
  disabled: false,
  value: 'my value',
  color: defaults.color,
  borderColor: defaults.highlight,
  background: defaults.background,
  block: false
}

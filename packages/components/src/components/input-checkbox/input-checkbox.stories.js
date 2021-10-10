import InputCheckbox from './InputCheckbox.vue'
import * as defaults from 'defaults'

export default {
  title: 'InputCheckbox',
  component: InputCheckbox
}

const Template = (args) => ({
  components: { InputCheckbox },
  setup() {
    return { args }
  },
  template: `
  <input-checkbox v-bind="args">
  </input-checkbox>
  `
})

export const Default = Template.bind({})

Default.args = {
  value: false,
  disabled: false,
  label: 'Input Label',
  borderColor: defaults.background,
  background: defaults.color
}

Default.argTypes = {
  onChange: {
    action: 'changeAction'
  }
}

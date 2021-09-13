import InputSelect from './InputSelect.vue'
import * as defaults from 'defaults'

export default {
  title: 'InputSelect',
  component: InputSelect
}

const Template = (args) => ({
  components: { InputSelect },
  setup() {
    return { args }
  },
  template: `<input-select v-bind="args"></input-select>`
})

export const Default = Template.bind({})

Default.args = {
  value: 'value-2',
  disabled: false,
  borderColor: defaults.background,
  background: defaults.color,
  color: defaults.background,
  options: ['value-1', 'value-2', 'value-3', 'value-4']
}

Default.argTypes = {
  onChange: {
    action: 'changeAction'
  }
}

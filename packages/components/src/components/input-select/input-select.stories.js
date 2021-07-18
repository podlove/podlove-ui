import InputSelect from './InputSelect.vue'
import * as defaults from 'defaults'

export default {
  title: 'InputSelect',
  component: InputSelect,
};

const Template = (args, { argTypes }) => ({
  components: { InputSelect },
  props: Object.keys(argTypes),
  template: `
  <input-select
    :value="value"
    :disabled="disabled"
    :color="color"
    :options="options"
    :borderColor="borderColor"
    :background="background"
    @change="onChange">
  </input-select>
  `
});

export const Default = Template.bind({});

Default.args = {
  value: 'value-2',
  disabled: false,
  borderColor: defaults.background,
  background: defaults.color,
  color: defaults.background,
  options: ['value-1', 'value-2', 'value-3', 'value-4'],
};

Default.argTypes = {
  onChange: {
    action: 'changeAction'
  }
}

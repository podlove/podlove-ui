import InputCheckbox from './InputCheckbox.vue'
import * as defaults from 'defaults'

export default {
  title: 'InputCheckbox',
  component: InputCheckbox,
};

const Template = (args, { argTypes }) => ({
  components: { InputCheckbox },
  props: Object.keys(argTypes),
  template: `
  <input-checkbox
     :value="value"
     :disabled="disabled"
     :label="label"
     :borderColor="borderColor"
     :background="background"
     @change="onChange">
  </input-checkbox>
  `
});

export const Default = Template.bind({});

Default.args = {
  value: false,
  disabled: false,
  label: 'Input Label',
  borderColor: defaults.background,
  background: defaults.color,
};

Default.argTypes = {
  onChange: {
    action: 'changeAction'
  },
}

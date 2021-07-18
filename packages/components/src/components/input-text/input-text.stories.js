import InputText from './InputText.vue'
import * as defaults from 'defaults'


export default {
  title: 'InputText',
  component: InputText,
};

const Template = (args, { argTypes }) => ({
  components: { InputText },
  props: Object.keys(argTypes),
  template: `
    <input-text
      :value="value"
      :disabled="disabled"
      :color="color"
      :borderColor="borderColor"
      :background="background"
      :block="block">
    </input-text>
  `
});

export const Default = Template.bind({});

Default.args = {
  disabled: false,
  value: 'my value',
  color: defaults.color,
  borderColor: defaults.highlight,
  background: defaults.background,
  block: false
};


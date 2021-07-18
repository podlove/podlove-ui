import ButtonComponent from './Button.vue'
import * as defaults from 'defaults'

export default {
  title: 'Button',
  component: ButtonComponent,
};

const Template = (args, { argTypes }) => ({
  components: { ButtonComponent },
  props: Object.keys(argTypes),
  template: `
    <button-component
      :textColor="textColor"
      :backgroundColor="backgroundColor"
      :href="href"
      :disabled="disabled"
    >{{ text }}</button-component>
  `
});

export const Default = Template.bind({});

Default.args = {
  textColor: defaults.color,
  backgroundColor: defaults.background,
  borderColor: defaults.highlight,
  href: 'href',
  disabled: false,
  text: 'Button Text'
};

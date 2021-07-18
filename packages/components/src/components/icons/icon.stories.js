import Icon from './Icon.vue'
import { types as iconTypes } from './types'


export default {
  title: 'Icon',
  component: Icon,
};

const Template = (args, { argTypes }) => ({
  components: { Icon },
  props: Object.keys(argTypes),
  template: `
  <icon
    :type="type"
    :color="color"
    :size="size"
  >
  </icon>`
});

export const Default = Template.bind({});

Default.args = {
  color: '#000',
  size: 21
};

Default.argTypes = {
  type: {
    options: iconTypes,
    defaultValue: 'play',
    control: { type: 'select' }
  }
}

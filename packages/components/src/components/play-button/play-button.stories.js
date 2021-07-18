import PlayButton from './PlayButton.vue'
import * as defaults from 'defaults'


export default {
  title: 'PlayButton',
  component: PlayButton,
};

const Template = (args, { argTypes }) => ({
  components: { PlayButton },
  props: Object.keys(argTypes),
  template: `
  <play-button
    :type="type"
    :color="color"
    :background="background"
    :label="label"
    :size="size"
    @click="onClick"
  >
  </play-button>
  `
});

export const Default = Template.bind({});

Default.args = {
  color: defaults.color,
  background: defaults.background,
  label: '',
  size: 50
};

Default.argTypes = {
  onClick: {
    action: 'clickAction'
  },
  type: {
    options: ['loading', 'play', 'pause', 'restart'],
    defaultValue: 'loading',
    control: { type: 'select' }
  }
}

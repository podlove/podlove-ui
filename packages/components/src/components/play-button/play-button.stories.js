import PlayButton from './PlayButton.vue'
import * as defaults from 'defaults'

export default {
  title: 'PlayButton',
  component: PlayButton
}

const Template = (args) => ({
  components: { PlayButton },
  setup() {
    return { args }
  },
  template: `
  <play-button v-bind="args"></play-button>
  `
})

export const Default = Template.bind({})

Default.args = {
  color: defaults.color,
  background: defaults.background,
  label: '',
  size: 50
}

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

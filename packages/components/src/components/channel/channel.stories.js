import Channel from './Channel.vue'

export default {
  title: 'Channel',
  component: Channel
}

const Template = (args) => ({
  components: { Channel },
  setup() {
    return { args }
  },
  // props: Object.keys(argTypes),
  template: `
  <channel v-bind="args"></channel>
  `
})

export const Default = Template.bind({})

Default.args = {
  color: '#fff',
  background: '#000',
  link: 'http://google.de',
  subject: 'The Subject',
  filled: false,
  a11y: 'The a11y text'
}

Default.argTypes = {
  type: {
    defaultValue: 'embed',
    options: [
      'embed',
      'facebook',
      'linkedin',
      'mail',
      'reddit',
      'twitter',
      'xing',
      'whats-app',
      'pinterest',
      'link'
    ],
    control: { type: 'select' }
  },
  onClick: {
    action: 'clicked'
  }
}

import Channel from './Channel.vue'

export default {
  title: 'Channel',
  component: Channel
}

const Template = (args, { argTypes }) => ({
  components: { Channel },
  props: Object.keys(argTypes),
  template: `
  <channel
    :type="type"
    :color="color"
    @click="onClick"
    :link="link"
    :subject="subject"
    :text="text"
    :background="background"
    :a11y="a11y"
    :filled="filled">
  </channel>
  `
})

export const Default = Template.bind({})

Default.args = {
  color: '#fff',
  background: '#000',
  link: 'http://google.de',
  subject: 'The Subject',
  text: 'The Text',
  filled: false,
  a11y: 'The a11y text'
}

Default.argTypes = {
  type: {
    defaultValue: 'embed',
    options: ['embed', 'facebook', 'linkedin', 'mail', 'reddit', 'twitter', 'pinterest'],
    control: { type: 'select' }
  },
  onClick: {
    action: 'clicked'
  }
}

import { select, color, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Channel from '.'

const types = ['embed', 'facebook', 'linkedin', 'mail', 'reddit', 'twitter', 'pinterest'].reduce(
  (result, type) => ({
    ...result,
    [type]: type
  }),
  {}
)

export default () => ({
  components: { Channel },
  props: {
    color: {
      default: color('color', '#000')
    },
    type: {
      default: select('type', types, 'embed')
    },
    link: {
      type: String,
      default: text('link', 'http://google.de')
    },
    subject: {
      type: String,
      default: text('subject', 'The Subject')
    },
    text: {
      type: String,
      default: text('text', 'The Text')
    },
    a11y: {
      type: String,
      default: text('a11y', 'The a11y text')
    }
  },
  template: `
    <channel :type="type" :color="color" @click="action" :link="link" :subject="subject" :text="text" :a11y="a11y">
    </channel>`,
  methods: { action: action('@click') }
})

import LazyImage from './Image.vue'
import * as defaults from 'defaults'

export default {
  title: 'LazyImage',
  component: LazyImage
}

const Template = (args, { argTypes }) => ({
  components: { LazyImage },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: `
  <lazy-image
      class="lazy-image"
      v-bind="args"
    >
  </lazy-image>
  `
})

export const Default = Template.bind({})

Default.args = {
  alt: 'Image Alt text',
  url: 'https://via.placeholder.com/1500',
  color: defaults.background
}

Default.argTypes = {
  onLoad: {
    action: 'loadAction'
  },
  onError: {
    action: 'errorAction'
  }
}

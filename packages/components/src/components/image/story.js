import { text, color } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import { background as defaultColor } from 'defaults'

import LazyImage from '.'

export default () => ({
  components: { LazyImage },
  props: {
    alt: {
      default: text('alt', 'Image Alt text')
    },
    url: {
      default: text('url', 'https://via.placeholder.com/1500')
    },
    color: {
      default: color('color', defaultColor)
    }
  },
  template: `
    <lazy-image
      class="lazy-image"
      style="width: 250px; height: 250px;"
      :alt="alt"
      :url="url"
      :color="color"
      @error="error"
      @load="load"
    >
    </lazy-image>`,
  methods: { error: action('@error'), load: action('@load') }
})

import { select, color } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ChapterButton from '.'

const types = { next: 'next', previous: 'previous' }

export default () => ({
  components: { ChapterButton },
  props: {
    color: {
      default: color('color', '#000')
    },
    type: {
      default: select('type', types, 'next')
    }
  },
  template: `
    <chapter-button
      :type="type"
      :color="color"
      @click="action"
    >
    </chapter-button>`,
  methods: { action: action('@click') }
})

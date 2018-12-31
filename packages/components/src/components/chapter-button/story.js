import { select, color } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import ChapterButton from '.'

const types = { next: 'next', previous: 'previous' }

export default () => ({
  components: { ChapterButton },
  template: `
    <chapter-button
      type="${select('type', types, 'next')}"
      color="${color('color', '#000')}"
      @click="action"
    >
    </chapter-button>`,
  methods: { action: action('@click') }
})

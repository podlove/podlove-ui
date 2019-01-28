import { select, color, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import PlayButton from '.'

import * as defaultVariables from 'defaults'

const types = { loading: 'loading', play: 'play', pause: 'pause', restart: 'restart' }

export default () => ({
  components: { PlayButton },
  data () {
    return {
      type: select('type', types, 'loading')
    }
  },
  template: `
    <play-button
      :type="type"
      color="${color('color', defaultVariables.color)}"
      background="${color('background', defaultVariables.background)}"
      label="${text('label', '')}"
      @click="action"
    >
    </play-button>`,
  methods: { action: action('@click') }
})

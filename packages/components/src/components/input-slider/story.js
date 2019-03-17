import { color, object, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import InputSelect from '.'

import * as defaultColors from 'defaults'

export default () => ({
  components: { InputSelect },
  props: {
    min: {
      default: number('min', 0)
    },
    max: {
      default: number('max', 100)
    },
    step: {
      default: number('step', 1)
    },
    value: {
      default: number('value', 0)
    },
    pins: {
      default: object('pins', [
        {
          value: 0,
          label: '0x'
        },
        {
          value: 0.25,
          label: '25x'
        },
        {
          value: 0.5,
          label: '50x'
        },
        {
          value: 0.75,
          label: '75x'
        },
        {
          value: 1,
          label: '100x'
        }
      ])
    },

    borderColor: {
      default: color('borderColor', defaultColors.background)
    },

    background: {
      default: color('background', defaultColors.color)
    }
  },
  methods: {
    change: action('@change'),
    input: action('@input'),
    dblclick: action('@dblclick')
  },

  template: `
    <div style="width: 350px; margin: 20px;">
      <input-select
        :min="min"
        :max="max"
        :step="step"
        :value="value"
        :pins="pins"
        :borderColor="borderColor"
        :background="background"
        @change="change"
        @input="input"
        @dblclick="dblclick"
      >
      </input-select>
    </div>
  `
})

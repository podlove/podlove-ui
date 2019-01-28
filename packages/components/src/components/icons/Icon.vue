<template>
  <component :is="type" :color="color" :background="background" :size="size" aria-hidden="true" />
</template>

<script>
import { background, color } from 'defaults'

import types from './types'

import Play from './states/Play'
import Pause from './states/Pause'
import Restart from './states/Restart'
import Loading from './states/Loading'
import Next from './states/Next'
import Previous from './states/Previous'
import Forward from './states/Forward'
import Backwards from './states/Backwards'

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator: (val) => types.includes(val)
    },
    background: {
      type: String,
      default: background
    },
    color: {
      type: String,
      default: color
    },
    size: {
      type: Number
    }
  },
  components: {
    Play, Pause, Restart, Loading, Next, Previous, Forward, Backwards
  }
}
</script>

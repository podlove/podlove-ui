<template>
  <button
    :id="`stepper-button--${type}`"
    class="stepper-button opacity-100 hover:opacity-75"
    @click="clickHandler"
  >
    <icon :type="type" :color="color" />
    <slot />
  </button>
</template>

<script>
import { stepForward, stepBackwards } from '@podlove/player-actions/stepper'
import Icon from '../icons/Icon'
import { color } from '../../defaults'

export default {
  components: {
    Icon
  },
  props: {
    type: {
      type: String,
      required: true,
      validator: (val) => ['forward', 'backwards'].includes(val)
    },
    color: {
      type: String,
      default: color
    }
  },
  emit: {
    forward: null,
    backwards: null
  },
  methods: {
    clickHandler() {
      switch (this.type) {
        case 'forward':
          this.$emit('forward', stepForward())
          break
        case 'backwards':
          this.$emit('backwards', stepBackwards())
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>

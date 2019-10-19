<template>
  <button :id="`stepper-button--${type}`" class="stepper-button" @click="clickHandler">
    <icon :type="type" :color="color" />
    <slot />
  </button>
</template>

<script>
import { color } from 'defaults'
import Icon from 'components/icons'
import { stepForward, stepBackwards } from '@podlove/player-actions/stepper'

export default {
  components: {
    Icon
  },
  props: {
    type: {
      type: String,
      required: true,
      validator: val => ['forward', 'backwards'].includes(val)
    },
    color: {
      type: String,
      default: color
    }
  },
  methods: {
    clickHandler() {
      switch (this.type) {
        case 'forward':
          this.$emit('click', stepForward())
          break
        case 'backwards':
          this.$emit('click', stepBackwards())
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'boot';
@import 'resets';

.stepper-button {
  @extend %button;
  opacity: 1;

  &:hover {
    opacity: 0.8;
  }
}
</style>

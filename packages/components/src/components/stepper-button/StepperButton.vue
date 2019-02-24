<template>
  <button class="stepper-button" @click="clickHandler" :id="`stepper-button--${type}`">
    <icon :type="type" :color="color" />
    <slot></slot>
  </button>
</template>

<script>
import { color } from 'defaults'
import Icon from 'components/icons'
import { stepForward, stepBackwards } from '@podlove/actions/stepper'

export default {
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
  components: {
    Icon
  },
  methods: {
    clickHandler () {
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
  }
</style>

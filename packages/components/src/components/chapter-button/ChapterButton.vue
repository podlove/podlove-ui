<template>
  <button class="chapter-button" @click="clickHandler" :id="`chapter-button--${type}`">
    <icon :type="type" :color="color" />
    <slot></slot>
  </button>
</template>

<script>
import { color } from 'defaults'
import Icon from 'components/icons'
import { nextChapter, previousChapter } from '@podlove/player-actions/chapters'

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator: (val) => ['next', 'previous'].includes(val)
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
        case 'next':
          this.$emit('click', nextChapter())
        break
        case 'previous':
          this.$emit('click', previousChapter())
        break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'boot';
  @import 'resets';

  .chapter-button {
    @extend %button;
  }
</style>

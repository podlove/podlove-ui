<template>
  <button :id="`chapter-button--${type}`" @click="clickHandler">
    <icon :type="type" :color="color" />
    <slot />
  </button>
</template>

<script>
import { color } from '../../defaults'
import Icon from '../icons/Icon'
import { nextChapter, previousChapter } from '@podlove/player-actions/chapters'

export default {
  components: {
    Icon
  },
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
  emits: {
    next: null,
    previous: null
  },
  methods: {
    clickHandler() {
      switch (this.type) {
        case 'next':
          this.$emit('next', nextChapter())
          break
        case 'previous':
          this.$emit('previous', previousChapter())
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>

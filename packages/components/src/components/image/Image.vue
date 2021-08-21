<template>
  <div class="relative image">
    <transition name="fade">
      <div v-if="!loaded" class="absolute top-0 left-0 w-full h-full" :style="coverStyle"></div>
    </transition>
    <img
      v-if="url && !error"
      class="max-h-full w-auto"
      :style="imageStyle"
      :src="url"
      :alt="alt"
      @error="errorHandler"
      @load="loadHandler"
    />
  </div>
</template>

<script>
import { background } from 'defaults'

export default {
  props: {
    url: {
      type: String,
      default: null
    },
    alt: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: background
    }
  },
  emits: ['load', 'error'],
  data() {
    return {
      loaded: false,
      width: null,
      error: false
    }
  },

  computed: {
    coverStyle() {
      return {
        'background-color': this.color
      }
    },
    imageStyle() {
      if (!this.loaded) {
        return {
          height: 0
        }
      }

      return {}
    }
  },

  methods: {
    loadHandler(event) {
      this.loaded = true
      this.$emit('load', event)
    },

    errorHandler(event) {
      this.error = true
      this.$emit('error', event)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../theme/tokens/animation';
.image {
  @extend %fade-animation;
}
</style>

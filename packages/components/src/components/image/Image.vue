<template>
  <div class="image-container">
    <transition name="fade">
      <div v-if="!loaded" class="cover" :style="coverStyle" />
    </transition>
    <img
      v-if="url && !error"
      class="image"
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
@import 'boot';
@import 'tokens/animation';

.image-container {
  position: relative;
  line-height: 0;

  .image {
    max-height: 100%;
    width: auto;
  }

  .cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  @extend %fade-animation;
}
</style>

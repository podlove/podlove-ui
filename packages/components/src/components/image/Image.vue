<template>
  <div class="image-container">
    <transition name="fade">
      <div class="cover" :style="coverStyle" v-if="!loaded"></div>
    </transition>
    <img class="image" :style="imageStyle" :src="url" :alt="alt" @error="errorHandler" @load="loadHandler" v-if="url"/>
  </div>
</template>

<script>
import { background } from 'defaults'

export default {
  data () {
    return {
      loaded: false,
      width: null
    }
  },

  props: {
    url: {
      type: String,
      default: null
    },
    alt: {
      type: String,
      default: null
    },
    coverColor: {
      type: String,
      default: background
    }
  },

  computed: {
    coverStyle () {
      return {
        'background-color': this.coverColor
      }
    },
    imageStyle () {
      if (!this.loaded) {
        return {
          height: 0
        }
      }

      return {}
    }
  },

  methods: {
    loadHandler (event) {
      this.loaded = true
      this.$emit('load', event)
    },

    errorHandler (event) {
      this.$emit('error', event)
    }
  }
}
</script>

<style lang="scss" scoped>
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

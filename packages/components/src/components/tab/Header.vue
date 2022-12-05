<template>
  <ul class="relative w-full flex items-center justify-center font-hairline h-8" role="tablist">
    <span
      class="block absolute pointer-events-none bottom-0 left-0 right-0 h-4 z-30 -mb-4"
      :style="headerShadowStyle"
    />
    <slot />
  </ul>
</template>

<script>
import { fade } from 'farbraum'
import { background as defaultBackground } from '../../defaults'

export default {
  props: {
    backgroundActive: {
      type: String,
      default: defaultBackground
    }
  },
  computed: {
    headerShadowStyle() {
      return {
        background: `linear-gradient(to bottom, ${fade(this.backgroundActive, 0)} 0%, ${fade(
          this.backgroundActive,
          1
        )} 100%)`
      }
    }
  }
}
</script>

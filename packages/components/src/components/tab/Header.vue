<template>
  <ul class="relative w-full flex items-center justify-center font-hairline h-8" role="tablist">
    <span
      class="block absolute pointer-events-none top-8 left-0 right-0 h-4 z-30"
      :style="headerShadowStyle"
    />
    <slot />
  </ul>
</template>

<script>
import color from 'color'
import { background as defaultBackground } from 'defaults'

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
        background: `linear-gradient(to bottom, ${color(this.backgroundActive).fade(0)} 0%, ${color(
          this.backgroundActive
        ).fade(1)} 100%)`
      }
    }
  }
}
</script>

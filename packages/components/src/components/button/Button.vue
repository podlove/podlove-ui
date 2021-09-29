<template>
  <component
    :is="href ? 'a' : 'button'"
    class="
      button
      flex
      justify-center
      h-8
      text-base
      cursor-pointer
      bg-transparent
      outline-none
      transition-opacity
      hover:opacity-75
      border
      rounded
      border-solid
      py-1
      px-2
      uppercase
      text-center
    "
    :class="{ 'opacity-50': disabled, 'opacity-100': !disabled }"
    :href="href"
    :style="style"
  >
    <span class="truncate w-full h-full flex items-center justify-center">
      <slot />
    </span>
  </component>
</template>

<script>
import { color, background } from 'defaults'

export default {
  props: {
    textColor: {
      type: String,
      default: background
    },
    backgroundColor: {
      type: String,
      default: color
    },
    borderColor: {
      type: String,
      default: background
    },
    href: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    style() {
      return {
        color: this.textColor,
        background: this.backgroundColor,
        'border-color': this.borderColor
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  font-variant: small-caps;
  svg {
    display: inline;
  }
}
</style>

<template>
  <li
    class="
      tab-header-item
      flex
      items-center
      justify-center
      w-full
      m-0
      opacity-100
      hover:opacity-75
      h-8
    "
    :style="tabStyle"
    :class="{ 'hover:opacity-100': active }"
    role="presentation"
    :rel="name"
  >
    <button
      :id="`trigger-${name}`"
      class="
        flex
        items-center
        justify-center
        overflow-hidden
        pt-0
        pb-0
        pl-4
        pr-4
        align-middle
        text-center
        w-full
        h-full
      "
      role="tab"
      :aria-controls="name"
      :aria-selected="active"
      :tabindex="index"
      @click="clickHandler"
    >
      <span class="icon mr-1" :style="iconStyle" aria-hidden="true"><slot name="icon" /></span>
      <span class="uppercase ml-1"><slot name="title" /></span>
      <icon v-if="active" type="close" class="hidden" :color="iconColor(true)" aria-hidden="true" />
    </button>
  </li>
</template>

<script>
import { color, background } from '../../defaults'
import Icon from '../icons/Icon'

export default {
  components: {
    Icon
  },
  props: {
    index: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    display: {
      type: String,
      default: 'native'
    },
    color: {
      type: String,
      default: color
    },
    background: {
      type: String,
      default: background
    },
    colorActive: {
      type: String,
      default: background
    },
    backgroundActive: {
      type: String,
      default: color
    }
  },
  computed: {
    tabStyle() {
      const style = {
        color: this.color,
        background: this.background
      }

      if (this.active) {
        style.color = this.colorActive
        style.background = this.backgroundActive
      }

      if (this.display === 'embed') {
        style.color = this.color
        style.background = this.background
      }

      return style
    },
    iconStyle() {
      return {
        fill: this.iconColor(this.active)
      }
    }
  },
  methods: {
    iconColor(active) {
      let color = this.color

      if (active) {
        color = this.colorActive
      }

      if (this.display === 'embed') {
        color = this.color
      }

      return color
    },

    clickHandler() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../theme/tokens/animation';

.tab-header-item {
  transition: all $animation-duration;

  .icon {
    line-height: 0;
  }
}
</style>

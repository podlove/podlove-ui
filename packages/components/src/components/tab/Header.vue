<template>
  <ul class="tab-header" :class="{ overflows }" role="tablist">
    <span class="header-shadow" :style="headerShadowStyle"></span>
    <slot></slot>
  </ul>
</template>

<script>
  import color from 'color'
  import { setStyles, resizeObserver } from '@podlove/utils/dom'
  import { color as defaultColor } from 'defaults'

  export default {
    props: {
      colorActive: {
        type: String,
        default: defaultColor
      }
    },
    data () {
      return {
        overflows: false
      }
    },
    computed: {
      headerShadowStyle () {
        return {
          background: `linear-gradient(to bottom, ${color(this.activeColor).fade(0)} 0%, ${color(this.activeColor).fade(1)} 100%)`
        }
      }
    },
    methods: {
      resizeHandler () {
        this.overflows = false

        this.$nextTick(() => {
          setStyles({ 'overflow-x': 'auto' })(this.$el)
          this.overflows = this.$el.scrollWidth > this.$el.clientWidth
          setStyles({ 'overflow-x': 'hidden' })(this.$el)
        })
      }
    },

    mounted () {
      resizeObserver(this.$el, this.resizeHandler.bind(this))
      this.resizeHandler()
    }
  }
</script>
<style lang="scss" scoped>
  @import 'resets';

  @import 'tokens/defaults';
  @import 'tokens/tab';

  .tab-header {
    @extend %list;

    position: relative;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 100;
    height: $tabs-header-height;

    .header-shadow {
      display: block;
      position: absolute;
      pointer-events: none;
      top: $tabs-header-height;
      left: 0;
      right: 0;
      height: $padding;
      z-index: $tab-shadow;
    }

    .title {
      text-transform: uppercase;
    }

    &.overflows .tab-header-item .title {
      display: none;
    }
  }
</style>

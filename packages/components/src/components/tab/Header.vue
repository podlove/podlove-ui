<template>
  <ul class="tab-header" role="tablist">
    <span class="header-shadow" :style="headerShadowStyle" />
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
<style lang="scss" scoped>
@import 'boot';
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
}
</style>

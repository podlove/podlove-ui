<template>
  <div
    class="tab-body overflow-hidden"
    :class="{
      'active overflow-y-auto': active,
      'fixed-height absolute top-0 left-0 w-full overflow-x-hidden': fixed
    }"
    role="tabpanel"
    :aria-labelledby="`trigger-${name}`"
    tabindex="0"
    :aria-hidden="!active"
  >
    <div class="tab-content" :style="bodyStyle">
      <slot tabindex="0" />
    </div>
  </div>
</template>

<script>
import { background } from '../../defaults'

export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    background: {
      type: String,
      default: background
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    bodyStyle() {
      return {
        'background-color': this.background
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../theme/tokens/color';
@import '../../theme/tokens/tab';

.tab-body {
  max-height: 0;
  background: $background-color;

  &.active {
    max-height: 100%;
  }

  &.fixed-height {
    height: calc(100% - #{$tabs-header-height});
  }
}
</style>

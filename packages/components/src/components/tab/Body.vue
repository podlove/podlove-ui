<template>
  <div
    class="tab-body"
    :class="{ active, fixed }"
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
import { background } from 'defaults'

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
@import 'boot';
@import 'tokens/color';
@import 'tokens/tab';

.tab-body {
  max-height: 0;
  overflow: hidden;

  &.active {
    max-height: $tabs-body-max-height;
    overflow-y: auto;
  }

  background: $background-color;

  &.fixed {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    overflow-x: auto;
    height: calc(100% - #{$tabs-header-height});
  }
}
</style>

<template>
  <div class="tab-body" :class="{active}" :style="bodyStyle" role="tabpanel" :aria-labelledby="`trigger-${name}`" tabindex="0" :aria-hidden="!active">
    <slot tabindex="0"></slot>
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
      }
    },
    computed: {
      bodyStyle () {
        return {
          'background-color': this.background
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'boot';
  @import 'tokens/tab';

  .tab-body {
    max-height: 0;
    overflow: hidden;

    &.active {
      max-height: $tabs-body-max-height;
      overflow-y: auto;
    }

    &.fixed {
      overflow: hidden;
    }
  }
</style>

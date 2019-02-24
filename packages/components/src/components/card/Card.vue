<template>
  <div class="card" :style="containerStyle">
    <div class="card-header" :style="headerStyle">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { background, color } from 'defaults'

export default {
  props: {
    headerColor: {
      type: String,
      default: background
    },
    backgroundColor: {
      type: String,
      default: color
    }
  },
  computed: {
    containerStyle () {
      return {
        background: this.backgroundColor
      }
    },
    headerStyle () {
      return {
        background: this.headerColor
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'boot';
  @import 'tokens/defaults';
  @import 'font';

  .card {
    @extend %font;
    border-radius: 4px;
    margin-bottom: $margin;

    &:last-child {
      margin-bottom: 0;
    }

    .card-header {
      padding: $padding / 2 $padding;
      border-radius: 4px 4px 0 0;
      font-weight: 500;
      text-transform: uppercase;
    }

    .card-body {
      padding: $padding;
    }
  }
</style>

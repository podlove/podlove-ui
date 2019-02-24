<template>
  <div
    role="button"
    :aria-label="a11y"
    class="content-option"
    @click="clickHandler"
    :style="style">
    <div class="content-option-icon">
      <slot name="icon" />
    </div>
    <span class="content-option-type" v-if="content">{{ content }}</span>
    <span class="content-option-title truncate" v-if="title">{{ title }}</span>
  </div>
</template>

<script>
import { selectContent } from '@podlove/actions/share'

import { color, background } from 'defaults'

export default {
  props: {
    content: {
      type: String
    },
    title: {
      type: String
    },
    type: {
      type: String
    },
    a11y: {
      type: String
    },
    background: {
      type: String,
      default: background
    },
    color: {
      type: String,
      default: color
    }
  },
  computed: {
    style () {
      return {
        background: this.background,
        color: this.color
      }
    }
  },
  methods: {
    clickHandler() {
      this.$emit('click', selectContent(this.type))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'boot';
  @import 'tokens/defaults';
  @import 'tokens/content-option';
  @import 'tokens/animation';
  @import 'utils';
  @import 'font';

 .content-option {
    @extend %font;

    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;

    position: relative;
    cursor: pointer;

    border-radius: 2px;

    width: $content-option-width;
    margin: 0 $margin;
    padding: $padding;

    transition: background $animation-duration;

    .content-option-icon {
      margin-bottom: $margin / 2;
    }

    .content-option-type {
      text-transform: uppercase;
      font-weight: 300;
    }

    .content-option-title {
      display: block;
      width: 100%;
    }
  }
</style>

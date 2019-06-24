<template>
  <div role="button" :aria-label="a11y" class="content-option" :style="style" @click="clickHandler">
    <div class="content-option-icon">
      <slot name="icon" />
    </div>
    <span v-if="content" class="content-option-type">{{ content }}</span>
    <span v-if="title" class="content-option-title truncate">{{ title }}</span>
  </div>
</template>

<script>
import { selectContent } from '@podlove/player-actions/share'

import { color, background } from 'defaults'

export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    a11y: {
      type: String,
      default: ''
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
    style() {
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

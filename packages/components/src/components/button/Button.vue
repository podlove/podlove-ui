<template>
  <a class="button" :class="{ disabled }" v-if="href" :href="href" :style="style">
    <span class="inner centered">
      <slot></slot>
    </span>
  </a>
  <button class="button" :class="{ disabled }" v-else :disabled="disabled" :style="style">
    <span class="inner centered">
      <slot></slot>
    </span>
  </button>
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
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      style () {
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
  @import 'font';
  @import 'resets';
  @import 'utils';
  @import 'tokens/defaults';
  @import 'tokens/button';
  @import 'tokens/animation';

  .button {
    @extend %font;
    @extend %button;

    display: flex;
    align-items: center;
    justify-content: center;
    height: $input-height;

    font-size: 1.1em;
    font-variant: small-caps;

    box-sizing: border-box;

    opacity: 1;
    transition: opacity $animation-duration;

    cursor: pointer;
    background: transparent;
    outline: none;

    &.disabled {
      opacity: 0.5;
    }

    &:hover {
      opacity: 0.8;
    }

    border-radius: 3px;
    border-width: 1px;
    border-style: solid;
    padding: $padding / 4 $padding / 2;
    text-transform: uppercase;

    .inner {
      width: 100%;
      height: 100%;
    }

    &:hover {
      opacity: 0.8;
    }

    &.block {
      display: block;
      width: 100%;
    }

    text-align: center;

    svg {
      display: inline;
    }
  }
</style>

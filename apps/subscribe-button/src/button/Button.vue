<template>
  <button id="podlove-subscribe-button" :style="filling" @click="clickevent()">
    <icon type="subscribe" :size="iconSize"></icon>
    <span v-if="format !== 'square'">Subscribe</span>
  </button>
</template>

<script>
import { mapState } from 'redux-vuex'
import { selectColor, selectCover, selectFormat, selectSize, selectStyle } from 'store/selectors'

import { Icon } from '@podlove/components'

export default {
  components: { Icon },
  props: {
    clickevent: {
      type: Function,
      default: null
    }
  },
  data: mapState({
    color: selectColor,
    cover: selectCover,
    format: selectFormat,
    size: selectSize,
    style: selectStyle
  }),
  computed: {
    filling() {
      if (this.style === 'outline') {
        return `border: 2px solid ${this.color}; color: ${this.color};`
      } else if (this.style === 'frameless') {
        return `color: ${this.color}; background: none;`
      } else {
        return `background: ${this.color};`
      }
    },
    iconSize() {
      let size = '1em'

      switch (this.size) {
        case 'small':
          size = '1.25em'
          break
        case 'medium':
          size = '1.5em'
          break
        case 'big':
          size = '1.75em'
          break
      }
      return size
    }
  }
}
</script>

<style lang="scss">
@import '~normalize-scss';
@import '~theme/reset';
@import '~theme/variable';

button {
  font-weight: 500;
  letter-spacing: 0.5px;

  text-transform: uppercase;
  transition: all 0.1s cubic-bezier(0.62, 0.28, 0.23, 0.99);
  width: 100%;
  font-size: 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>

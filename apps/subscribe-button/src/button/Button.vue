<template>
  <button id="podlove-subscribe-button" :style="filling" @click="clickevent()">
    Subscribe
  </button>
</template>

<script>
import { mapState } from 'redux-vuex'
import { selectColor, selectCover, selectFormat, selectSize, selectStyle } from 'store/selectors'

export default {
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
}
</style>

<template>
  <button :style="filling" @click="onClick">
    <icon type="subscribe" :size="iconSize"></icon>
    <span v-if="state.format !== 'square'">{{ $t('SUBSCRIBE') }}</span>
  </button>
</template>

<script>
import { mapState } from 'redux-vuex'
import Icon from '@podlove/components/icons'

import { selectColor, selectCover, selectFormat, selectSize, selectStyle } from 'store/selectors'

export default {
  components: { Icon },
  setup() {
    return {
      state: mapState({
        color: selectColor,
        cover: selectCover,
        format: selectFormat,
        size: selectSize,
        style: selectStyle
      })
    }
  },
  computed: {
    filling() {
      if (this.style === 'outline') {
        return `border: 2px solid ${this.state.color}; color: ${this.state.color};`
      } else if (this.state.style === 'frameless') {
        return `color: ${this.state.color}; background: none;`
      } else {
        return `background: ${this.state.color};`
      }
    },
    iconSize() {
      let size = 20

      switch (this.state.size) {
        case 'small':
          size = 16
          break
        case 'medium':
          size = 18
          break
        case 'big':
          size = 22
          break
      }
      return size
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
// @import '~theme/reset';
// @import '~theme/variable';

// button {
//   font-weight: 500;
//   letter-spacing: 0.5px;

//   text-transform: uppercase;
//   transition: all 0.1s cubic-bezier(0.62, 0.28, 0.23, 0.99);
//   width: 100%;
//   font-size: 16px;

//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;

//   span {
//     margin-left: 5px;
//   }
// }
</style>

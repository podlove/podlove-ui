<template>
  <div :class="dimensions">
    <cover v-if="format === 'cover'" alt="ccc" :url="state.cover" :cover-color="state.color" />
    <button-component :sb="true" @click="showOverlay"></button-component>
  </div>
</template>
<script>
import ButtonComponent from './components/Button'
import Image from '@podlove/components/image'
import { injectStore, mapState } from 'redux-vuex'

import { selectColor, selectCover, selectFormat, selectSize, selectStyle } from 'store/selectors'
import { show, hide } from '@podlove/button-actions/overlay'

export default {
  components: { Cover: Image, ButtonComponent },
  setup() {
    return {
      state: mapState({
        color: selectColor,
        cover: selectCover,
        format: selectFormat,
        size: selectSize,
        style: selectStyle
      }),
      dispatch: injectStore().dispatch
    }
  },
  computed: {
    dimensions() {
      return `${this.size.toLowerCase()}-${this.format.toLowerCase()}`
    }
  },
  methods: {
    hideOverlay() {
      this.dispatch(hide())
    },
    showOverlay() {
      this.dispatch(show())
    }
  }
}
</script>

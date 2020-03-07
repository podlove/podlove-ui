<template>
  <div :class="dimensions">
    <cover v-if="format === 'cover'" alt="ccc" :url="cover" :cover-color="color" />
    <button-component :sb="true" @click="showOverlay"></button-component>
  </div>
</template>
<script>
import { compose } from 'ramda'
import ButtonComponent from './components/Button'
import Image from '@podlove/components/image'
import { mapState } from 'redux-vuex'
import store from 'store'

import { selectColor, selectCover, selectFormat, selectSize, selectStyle } from 'store/selectors'
import { show, hide } from '@podlove/button-actions/overlay'

export default {
  components: { Cover: Image, ButtonComponent },
  data: mapState({
    color: selectColor,
    cover: selectCover,
    format: selectFormat,
    size: selectSize,
    style: selectStyle
  }),
  computed: {
    dimensions() {
      return `${this.size.toLowerCase()}-${this.format.toLowerCase()}`
    }
  },
  methods: {
    hideOverlay: compose(store.dispatch, hide),
    showOverlay: compose(store.dispatch, show)
  }
}
</script>

<template>
  <hero v-if="!overlay"></hero>
</template>
<script>
import { compose } from 'ramda'
import { mapState } from 'redux-vuex'
import store from 'store'

import Hero from './components/hero'

import * as select from 'store/selectors'
import { hide } from '@podlove/button-actions/overlay'

export default {
  components: { Hero },
  data: mapState({
    overlay: select.view.overlay
  }),
  computed: {
    dimensions() {
      return `${this.size.toLowerCase()}-${this.format.toLowerCase()}`
    }
  },
  methods: {
    hideOverlay: compose(store.dispatch, hide)
  }
}
</script>

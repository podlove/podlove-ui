<template>
  <transition name="fade">
    <root
      v-if="overlay"
      v-click-outside="close"
      class="list p-6 fixed inset-0 w-full h-full flex items-center justify-center"
    >
      <transition name="fade" mode="out-in">
        <client-screen v-if="listView" />
        <finish-screen v-if="finishView" />
      </transition>
    </root>
  </transition>
</template>

<script>
import { mapState } from 'redux-vuex'
import { compose } from 'ramda'
import Root from 'components/root'
import ClientScreen from 'screens/Clients'
import FinishScreen from 'screens/Finish'

import store from 'store'
import * as select from 'store/selectors'
import * as overlay from '@podlove/button-actions/overlay'

export default {
  components: {
    Root,
    ClientScreen,
    FinishScreen
  },
  directives: {
    'click-outside': {
      bind(el, { value: fn }) {
        el.addEventListener('click', evt => {
          if (evt.target !== el) {
            return
          }

          fn()
        })
      }
    }
  },
  data: mapState({
    overlay: select.view.overlay,
    listView: select.view.list,
    finishView: select.view.finish,
    language: select.runtime.language
  }),
  watch: {
    language() {
      this.$i18n.locale = this.language
    }
  },
  mounted() {
    this.$i18n.locale = this.language
  },
  methods: {
    close: compose(store.dispatch, overlay.hide)
  }
}
</script>

<style lang="postcss" scoped>
.list {
  background: rgba(1, 1, 1, 0.8);
}
</style>

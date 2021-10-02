<template>
  <transition name="fade">
    <root
      v-if="state.overlay"
      v-click-outside="close"
      class="list p-6 fixed inset-0 w-full h-full flex items-center justify-center"
    >
      <transition name="fade" mode="out-in">
        <client-screen v-if="state.listView" />
        <finish-screen v-else />
      </transition>
    </root>
  </transition>
</template>

<script>
import { mapState, injectStore } from 'redux-vuex'
import Root from 'components/root'
import ClientScreen from 'screens/Clients'
import FinishScreen from 'screens/Finish'

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
        el.addEventListener('click', (evt) => {
          if (evt.target !== el) {
            return
          }

          fn()
        })
      }
    }
  },
  setup() {
    return {
      state: mapState({
        overlay: select.view.overlay,
        listView: select.view.list,
        finishView: select.view.finish,
        language: select.runtime.language
      }),
      dispatch: injectStore().dispatch
    }
  },
  computed: {
    language() {
      return this.state.language
    }
  },
  watch: {
    language() {
      this.$i18n.locale = this.language
    }
  },
  mounted() {
    this.$i18n.locale = this.language
  },
  methods: {
    close() {
      this.dispatch(overlay.hide())
    }
  }
}
</script>

<style lang="postcss" scoped>
.list {
  background: rgba(1, 1, 1, 0.8);
}
</style>

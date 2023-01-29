<template>
  <transition name="fade">
    <root
      v-if="state.overlay"
      v-click-outside="close"
      class="
        bg-gray-900 bg-opacity-75
        p-6
        fixed
        inset-0
        w-full
        h-full
        flex
        items-center
        justify-center
      "
    >
      <transition name="fade" mode="out-in">
        <client-screen v-if="state.listView" />
        <finish-screen v-else />
      </transition>
    </root>
  </transition>
</template>

<script>
import * as overlay from '@podlove/button-actions/overlay'
import { mapState, injectStore } from 'redux-vuex'
import Root from './components/root/Root.vue'
import ClientScreen from './screens/Clients.vue'
import FinishScreen from './screens/Finish.vue'

import * as select from './store/selectors'

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

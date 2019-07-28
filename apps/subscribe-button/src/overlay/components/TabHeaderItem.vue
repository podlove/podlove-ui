<template>
  <tab-header-item :name="tab" :active="active" @click="toggleTab()">
    <span slot="title">
      {{ title }}
    </span>
  </tab-header-item>
</template>

<script>
import { mapState, mapActions } from 'redux-vuex'
import { Tab } from '@podlove/components'

import { selectFinishScreenVisible, tabs } from 'store/selectors'
import { CLOSE_FINISH_SCREEN, RESET_FINISH_OBJECT, TOGGLE_TAB } from 'store/reducers/types'

export default {
  components: {
    TabHeaderItem: Tab.HeaderItem
  },
  props: {
    title: {
      type: String,
      default: null
    },
    tab: {
      type: String,
      default: null
    }
  },
  data: mapState({
    tabs: tabs,
    finishScreen: selectFinishScreenVisible
  }),
  computed: {
    active() {
      return !!this.tabs[this.tab]
    }
  },
  methods: mapActions({
    toggleTab({ dispatch }) {
      dispatch({ type: TOGGLE_TAB, payload: { [this.tab]: true } })
      if (this.finishScreen) {
        dispatch({ type: RESET_FINISH_OBJECT })
        dispatch({ type: CLOSE_FINISH_SCREEN })
      }
    }
  })
}
</script>

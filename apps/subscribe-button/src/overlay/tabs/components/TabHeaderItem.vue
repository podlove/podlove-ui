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

import { tabs } from 'store/selectors'
import { TOGGLE_TAB } from 'store/reducers/types'

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
    tabs: tabs
  }),
  computed: {
    active() {
      return !!this.tabs[this.tab]
    }
  },
  methods: mapActions({
    toggleTab({ dispatch }) {
      dispatch({ type: TOGGLE_TAB, payload: { [this.tab]: true } })
    }
  })
}
</script>

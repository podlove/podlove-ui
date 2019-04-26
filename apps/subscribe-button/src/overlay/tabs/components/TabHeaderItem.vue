<template>
  <tab-header-item :name="tab" :active="active" @click="toogle(tab)">
    <span slot="title">
      {{ title }}
    </span>
  </tab-header-item>
</template>

<script>
import { mapState } from 'redux-vuex'
import { Tab } from '@podlove/components'

import { tabs } from 'store/selectors'

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
  }
}
</script>

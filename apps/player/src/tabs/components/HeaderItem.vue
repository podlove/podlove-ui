<template lang="pug">
  tab-header-item(
    :name="tab"
    @click="toggleTab(tab)"
    :color="header.color"
    :colorActive="header.colorActive"
    :background="header.background"
    :backgroundActive="header.backgroundActive"
    :active="active"
  )
    icon-component(:type="icon" slot="icon")
    span(slot="title") {{ title }}
</template>

<script>
import { mapState, mapActions } from 'redux-vuex'
import { Tab, Icon as IconComponent } from '@podlove/components'
import { toggleTab } from '@podlove/actions/tabs'

import select from 'store/selectors'
export default {
  props: {
    tab: {
      type: String
    },
    icon: {
      type: String
    },
    title: {
      type: String
    }
  },
  data: mapState({
    header: select.styles.tabsHead,
    tabs: select.tabs
  }),
  components: {
    TabHeaderItem: Tab.HeaderItem,
    IconComponent
  },
  computed: {
    active() {
      return !!this.tabs[this.tab]
    }
  },
  methods: mapActions({
    toggleTab({ dispatch }, tab) {
      dispatch(toggleTab(tab))
    }
  })
}
</script>

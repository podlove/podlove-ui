<template lang="pug">
  div.tabs
    tab-header(:backgroundActive="header.backgroundActive")
      tab-header-item(name="info" @click="toggleTab('info')" :color="header.color" :colorActive="header.colorActive" :background="header.background" :backgroundActive="header.backgroundActive" :active="tabs.info")
        icon(type="info" slot="icon")
        span(slot="title") {{ $t('INFO.TITLE') }}
</template>

<script>
import { mapState } from 'redux-vuex'
import { Tab, Icon } from '@podlove/components'
import { toggleTab } from '@podlove/actions/tabs'

import InfoTab from '../info'

import select from 'store/selectors'
import store from 'store'

const tabs = {
  InfoTab: () => import(/* webpackMode: "eager" */'../info'),
}

export default {
  data: mapState({
    header: select.styles.tabsHead,
    tabs: select.tabs
  }),
  components: {
    TabBody: Tab.Body,
    TabHeader: Tab.Header,
    TabHeaderItem: Tab.HeaderItem,
    Icon
  },
  methods: {
    toggleTab (tab) {
      store.dispatch(toggleTab(tab))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~styles/variables";

  .tabs {
    width: 100%;
    background: $background-color;
  }
</style>

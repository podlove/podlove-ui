<template lang="pug">
  div.tabs
    tab-header(:backgroundActive="header.backgroundActive")
      header-item(tab="info" icon="info" :title="$t('INFO.TITLE')")
      header-item(tab="chapters" icon="chapter" :title="$t('CHAPTERS.TITLE')")
      header-item(tab="share" icon="share" :title="$t('SHARE.TITLE')")
      header-item(tab="files" icon="download" :title="$t('FILES.TITLE')")
    tab-body(tab="info")
      info-tab
    tab-body(tab="chapters")
      chapters-tab
    tab-body(tab="share")
      share-tab
    tab-body(tab="files")
      files-tab
</template>

<script>
import { mapState, mapActions } from 'redux-vuex'
import { Tab, Icon } from '@podlove/components'
import { toggleTab } from '@podlove/actions/tabs'

import HeaderItem from './components/HeaderItem'
import TabBody from './components/TabBody'

import select from 'store/selectors'
import store from 'store'

import ShareTab from '../share'

const tabs = {
  InfoTab: () => import(/* webpackMode: "eager" */'../info'),
  ChaptersTab: () => import(/* webpackMode: "eager" */'../chapters'),
  FilesTab: () => import(/* webpackMode: "eager" */'../files'),
  // ShareTab: () => import(/* webpackMode: "eager" */'../share')
}

export default {
  data: mapState({
    header: select.styles.tabsHead,
    tabs: select.tabs
  }),
  components: {
    TabHeader: Tab.Header,
    TabBody,
    HeaderItem,
    Icon,
    ShareTab,
    ...tabs
  },
  methods: mapActions({
    toggleTab({ dispatch }, tab) {
      dispatch(toggleTab(tab))
    }
  })
}
</script>

<style lang="scss" scoped>
  @import "~styles/variables";

  .tabs {
    width: 100%;
    background: $background-color;
  }
</style>

<template lang="pug">
  div.tabs
    tab-header(:backgroundActive="header.backgroundActive")
      header-item(tab="info" :title="$t('INFO.TITLE')")
        icon(type="info" slot="icon")
      header-item(tab="chapters" :title="$t('CHAPTERS.TITLE')")
        icon(type="chapter" slot="icon")
      header-item(tab="share" :title="$t('SHARE.TITLE')")
        icon(type="share" slot="icon")
      header-item(tab="files" :title="$t('FILES.TITLE')")
        icon(type="download" slot="icon")
      header-item(tab="audio" :title="$t('AUDIO.TITLE')")
        icon(:type="audioIcon" slot="icon")
    tab-body(tab="info")
      info-tab
    tab-body(tab="chapters")
      chapters-tab
    tab-body(tab="share")
      share-tab
    tab-body(tab="files")
      files-tab
    tab-body(tab="audio")
      audio-tab
</template>

<script>
import { mapState, mapActions } from 'redux-vuex'
import { Tab, Icon } from '@podlove/components'
import { toggleTab } from '@podlove/actions/tabs'

import HeaderItem from './components/HeaderItem'
import TabBody from './components/TabBody'

import select from 'store/selectors'
import store from 'store'

import AudioTab from '../audio'

const tabs = {
  InfoTab: () => import(/* webpackMode: "eager" */'../info'),
  ChaptersTab: () => import(/* webpackMode: "eager" */'../chapters'),
  FilesTab: () => import(/* webpackMode: "eager" */'../files'),
  ShareTab: () => import(/* webpackMode: "eager" */'../share')
}

export default {
  data: mapState({
    header: select.styles.tabsHead,
    tabs: select.tabs,
    audioIcon: select.audio.icon
  }),
  components: {
    TabHeader: Tab.Header,
    TabBody,
    HeaderItem,
    AudioTab,
    Icon,
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

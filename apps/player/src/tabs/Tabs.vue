<template lang="pug">
  div.tabs
    tab-header(:backgroundActive="header.backgroundActive")
      header-item(tab="info" :title="$t('INFO.TITLE')")
        icon(type="info" slot="icon")
      header-item(tab="chapters" :title="$t('CHAPTERS.TITLE')")
        icon(type="chapter" slot="icon")
      header-item(tab="transcripts" :title="$t('TRANSCRIPTS.TITLE')")
        icon(type="transcripts" slot="icon")
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
    tab-body(tab="transcripts")
      transcripts-tab
</template>

<script>
import { compose } from 'ramda'
import { mapState, mapActions } from 'redux-vuex'
import { Tab, Icon } from '@podlove/components'
import { toggleTab } from '@podlove/player-actions/tabs'

import HeaderItem from './components/HeaderItem'
import TabBody from './components/TabBody'

import select from 'store/selectors'
import store from 'store'

const tabs = {
  InfoTab: () =>
    import(/* webpackChunkName: "info-tab" */
    /* webpackMode: "lazy" */
    /* webpackPreload: true */
    '../info'),
  ChaptersTab: () =>
    import(/* webpackChunkName: "chapters-tab" */
    /* webpackMode: "lazy" */
    /* webpackPreload: true */
    '../chapters'),
  FilesTab: () =>
    import(/* webpackChunkName: "files-tab" */
    /* webpackMode: "lazy" */
    /* webpackPreload: true */
    '../files'),
  ShareTab: () =>
    import(/* webpackChunkName: "share-tab" */
    /* webpackMode: "lazy" */
    /* webpackPreload: true */
    '../share'),
  AudioTab: () =>
    import(/* webpackChunkName: "audio-tab" */
    /* webpackMode: "lazy" */
    /* webpackPreload: true */
    '../audio'),
  TranscriptsTab: () =>
    import(/* webpackChunkName: "transcripts-tab" */
    /* webpackMode: "lazy" */
    /* webpackPreload: true */
    '../transcripts')
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
    Icon,
    ...tabs
  },
  methods: {
    toggleTab: compose(
      store.dispatch,
      toggleTab
    )
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.tabs {
  width: 100%;
  background: $background-color;
}
</style>

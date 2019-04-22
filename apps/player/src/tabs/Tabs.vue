<template lang="pug">
  div.tabs#tabs
    tab-header(:class="{overflows}" :backgroundActive="header.backgroundActive" v-resize="resizeHandler" ref="tabHeader")
      tab-header-item(tab="info" :title="$t('INFO.TITLE')" v-if="infoTab")
        icon(type="info" slot="icon")
      tab-header-item(tab="chapters" :title="$t('CHAPTERS.TITLE')" v-if="chaptersTab")
        icon(type="chapter" slot="icon")
      tab-header-item(tab="transcripts" :title="$t('TRANSCRIPTS.TITLE')" v-if="transcriptTab")
        icon(type="transcripts" slot="icon")
      tab-header-item(tab="share" :title="$t('SHARE.TITLE')" v-if="shareTab")
        icon(type="share" slot="icon")
      tab-header-item(tab="files" :title="$t('FILES.TITLE')" v-if="filesTab")
        icon(type="download" slot="icon")
      tab-header-item(tab="audio" :title="$t('AUDIO.TITLE')" v-if="audioTab")
        icon(:type="audioIcon" slot="icon")
    tab-body(tab="info" v-if="infoTab" rel="info")
      info-tab
    tab-body(tab="chapters" v-if="chaptersTab" rel="chapters")
      chapters-tab
    tab-body(tab="transcripts" v-if="transcriptTab" rel="transcripts")
      transcripts-tab
    tab-body(tab="share" v-if="shareTab" rel="share")
      share-tab
    tab-body(tab="files" v-if="filesTab" rel="files")
      files-tab
    tab-body(tab="audio" v-if="audioTab" rel="audio")
      audio-tab
</template>

<script>
import { compose } from 'ramda'
import { Tab, Icon } from '@podlove/components'
import { toggleTab } from '@podlove/player-actions/tabs'

import TabHeaderItem from './components/TabHeaderItem'
import TabBody from './components/TabBody'

import select from 'store/selectors'
import store from 'store'

import { setStyles } from '@podlove/utils/dom'

const tabs = {
  InfoTab: () =>
    import(
      /* webpackChunkName: "info-tab" */
      /* webpackMode: "lazy" */
      /* webpackPreload: true */
      '../info'
    ),
  ChaptersTab: () =>
    import(
      /* webpackChunkName: "chapters-tab" */
      /* webpackMode: "lazy" */
      /* webpackPreload: true */
      '../chapters'
    ),
  FilesTab: () =>
    import(
      /* webpackChunkName: "files-tab" */
      /* webpackMode: "lazy" */
      /* webpackPreload: true */
      '../files'
    ),
  ShareTab: () =>
    import(
      /* webpackChunkName: "share-tab" */
      /* webpackMode: "lazy" */
      /* webpackPreload: true */
      '../share'
    ),
  AudioTab: () =>
    import(
      /* webpackChunkName: "audio-tab" */
      /* webpackMode: "lazy" */
      /* webpackPreload: true */
      '../audio'
    ),
  TranscriptsTab: () =>
    import(
      /* webpackChunkName: "transcripts-tab" */
      /* webpackMode: "lazy" */
      /* webpackPreload: true */
      '../transcripts'
    )
}

export default {
  components: {
    TabHeader: Tab.Header,
    TabBody,
    TabHeaderItem,
    Icon,
    ...tabs
  },
  data() {
    return {
      ...this.mapState({
        header: select.styles.tabsHead,
        tabs: select.tabs,
        audioIcon: select.audio.icon,
        infoTab: select.components.infoTab,
        chaptersTab: select.components.chaptersTab,
        transcriptTab: select.components.transcriptTab,
        shareTab: select.components.shareTab,
        filesTab: select.components.filesTab,
        audioTab: select.components.audioTab
      }),
      overflows: true
    }
  },
  methods: {
    toggleTab: compose(
      store.dispatch,
      toggleTab
    ),
    resizeHandler(el) {
      this.overflows = false

      this.$nextTick(() => {
        setStyles({ 'overflow-x': 'auto' })(el)
        this.overflows = el.scrollWidth > el.clientWidth
        setStyles({ 'overflow-x': 'hidden' })(el)
      })
    },
    mounted() {
      this.resizeHandler()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.tabs {
  width: 100%;

  .overflows .tab-header-item >>> .title {
    display: none;
  }
}
</style>

<template lang="pug">
  div.tabs
    tab-header(:class="{overflows}" :backgroundActive="header.backgroundActive" v-resize="resizeHandler" ref="tabHeader")
      tab-header-item(tab="info" :title="$t('INFO.TITLE')")
        icon(type="info" slot="icon")
      tab-header-item(tab="chapters" :title="$t('CHAPTERS.TITLE')")
        icon(type="chapter" slot="icon")
      tab-header-item(tab="transcripts" :title="$t('TRANSCRIPTS.TITLE')")
        icon(type="transcripts" slot="icon")
      tab-header-item(tab="share" :title="$t('SHARE.TITLE')")
        icon(type="share" slot="icon")
      tab-header-item(tab="files" :title="$t('FILES.TITLE')")
        icon(type="download" slot="icon")
      tab-header-item(tab="audio" :title="$t('AUDIO.TITLE')")
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
import { Tab, Icon } from '@podlove/components'
import { toggleTab } from '@podlove/player-actions/tabs'

import TabHeaderItem from './components/TabHeaderItem'
import TabBody from './components/TabBody'

import select from 'store/selectors'
import store from 'store'

import { setStyles, resizeObserver } from '@podlove/utils/dom'

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
        audioIcon: select.audio.icon
      }),
      overflows: true
    }
  },
  methods: {
    toggleTab: compose(
      store.dispatch,
      toggleTab
    ),
    resizeHandler() {
      this.overflows = false

      this.$nextTick(() => {
        let tabHeader = this.$refs.tabHeader.$el
        setStyles({ 'overflow-x': 'auto' })(tabHeader)
        this.overflows = tabHeader.scrollWidth > tabHeader.clientWidth
        setStyles({ 'overflow-x': 'hidden' })(tabHeader)
      })
    },
    mounted() {
      resizeObserver(this.$el, this.resizeHandler.bind(this))
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

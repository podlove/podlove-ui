<template lang="pug">
  button.block.relative.h-10.w-6(
    :title="title"
    @click="toggle"
    v-if="visibleTab"
    :data-test="`tab-trigger--${tab}`"
  )
    span.block.absolute.top-0(:style="{ color: contrast }")
      slot
    span.block.absolute.w-full.bottom-0(v-if="activeTab" :style="{ color: brandDark }")
      icon.block.m-auto(type="active-tab")
</template>

<script>
import { mapState } from 'redux-vuex'
import Icon from '@podlove/components/icons'
import { prop } from 'ramda'

import { toggleTab } from '@podlove/player-actions/tabs'

import store from 'store'
import select from 'store/selectors'

const availableTabs = ['chapters', 'files', 'shownotes', 'transcripts', 'share', 'playlist']

export default {
  components: {
    Icon
  },
  props: {
    tab: {
      type: String,
      default: null,
      validator: val => availableTabs.includes(val)
    },
    title: {
      type: String,
      default: ''
    },
    active: {
      type: String,
      default: () => 'inactive'
    }
  },
  data: mapState({
    tabs: select.tabs,
    contrast: select.theme.contrast,
    brandDark: select.theme.brandDark,
    shownotes: select.components.shownotesTab,
    chapters: select.components.chaptersTab,
    transcripts: select.components.transcriptTab,
    share: select.components.shareTab,
    files: select.components.filesTab,
    playlist: select.components.playlistTab
  }),
  computed: {
    activeTab() {
      return !!this.tabs[this.tab]
    },
    visibleTab() {
      return prop(this.tab, this)
    }
  },
  methods: {
    toggle() {
      store.dispatch(toggleTab(this.tab))
    }
  }
}
</script>

<template lang="pug">
  div.w-full(class="mobile:p-4 tablet:p-6" data-test="tab-playlist")
    tab-title(@close="closeTab" tab="playlist") {{ $t('PLAYLIST.TITLE') }}
    ol.sr-only(:aria-label="$t(a11y.key, a11y.attr)")
      a11y(v-for="(episode, index) in playlist" :episode="episode" :index="index" :key="`a11y-${index}`")
    entry(aria-hidden="true" v-for="(episode, index) in playlist" :episode="episode" :index="index " :key="`episode-${index}`")
</template>

<script>
import { mapState } from 'redux-vuex'
import { toggleTab } from '@podlove/player-actions/tabs'
import store from 'store'
import select from 'store/selectors'

import TabTitle from '../tab-title'
import Entry from './components/Entry'
import A11y from './components/A11y'

export default {
  components: {
    A11y,
    Entry,
    TabTitle
  },
  data: mapState({
    playlist: select.playlist.list,
    a11y: select.accessibility.episodeList
  }),
  methods: {
    closeTab() {
      store.dispatch(toggleTab('playlist'))
    }
  }
}
</script>

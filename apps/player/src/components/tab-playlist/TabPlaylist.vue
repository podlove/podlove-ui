<template>
  <div class="w-full mobile:p-4 tablet:p-6" data-test="tab-playlist">
    <tab-title tab="playlist" @close="closeTab">
      {{ $t('PLAYLIST.TITLE') }}
    </tab-title>
    <ol class="sr-only" :aria-label="$t(state.a11y.key, state.a11y.attr)">
      <a11y
        v-for="(episode, index) in state.playlist"
        :key="`a11y-${index}`"
        :episode="episode"
        :index="index"
      />
    </ol>
    <div class="body overflow-y-auto overflow-x-hidden mobile:-mr-4 tablet:-mr-6 mobile:pr-4 tablet:pr-6">
      <entry
        v-for="(episode, index) in state.playlist"
        :key="`episode-${index}`"
        :episode="episode"
        :index="index"
        aria-hidden="true"
      />
    </div>
  </div>
</template>

<script>
import { mapState, injectStore } from 'redux-vuex'
import { toggleTab } from '@podlove/player-actions/tabs'
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
  setup() {
    return {
      state: mapState({
        playlist: select.playlist.list,
        a11y: select.accessibility.episodeList
      }),
      dispatch: injectStore().dispatch
    }
  },
  methods: {
    closeTab() {
      this.dispatch(toggleTab('playlist'))
    }
  }
}
</script>

<style lang="postcss" scoped>
.body {
  max-height: 455px;
}
</style>

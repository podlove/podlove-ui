<template lang="pug">
  div.w-full(class="mobile:p-4 tablet:p-6" data-test="tab-playlist")
    tab-title(@close="closeTab") {{ $t('PLAYLIST.TITLE') }}
    entry(v-for="(episode, index) in playlist" :episode="episode" :index="index " :key="index")
</template>

<script>
import { mapState } from 'redux-vuex'
import { toggleTab } from '@podlove/player-actions/tabs'
import store from 'store'
import select from 'store/selectors'
import TabTitle from '../tab-title'
import Entry from './components/Entry'

export default {
  components: {
    Entry,
    TabTitle
  },
  data: mapState({
    playlist: select.playlist.list
  }),
  methods: {
    closeTab() {
      store.dispatch(toggleTab('playlist'))
    }
  }
}
</script>

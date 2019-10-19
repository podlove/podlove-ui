<template lang="pug">
  div.w-full(class="mobile:p-4 tablet:p-6" data-test="tab-chapters")
    tab-title(@close="closeTab") {{ $t('CHAPTERS.TITLE') }}
    entry(v-for="(chapter, index) in chapters" :chapter="chapter" :index="index" :key="index")
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
    chapters: select.chapters.list
  }),
  methods: {
    closeTab() {
      store.dispatch(toggleTab('chapters'))
    }
  }
}
</script>

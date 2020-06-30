<template lang="pug">
  div.w-full(class="mobile:p-4 tablet:p-6" data-test="tab-chapters")
    tab-title(@close="closeTab") {{ $t('CHAPTERS.TITLE') }}
    ol.sr-only(:aria-label="$t(a11y.key, a11y.attr)")
      a11y(v-for="(chapter, index) in chapters" :chapter="chapter" :index="index" :key="`a11y-${index}`")
    entry(aria-hidden="true" v-for="(chapter, index) in chapters" :chapter="chapter" :index="index" :key="`chapter-${index}`")
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
    Entry,
    A11y,
    TabTitle
  },
  data: mapState({
    chapters: select.chapters.list,
    a11y: select.accessibility.chapterList
  }),
  methods: {
    closeTab() {
      store.dispatch(toggleTab('chapters'))
    }
  }
}
</script>

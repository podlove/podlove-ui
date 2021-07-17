<template lang="pug">
  div.w-full(class="mobile:pt-4 mobile:pr-4 mobile:pl-4 tablet:pt-6 tablet:pr-6 tablet:pl-6" data-test="tab-chapters")
    tab-title(@close="closeTab" tab="chapters") {{ $t('CHAPTERS.TITLE') }}
    ol.sr-only(:aria-label="$t(a11y.key, a11y.attr)")
      a11y(v-for="(chapter, index) in chapters" :chapter="chapter" :index="index" :key="`a11y-${index}`")
    div.body.overflow-y-auto.overflow-x-hidden(class="mobile:-mr-4 tablet:-mr-6 mobile:pr-4 tablet:pr-6 mobile:pb-4 tablet:pb-6")
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

<style lang="postcss" scoped>
.body {
  max-height: 455px;
}
</style>

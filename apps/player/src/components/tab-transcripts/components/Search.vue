<template lang="pug">
  div.flex.justify-between
    div.w-full.flex.max-w-2xl
      div.relative.w-full
        div.flex.absolute.opacity-50.right-0.h-full.items-center.p-2
          button(v-if="searchQuery.length > 0" @click="reset")
            icon(type="close" :color="brandDark" :size="24")
          icon.pointer-events-none(v-else type="search" :color="brandDark" :size="24")
        input.input.px-4.p-2.w-full.rounded-sm.text-sm.mr-2.shadow(:style="inputStyle" @input="search" :value="searchQuery" type="text" :placeholder="$t('TRANSCRIPTS.PLACEHOLDER')")
      div.flex.items-center.p-2(v-if="searchControls")
        div(v-if="noResults") {{ $t('TRANSCRIPTS.NO_SEARCH_RESULTS') }}
        div.flex.flex-no-wrap.w-24(v-else)
          button.block.px-2(@click="previousSearchResult")
            icon(type="chevron-left")
          span.whitespace-no-wrap.block.stepper {{ searchSelected + 1 }} / {{ searchResults.length - 1 }}
          button.block.px-2(@click="nextSearchResult")
            icon(type="chevron-right")
    button.block.rounded-sm.whitespace-no-wrap.text-sm.px-4.py-2.ml-2.border.w-32.shadow(:style="buttonStyle" @click="toggleFollow" :class="{ 'mobile:hidden': searchControls }") {{ follow ? $t('TRANSCRIPTS.FOLLOW.ACTIVE') : $t('TRANSCRIPTS.FOLLOW.INACTIVE') }}
</template>

<script>
import { compose } from 'ramda'
import { mapState } from 'redux-vuex'
import { Icon } from '@podlove/components'

import {
  searchTranscripts,
  followTranscripts,
  resetSearchTranscription,
  previousTranscriptsSearchResult,
  nextTranscriptsSearchResult
} from '@podlove/player-actions/transcripts'

import store from 'store'
import select from 'store/selectors'

export default {
  components: {
    Icon
  },
  data: mapState({
    searchResults: select.transcripts.searchResults,
    searchQuery: select.transcripts.searchQuery,
    searchSelected: select.transcripts.searchSelected,
    follow: select.transcripts.follow,
    altColor: select.theme.alt,
    brandDark: select.theme.brandDark
  }),
  computed: {
    inputStyle() {
      return {
        color: this.brandDark,
        background: this.altColor
      }
    },
    buttonStyle() {
      return {
        color: this.follow ? this.altColor : this.brandDark,
        background: this.follow ? 'transparent' : this.altColor,
        'border-color': this.altColor
      }
    },
    searchControls() {
      return this.searchQuery.length > 0
    },
    noResults() {
      return this.searchResults.length === 0
    }
  },
  methods: {
    search(event) {
      store.dispatch(searchTranscripts(event.target.value))
      store.dispatch(followTranscripts(false))
    },
    toggleFollow() {
      store.dispatch(followTranscripts(!this.follow))
    },
    reset: compose(
      store.dispatch,
      resetSearchTranscription
    ),
    previousSearchResult: compose(
      store.dispatch,
      previousTranscriptsSearchResult
    ),
    nextSearchResult: compose(
      store.dispatch,
      nextTranscriptsSearchResult
    )
  }
}
</script>

<style lang="postcss" scoped>
.input::placeholder {
  opacity: 0.5;
}
.stepper {
  font-variant-numeric: tabular-nums;
}
</style>

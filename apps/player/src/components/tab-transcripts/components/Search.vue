<template>
  <div class="flex justify-between">
    <div class="w-full flex max-w-2xl">
      <div class="relative w-full">
        <div class="flex absolute opacity-50 right-0 h-full items-center p-2">
          <button
            v-if="searchQuery.length > 0"
            :title="$t(state.clearSearchTitle.key, state.clearSearchTitle.attr)"
            @click="reset"
          >
            <icon aria-hidden="true" type="close" :color="brandDark" :size="24" />
          </button>
          <icon
            v-else
            class="pointer-events-none"
            aria-hidden="true"
            type="search"
            :color="brandDark"
            :size="24"
          />
        </div>
        <input
          class="input px-4 p-2 w-full rounded-sm text-sm mr-2 shadow"
          type="text"
          data-test="tab-transcripts--search"
          :style="inputStyle"
          :value="state.searchQuery"
          :placeholder="$t('TRANSCRIPTS.PLACEHOLDER')"
          :title="$t(state.searchTitle.key, state.searchTitle.attr)"
          @input="search"
        />
      </div>
      <div
        v-if="searchControls"
        class="flex items-center p-2"
        data-test="tab-transcripts--search-controls"
      >
        <div
          v-if="noResults"
          class="whitespace-no-wraptruncate"
          data-test="tab-transcripts--search-controls--no-results"
        >
          {{ $t('TRANSCRIPTS.NO_SEARCH_RESULTS') }}
        </div>
        <div v-else class="flex flex-no-wrap w-32">
          <button
            class="block px-0 tablet:px-1 desktop:px-2"
            data-test="tab-transcripts--search-controls--previous"
            :title="$t(state.previousSearchTitle.key, state.previousSearchTitle.attr)"
            @click="previousSearchResult"
          >
            <icon aria-hidden="true" type="chevron-left" />
          </button>
          <span
            class="whitespace-no-wrap.block.stepper"
            data-test="tab-transcripts--search-results"
          >
            <span data-test="tab-transcripts--search-controls--current-result">{{
              state.searchSelected
            }}</span>
            <span class="px-0 tablet:px-1 desktop:px-2">/</span>
            <span
              data-test="tab-transcripts--search-controls--total-result"
              :title="state.searchResults.length"
              >{{ results }}</span
            >
          </span>
          <button
            class="block px-0 tablet:px-1 desktop:px-2"
            data-test="tab-transcripts--search-controls--next"
            :title="$t(state.nextSearchTitle.key, state.nextSearchTitle.attr)"
            )
            @click="nextSearchResult"
          >
            <icon aria-hidden="true" type="chevron-right" />
          </button>
        </div>
      </div>
    </div>
    <button
      class="block rounded-sm whitespace-no-wrap text-sm px-4 py-2 ml-2 border w-32 shadow"
      data-test="tab-transcripts--follow"
      :style="buttonStyle"
      :class="{ 'mobile:hidden': searchControls }"
      :title="$t(state.followTranscriptsTitle.key, state.followTranscriptsTitle.attr)"
      @click="toggleFollow"
    >
      {{ follow ? $t('TRANSCRIPTS.FOLLOW.ACTIVE') : $t('TRANSCRIPTS.FOLLOW.INACTIVE') }}
    </button>
  </div>
</template>

<script>
import { compose } from 'ramda'
import { mapState, injectStore } from 'redux-vuex'
import Icon from '@podlove/components/icons'

import {
  searchTranscripts,
  followTranscripts,
  resetSearchTranscription,
  previousTranscriptsSearchResult,
  nextTranscriptsSearchResult
} from '@podlove/player-actions/transcripts'

import select from 'store/selectors'

export default {
  components: {
    Icon
  },
  setup() {
    return {
      state: mapState({
        searchResults: select.transcripts.searchResults,
        searchQuery: select.transcripts.searchQuery,
        searchSelected: select.transcripts.searchSelected,
        searching: select.transcripts.searching,
        follow: select.transcripts.follow,
        contrastColor: select.theme.contrast,
        brandDark: select.theme.brandDark,
        brandLightest: select.theme.brandLightest,
        searchTitle: select.accessibility.transcriptsSearch,
        clearSearchTitle: select.accessibility.clearTranscriptsSearch,
        previousSearchTitle: select.accessibility.previousTranscriptsSearchResult,
        nextSearchTitle: select.accessibility.nextTranscriptsSearchResult,
        followTranscriptsTitle: select.accessibility.followTranscripts
      }),
      dispatch: injectStore().dispatch
    }
  },
  computed: {
    inputStyle() {
      return {
        color: this.state.contrastColor,
        background: this.state.brandLightest
      }
    },
    buttonStyle() {
      return {
        color: this.state.follow ? this.contrastColor.state : this.state.brandLightest,
        background: this.state.follow ? this.state.brandLightest : this.state.brandDark,
        'border-color': this.state.brandLightest
      }
    },
    searchControls() {
      return this.state.searchQuery.length > 0 && !this.state.searching
    },
    noResults() {
      return this.state.searchResults.length === 0
    },
    results() {
      return this.state.searchResults.length >= 1000 ? '1000+' : this.state.searchResults.length
    }
  },
  methods: {
    search(event) {
      this.dispatch(searchTranscripts(event.target.value))
      this.dispatch(followTranscripts(false))
    },
    toggleFollow() {
      this.dispatch(followTranscripts(!this.state.follow))
    },
    reset() {
      this.dispatch(resetSearchTranscription())
    },
    previousSearchResult() {
      this.dispatch(previousTranscriptsSearchResult())
    },
    nextSearchResult() {
      this.dispatch(nextTranscriptsSearchResult())
    }
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

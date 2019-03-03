<template lang="pug">
    div.transcripts-search
      div.search-input(:style="searchContainerStyle")
        input.input(type="text" class="input" :style="searchInputStyle" @input="search" :value="searchQuery" :placeholder="$t('TRANSCRIPTS.SEARCH')")
        button.delete(v-if="searchQuery.length > 2" @click="reset()")
          icon(type="search-clear" :color="buttonStyle.background")
      div.search-navigation(v-if="searchQuery.length > 2")
        div.search-stepper
          button.stepper(@click="previousSearchResult()" v-if="searchResults.length > 0")
            icon(type="search-previous" :color="buttonStyle.background")

          button.stepper(@click="nextSearchResult()" v-if="searchResults.length > 0")
            icon(type="search-next" :color="buttonStyle.background")

        div.search-results.counter(v-if="searchResults.length > 0") {{ `${transcripts.search.selected + 1} / ${searchResults.length}` }}
        div.search-results.truncate(v-else) {{ $t('TRANSCRIPTS.NO_SEARCH_RESULTS') }}
</template>

<script>
import { compose } from 'ramda'
import { mapState } from 'redux-vuex'
import { Icon } from '@podlove/components'

import { searchTranscripts, followTranscripts, resetSearchTranscription, previousTranscriptsSearchResult, nextTranscriptsSearchResult } from '@podlove/actions/transcripts'

import store from 'store'
import select from 'store/selectors'

export default {
  data: mapState({
    buttonStyle: select.styles.button,
    inputStyle: select.styles.inputStyle,
    searchResults: select.transcripts.searchResults,
    searchQuery: select.transcripts.searchQuery
  }),
  methods: {
    search (event) {
      store.dispatch(searchTranscripts(event.target.value))
      store.dispatch(followTranscripts(false))
    },
    reset: compose(store.dispatch, resetSearchTranscription),
    previousSearchResult: compose(store.dispatch, previousTranscriptsSearchResult),
    nextSearchResult: compose(store.dispatch, nextTranscriptsSearchResult)
  },
  computed: {
    searchInputStyle () {
      return {
        background: this.inputStyle.background,
        color: this.inputStyle.color,
        'border-color': this.inputStyle.border
      }
    },
    searchContainerStyle () {
      return {
        color: this.inputStyle.color
      }
    }
  },
  components: {
    Icon
  }
}
</script>

<style lang="scss">
  @import '~styles/variables';
  @import '~styles/utils';

  .transcripts-search {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    .search-input {
      // Padding left and right transcripts-header
      max-width: $width-xs;
      position: relative;
      margin-right: 0.5em;
      width: 100%;

      .input {
        padding: 0.2em 24px 0.2em 1em;
        font-size: 1em;
        border-radius: 1em;
        border-width: 1px;
        border-style: solid;
        height: 100%;
        width: 100%;
        font-weight: 300;

        &::placeholder {
          color: currentColor;
          opacity: 0.6;
        }
      }

      .delete {
        position: absolute;
        right: 1px;
        top: 1px;
      }
    }

    .search-navigation {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-right: 0.5em;

      @media screen and (max-width: $width-l) {
        width: 25%;
      }

      .search-stepper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        width: 4em;
        margin: 0 0.5em;

        .stepper {
          display: inherit;
        }
      }

      .search-results {
        white-space: nowrap;
        margin-left: 0.5em;

        &.counter {
          @media screen and (max-width: $width-l) {
            display: none;
          }
        }
      }
    }
  }
</style>

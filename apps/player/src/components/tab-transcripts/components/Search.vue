<template>
  <div class="podlove-player--tab-transcripts--search flex justify-between">
    <div class="w-full flex max-w-2xl">
      <div class="relative w-full">
        <div class="flex absolute opacity-50 right-0 h-full items-center p-2">
          <button
            v-if="state.searchQuery.length > 0"
            :title="t(state.clearSearchTitle.key, state.clearSearchTitle.attr)"
            @click="reset"
          >
            <close-icon :size="24" />
          </button>
          <search-icon v-else class="pointer-events-none" :size="24" />
        </div>
        <input
          class="
            podlove-player--tab-transcripts--search-input
            px-4
            p-2
            w-full
            rounded-sm
            text-sm
            mr-2
            shadow
            h-full
          "
          type="text"
          data-test="tab-transcripts--search"
          :value="state.searchQuery"
          :placeholder="t('TRANSCRIPTS.PLACEHOLDER')"
          :title="t(state.searchTitle.key, state.searchTitle.attr)"
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
          class="whitespace-nowrap truncate"
          data-test="tab-transcripts--search-controls--no-results"
        >
          {{ t('TRANSCRIPTS.NO_SEARCH_RESULTS') }}
        </div>
        <div v-else class="flex flex-no-wrap justify-center w-32">
          <button
            class="block px-0 tablet:px-1 desktop:px-2"
            data-test="tab-transcripts--search-controls--previous"
            :title="t(state.previousSearchTitle.key, state.previousSearchTitle.attr)"
            @click="previousSearchResult"
          >
            <chevron-left-icon />
          </button>
          <span
            class="podlove-player--tab-transcripts--stepper whitespace-nowrap block"
            data-test="tab-transcripts--search-results"
          >
            <span data-test="tab-transcripts--search-controls--current-result">{{
              state.searchSelected
            }}</span>
            <span class="px-0 tablet:px-1 desktop:px-2">/</span>
            <span
              data-test="tab-transcripts--search-controls--total-result"
              :title="state.searchResults.length"
            >
              {{ results }}
            </span>
          </span>
          <button
            class="block px-0 tablet:px-1 desktop:px-2"
            data-test="tab-transcripts--search-controls--next"
            :title="t(state.nextSearchTitle.key, state.nextSearchTitle.attr)"
            @click="nextSearchResult"
          >
            <chevron-right-icon />
          </button>
        </div>
      </div>
    </div>
    <button
      class="
        podlove-player--tab-transcripts--search-button
        block
        rounded-sm
        whitespace-nowrap
        text-sm
        px-4
        py-2
        ml-2
        border
        shadow
        h-full
        w-40
        truncate
      "
      data-test="tab-transcripts--follow"
      :class="{ 'mobile:hidden': searchControls, active: state.follow }"
      :title="t(state.followTranscriptsTitle.key, state.followTranscriptsTitle.attr)"
      @click="toggleFollow"
    >
      {{ state.follow ? t('TRANSCRIPTS.FOLLOW.ACTIVE') : t('TRANSCRIPTS.FOLLOW.INACTIVE') }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { mapState, injectStore } from 'redux-vuex';
import { CloseIcon, SearchIcon, ChevronLeftIcon, ChevronRightIcon } from '@podlove/components';

import {
  searchTranscripts,
  followTranscripts,
  resetSearchTranscription,
  previousTranscriptsSearchResult,
  nextTranscriptsSearchResult
} from '@podlove/player-actions/transcripts';

import select from '../../../store/selectors/index.js';

const { t } = useI18n();

const state = mapState({
  searchResults: select.transcripts.searchResults,
  searchQuery: select.transcripts.searchQuery,
  searchSelected: select.transcripts.searchSelected,
  searching: select.transcripts.searching,
  follow: select.transcripts.follow,
  searchTitle: select.accessibility.transcriptsSearch,
  clearSearchTitle: select.accessibility.clearTranscriptsSearch,
  previousSearchTitle: select.accessibility.previousTranscriptsSearchResult,
  nextSearchTitle: select.accessibility.nextTranscriptsSearchResult,
  followTranscriptsTitle: select.accessibility.followTranscripts
});

const dispatch = injectStore().dispatch;

const searchControls = computed(() => state.searchQuery.length > 0 && !state.searching);

const noResults = computed(() => state.searchResults.length === 0);

const results = computed(() =>
  state.searchResults.length >= 1000 ? '1000+' : state.searchResults.length
);

const search = (event) => {
  dispatch(searchTranscripts(event.target.value));
  dispatch(followTranscripts(false));
};
const toggleFollow = () => {
  dispatch(followTranscripts(!state.follow));
};
const reset = () => {
  dispatch(resetSearchTranscription());
};
const previousSearchResult = () => {
  dispatch(previousTranscriptsSearchResult());
};
const nextSearchResult = () => {
  dispatch(nextTranscriptsSearchResult());
};
</script>

<style lang="postcss" scoped>
.podlove-player--tab-transcripts--search {
  --podlove-component--icon--color: var(--podlove-player--tab-transcripts--search-icon--color);
}

.podlove-player--tab-transcripts--search-input {
  color: var(--podlove-player--tab-transcripts--search-input--color);
  background: var(--podlove-player--tab-transcripts--search-input--background);
}

.podlove-player--tab-transcripts--search-button {
  color: var(--podlove-player--tab-transcripts--search-button--color);
  background: var(--podlove-player--tab-transcripts--search-button--background);
  border-color: var(--podlove-player--tab-transcripts--search-button--border);
}

.podlove-player--tab-transcripts--search-button.active {
  color: var(--podlove-player--tab-transcripts--search-button--color-active);
  background: var(--podlove-player--tab-transcripts--search-button--background-active);
}

.podlove-player--tab-transcripts--search-input::placeholder {
  opacity: 0.5;
}
.podlove-player--tab-transcripts--stepper {
  font-variant-numeric: tabular-nums;
}
</style>

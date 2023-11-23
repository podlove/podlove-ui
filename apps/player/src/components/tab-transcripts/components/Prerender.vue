<template>
  <div ref="root">
    <transcript-entry
      v-for="(entry, index) in transcripts"
      :key="index"
      :entry="entry"
      :prerender="true"
      :playtime="state.playtime"
      :search-query="state.searchQuery"
      :ghost-active="state.ghostActive"
      :ghost-time="state.ghostTime"
      :search-results="state.searchResults"
      :chapter-style="chapterStyle"
      :speaker-style="speakerStyle"
    />
  </div>
</template>

<script lang="ts" setup>
import { mapState } from 'redux-vuex';
import { computed, nextTick, onMounted, ref } from 'vue';
import { asyncAnimation } from '@podlove/utils/helper';

import select from '../../../store/selectors/index.js';

import TranscriptEntry from './Entry.vue';

const root = ref<HTMLElement | null>(null);

defineProps({
  transcripts: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['load']);

const state = mapState({
  playtime: select.playtime,
  ghostActive: select.ghost.active,
  ghostTime: select.ghost.time,
  searchResults: select.transcripts.searchResults,
  searchQuery: select.transcripts.searchQuery,
  fontCi: select.theme.fontCi,
  fontBold: select.theme.fontBold
});

const chapterStyle = computed(() => state.fontCi);

const speakerStyle = computed(() => state.fontBold);

onMounted(() => {
  nextTick()
    .then(() =>
      Promise.all(
        Array.from(root.value.children).map((entry) => asyncAnimation().then(() => entry.clientHeight))
      )
    )
    .then((entries) => emit('load', entries));
});
</script>

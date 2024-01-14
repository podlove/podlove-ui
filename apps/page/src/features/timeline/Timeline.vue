<template>
  <div class="py-6 font-light border-gray-400 border-b mb-12 pb-12 pl-12 pr-6">
    <div class="-ml-6"></div>
    <div class="-ml-6" v-for="(entry, index) in entries" :key="`timeline-entry-${index}`">
      <marker-component
        v-if="entry.type === 'marker'"
        :episodeId="episodeId"
        :start="entry.start"
        :title="entry.title"
      />
      <chapter-component
        v-if="entry.type === 'chapter'"
        :episode-id="episodeId"
        :start="entry.start"
        :end="entry.end"
        :title="entry.title"
      />
      <transcript-component
        v-if="entry.type === 'transcript'"
        :episode-id="episodeId"
        :start="entry.start"
        :end="entry.end"
        :speaker="entry.speaker"
        :texts="entry.texts"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PodloveWebPlayerTimelineChapterEntry, PodloveWebPlayerTimelineTranscriptEntry } from '@podlove/types';
import ChapterComponent from './Chapter.vue';
import MarkerComponent from './Marker.vue';
import TranscriptComponent from './Transcript.vue';

interface MarkerEntry {
  type: 'marker';
  title: string | null;
  start: number | null;
  end?: number | null;
}

const props = defineProps<{
  episodeId: string;
  entries: (MarkerEntry | PodloveWebPlayerTimelineTranscriptEntry | PodloveWebPlayerTimelineChapterEntry)[];
}>();
</script>

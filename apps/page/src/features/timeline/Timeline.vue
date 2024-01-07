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
    </div>
  </div>
</template>

<script setup lang="ts">
import ChapterComponent from './Chapter.vue';
import MarkerComponent from './Marker.vue';

interface Entry {
  type: string;
  title: string | null;
  start: number | null;
  end: number | null;
}

interface ChapterEntry extends Entry {
  type: 'chapter';
}

interface MarkerEntry extends Entry {
  type: 'marker';
}

defineProps<{
  episodeId: string;
  entries: (ChapterEntry | MarkerEntry)[];
}>();
</script>

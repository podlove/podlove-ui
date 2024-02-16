<template>
  <div class="timeline-bullet relative mr-2 md:mr-6">
    <span
      v-if="top"
      class="absolute top-0 left-0 h-4 border-gray-500 border-l-2 w-1 -mt-4 ml-4"
    ></span>
    <span
      class="w-8 h-8 border-gray-500 bg-primary-700 border-1 rounded flex items-center justify-center shadow overflow-hidden"
    >
      <slot />
    </span>
    <span
      v-if="bottom"
      class="absolute bottom-0 left-0 h-4 border-gray-500 border-l-2 w-1 -mb-4 ml-4"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  top: boolean;
  bottom: boolean;
}>()

const top = computed(() => props.top || false);
const bottom = computed(() => props.bottom || false);
</script>

<style scoped>
.timeline-bullet {
  --podlove-component--icon--color: rgb(var(--primary-color-100));
}
</style>

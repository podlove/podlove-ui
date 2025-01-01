<template>
  <li class="relative flex justify-between gap-x-6 py-2 podcast-list-item">
    <a class="flex min-w-0 gap-x-4 w-full hover:bg-primary-200 p-2 rounded" :href="`/feed/${feed}`">
      <podcast-cover class="size-12 flex-none rounded-lg bg-gray-50 mt-1 overflow-hidden shadow-md" :url="image || ''" />
      <div class="min-w-0 flex-auto w-full">
        <p class="text-sm/6 font-semibold text-gray-900">
          <span class="absolute inset-x-0 -top-px bottom-0" />
          {{ title }}
        </p>
        <p class="mt-1 text-xs/5 text-gray-500 line-clamp-4">
          {{ description }}
        </p>
      </div>
      <div class="flex shrink-0 items-center gap-x-4">
        <ChevronRightIcon class="size-5 flex-none text-gray-400" aria-hidden="true" />
      </div>
    </a>
  </li>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/20/solid';
import { Image as PodcastCover } from "@podlove/components"

defineProps<{ title: string; image: string | null; feed: string; description: string | null }>();
</script>

<style>
.podcast-list-item {
  --podlove-component--image--background: rgba(29, 86, 240, 0.5);
}
</style>

<template>
  <div>
    <div class="mt-2 grid grid-cols-1 podcast-search w-full">
      <div
        class="flex items-center rounded-md bg-white px-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-complementary-600 lg:min-w-128 w-full"
      >
        <div class="shrink-0 select-none text-base text-gray-500 flex items-center w-6">
          <LoadingIcon
            v-if="loading"
            class="pointer-events-none col-start-1 row-start-1 size-5"
            aria-hidden="true"
          />
          <MagnifyingGlassIcon
            v-else
            class="pointer-events-none col-start-1 row-start-1 size-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          class="block w-full grow pt-1 pb-1.5 pl-1.5 pr-1.5 text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 text-base lg:text-lg font-extralight min-w-64"
          placeholder="Search for a Podcast or enter a Feed"
          :value="query"
          @input="input"
          @focusin="showPoweredBy = true"
        />
      </div>
    </div>
    <div
      class="w-full flex justify-end p-2 transition-opacity opacity-0"
      :class="{ 'opacity-100': showPoweredBy }"
    >
      <span class="text-xs text-gray-400 mr-1">Search powered by</span
      ><a href="https://fyyd.de/"><Fyyd class="w-11" /></a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/16/solid';
import { get } from 'lodash-es';
import { LoadingIcon } from '@podlove/components';
import { ref } from 'vue';

import Fyyd from './Fyyd.vue';

defineProps<{ query: string | null; loading: boolean }>();

const showPoweredBy = ref(false);

const emits = defineEmits(['search']);

const input = (event: Event) => {
  const value = get(event, ['target', 'value'], '');
  emits('search', value);
};
</script>

<style>
.podcast-search {
  --podlove-component--icon--color: rgba(var(--gray-color-400), 1);
}
</style>

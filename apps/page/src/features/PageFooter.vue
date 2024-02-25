<template>
  <div
    class="w-full bg-gray-800 p-6 mt-16 text-gray-100 font-extralight text-sm flex justify-center"
  >
    <div class="w-full lg:w-app px-8 block lg:flex">
      <div class="w-full md:w-1/3 truncate">
        {{ $t('FOOTER.COPYRIGHT', { copyright: state.copyright }) }}
      </div>
      <div class="w-full md:w-1/3 truncate text-center" v-if="state.owner">
        <a
          v-if="state.mail"
          class="hover:underline"
          :href="`mailto:${state.mail}`"
          target="_blank"
          rel="nofollow noopener"
          >{{ $t('FOOTER.CONTACT', { name: state.owner }) }}</a
        >
        <span v-else>
          {{ $t('FOOTER.CONTACT', { name: state.owner }) }}
        </span>
      </div>

      <div class="w-full md:w-1/3 truncate text-right">
        <a
          class="hover:underline"
          href="https://podlove.org"
          target="_blank"
          rel="nofollow noopener"
          >{{ $t('FOOTER.CREATED_WITH', { name: 'Podlove', buildDate }) }}</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { mapState } from 'redux-vuex';
import { selectors } from '../logic';

const state = mapState({
  copyright: selectors.podcast.copyright,
  mail: selectors.podcast.mail,
  owner: selectors.podcast.owner,
  buildDate: selectors.runtime.buildDate,
  locale: selectors.runtime.locale,
});

const buildDate = computed(() =>
  state.buildDate ? new Date(state.buildDate).toLocaleDateString(state.locale) : null
);
</script>

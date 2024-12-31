<template>
  <div
    class="w-full bg-gray-800 p-6 mt-16 text-gray-100 font-extralight text-sm"
  >
    <div class="w-full px-8 flex flex-col md:flex-row">
      <div class="w-full md:w-1/3 truncate text-center">
        {{ t('FOOTER.COPYRIGHT', { copyright: state.copyright }) }}
      </div>
      <div class="w-full md:w-1/3 truncate text-center" v-if="state.owner">
        <a
          v-if="state.mail"
          class="hover:underline"
          :href="`mailto:${state.mail}`"
          target="_blank"
          rel="nofollow noopener"
          >{{ t('FOOTER.CONTACT', { name: state.owner }) }}</a
        >
        <span v-else>
          {{ t('FOOTER.CONTACT', { name: state.owner }) }}
        </span>
      </div>

      <div class="w-full md:w-1/3 truncate text-center md:text-right">
        <a
          class="hover:underline"
          href="https://lux.podlove.org"
          target="_blank"
          rel="nofollow noopener"
          >{{ t('FOOTER.CREATED_WITH', { name: 'Podlove Lux', buildDate }) }}</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { mapState } from 'redux-vuex';
import { selectors } from '../logic';
import { useTranslations } from '@podlove/utils/translate';

const t = useTranslations();

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

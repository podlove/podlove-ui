<template>
  <span class="podlove-player--publication-date" data-test="publication-date">{{ date }}</span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { format as dateFormat } from 'date-fns';
import { mapState } from 'redux-vuex';
import select from '../../store/selectors/index.js';

const props = defineProps<{
  format: string;
}>();

const state = mapState({
  publicationDate: select.episode.publicationDate
});

const date = computed(() => {
  const date = new Date(state.publicationDate);

  return props.format ? dateFormat(date, props.format) : date.toLocaleDateString();
});
</script>

<style lang="postcss" scoped>
.podlove-player--publication-date {
  color: var(--podlove-player--publication-date--color);
}
</style>

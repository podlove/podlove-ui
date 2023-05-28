<template>
  <span :style="style" data-test="publication-date">{{ date }}</span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { format } from 'date-fns';
import { mapState } from 'redux-vuex';
import select from '../../store/selectors/index.js';

const props = defineProps({
  format: {
    type: String,
    default: null
  }
});

const state = mapState({
  color: select.theme.contrast,
  publicationDate: select.episode.publicationDate
});

const style = computed(() => ({
  color: state.color
}));

const date = computed(() => {
  const date = new Date(state.publicationDate);

  return props.format ? format(date, props.format) : date.toLocaleDateString();
});
</script>

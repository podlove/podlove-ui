<template>
  <chapter-button
    v-if="state.chapterButtons"
    data-test="chapter-previous"
    type="previous"
    :disabled="state.previousChapterDisabled"
    :color="state.color"
    :title="$t(state.title.key, state.title.attr)"
    @previous="dispatch"
  />
</template>

<script lang="ts" setup>
import { mapState, injectStore } from 'redux-vuex';
import { ChapterButton } from '@podlove/components';

import select from '../../store/selectors/index.js';

const state = mapState({
  previousChapterDisabled: select.components.previousChapterDisabled,
  chapterButtons: select.components.chapterButtons,
  color: select.theme.brandDark,
  title: select.accessibility.chapterPrevious
});

const dispatch = injectStore().dispatch;
</script>

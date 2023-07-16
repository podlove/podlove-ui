<template>
  <chapter-button
    v-if="state.chapterButtons"
    class="podlove-player--chapter-previous"
    data-test="chapter-previous"
    type="previous"
    :disabled="state.previousChapterDisabled"
    :title="t(state.title.key, state.title.attr)"
    @previous="dispatch"
  />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { mapState, injectStore } from 'redux-vuex';
import { ChapterButton } from '@podlove/components';

import select from '../../store/selectors/index.js';

const { t } = useI18n();

const state = mapState({
  previousChapterDisabled: select.components.previousChapterDisabled,
  chapterButtons: select.components.chapterButtons,
  title: select.accessibility.chapterPrevious
});

const dispatch = injectStore().dispatch;
</script>

<style lang="postcss" scoped>
.podlove-player--chapter-previous {
  --podlove-component--chapter-button--color: var(--podlove-player--chapter-previous--color);
}
</style>

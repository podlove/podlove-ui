<template>
  <chapter-button
    v-if="state.chapterButtons"
    class="podlove-player--chapter-next"
    data-test="chapter-next"
    type="next"
    :disabled="state.nextChapterDisabled"
    :title="t(state.title.key, state.title.attr)"
    @next="dispatch"
  />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { mapState, injectStore } from 'redux-vuex';
import { ChapterButton } from '@podlove/components';

import select from '../../store/selectors/index.js';

const { t } = useI18n();

const state = mapState({
  nextChapterDisabled: select.components.nextChapterDisabled,
  chapterButtons: select.components.chapterButtons,
  title: select.accessibility.chapterNext
});

const dispatch = injectStore().dispatch;
</script>

<style lang="postcss" scoped>
.podlove-player--chapter-next {
  --podlove-component--chapter-button--color: var(--podlove-player--chapter-next--color);
}
</style>

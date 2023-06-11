<template>
  <chapter-button
    v-if="state.chapterButtons"
    data-test="chapter-next"
    type="next"
    :disabled="state.nextChapterDisabled"
    :color="state.color"
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
  color: select.theme.brandDark,
  title: select.accessibility.chapterNext
});

const dispatch = injectStore().dispatch;
</script>

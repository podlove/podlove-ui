<template>
  <progress-bar
    :progress-color="progressColor"
    :thumb-color="state.thumbColor"
    :highlight-color="state.highlightColor"
    :duration="state.duration"
    :time="state.playtime"
    :ghost="state.ghost"
    :buffer="state.buffer"
    :chapters="state.chapters"
    :quantiles="state.quantiles"
    :title="t(state.title.key, state.title.attr)"
    data-test="progress-bar"
    @time="dispatch"
    @simulate="dispatch"
    @ghost="dispatch"
  />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { mapState, injectStore } from 'redux-vuex';
import { fade } from 'farbraum';
import { ProgressBar } from '@podlove/components';

import select from '../../store/selectors/index.js';

const { t } = useI18n();

const state = mapState({
  progressColor: select.theme.brandDark,
  thumbColor: select.theme.brandDark,
  highlightColor: select.theme.brandLightest,
  duration: select.duration,
  playtime: select.playtime,
  ghost: select.ghost.time,
  buffer: select.network.buffer,
  chapters: select.chapters.list,
  quantiles: select.quantiles,
  title: select.accessibility.progressBar
});

const dispatch = injectStore().dispatch;

const progressColor = computed(() => fade(state.progressColor, 0.7));
</script>

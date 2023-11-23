<template>
  <progress-bar
    class="podlove-player--progress-bar"
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
import { mapState, injectStore } from 'redux-vuex';
import { ProgressBar } from '@podlove/components';

import select from '../../store/selectors/index.js';

const { t } = useI18n();

const state = mapState({
  duration: select.duration,
  playtime: select.playtime,
  ghost: select.ghost.time,
  buffer: select.network.buffer,
  chapters: select.chapters.list,
  quantiles: select.quantiles,
  title: select.accessibility.progressBar
});

const dispatch = injectStore().dispatch;
</script>

<style lang="postcss" scoped>
.podlove-player--progress-bar {
  --podlove-component--progress-bar--progress-color: var(--podlove-player--progress-bar--progress-color);
  --podlove-component--progress-bar--chapters-separator-color: var(--podlove-player--progress-bar--chapter-separator-color);
  --podlove-component--progress-bar--chapters-background-color: var(--podlove-player--progress-bar--chapter-background-color);
  --podlove-component--progress-bar--track-background-color: var(--podlove-player--progress-bar--track-color);
  --podlove-component--progress-bar--thumb-background-color: var(--podlove-player--progress-bar--thumb-color);
  --podlove-component--progress-bar--thumb-border-color: var(--podlove-player--progress-bar--thumb-border-color);
  --podlove-component--progress-bar--ghost-background-color: var(--podlove-player--progress-bar--ghost-color);
  --podlove-component--progress-bar--ghost-border-color: var(--podlove-player--progress-bar--ghost-border-color);
  --podlove-component--progress-bar--buffer-background-color: var(--podlove-player--progress-bar--buffer-background-color);
}
</style>

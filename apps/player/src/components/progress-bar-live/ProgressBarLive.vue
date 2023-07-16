<template>
  <progress-bar
    class="podlove-player--progress-bar-live"
    :duration="state.livesync"
    :time="state.playtime"
    :ghost="state.ghost"
    :buffer="state.livesync ? state.buffer : []"
    :title="t(state.title.key, state.title.attr)"
    data-test="progress-bar-live"
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
  playtime: select.playtime,
  ghost: select.ghost.time,
  buffer: select.network.buffer,
  title: select.accessibility.progressBar,
  livesync: select.livesync
});

const dispatch = injectStore().dispatch;
</script>

<style lang="postcss" scoped>
.podlove-player--progress-bar-live {
  --podlove-component--progress-bar--progress-color: var(--podlove-player--progress-bar-live--progress-color);
  --podlove-component--progress-bar--track-background-color: var(--podlove-player--progress-bar-live--track-color);
  --podlove-component--progress-bar--thumb-background-color: var(--podlove-player--progress-bar-live--thumb-color);
  --podlove-component--progress-bar--thumb-border-color: var(--podlove-player--progress-bar-live--thumb-border-color);
  --podlove-component--progress-bar--ghost-background-color: var(--podlove-player--progress-bar-live--ghost-color);
  --podlove-component--progress-bar--ghost-border-color: var(--podlove-player--progress-bar-live--ghost-border-color);
  --podlove-component--progress-bar--buffer-background-color: var(--podlove-player--progress-bar-live--buffer-background-color);
}
</style>

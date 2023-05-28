<template>
  <progress-bar
    :progress-color="progressColor"
    :thumb-color="state.thumbColor"
    :highlight-color="state.highlightColor"
    :duration="state.livesync"
    :time="state.playtime"
    :ghost="state.ghost"
    :buffer="state.livesync ? state.buffer : []"
    :title="$t(state.title.key, state.title.attr)"
    data-test="progress-bar-live"
    @time="dispatch"
    @simulate="dispatch"
    @ghost="dispatch"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { mapState, injectStore } from 'redux-vuex';
import { fade } from 'farbraum';
import { ProgressBar } from '@podlove/components';

import select from '../../store/selectors/index.js';

const progressColor = computed(() => fade(state.progressColor, 0.7));

const state = mapState({
  progressColor: select.theme.brandDark,
  thumbColor: select.theme.brandDark,
  highlightColor: select.theme.brandLightest,
  playtime: select.playtime,
  ghost: select.ghost.time,
  buffer: select.network.buffer,
  title: select.accessibility.progressBar,
  livesync: select.livesync
});

const dispatch = injectStore().dispatch;
</script>

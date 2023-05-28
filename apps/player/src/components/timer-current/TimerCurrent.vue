<template>
  <timer
    role="timer"
    :color="state.color"
    :time="state.ghost ? state.ghost : state.playtime"
    :aria-label="t(state.a11y.key, state.a11y.attr)"
    tabindex="0"
    data-test="timer-current"
  />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { mapState } from 'redux-vuex';
import { Timer } from '@podlove/components';
import select from '../../store/selectors/index.js';

const { t } = useI18n();

const state = mapState({
  playtime: select.playtime,
  ghost: select.ghost.time,
  color: select.theme.contrast,
  a11y: select.accessibility.timerCurrent
});
</script>

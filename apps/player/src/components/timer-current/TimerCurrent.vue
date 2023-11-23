<template>
  <timer
    class="podlove-player--timer-current"
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
  a11y: select.accessibility.timerCurrent
});
</script>

<style lang="postcss" scoped>
.podlove-player--timer-current {
  color: var(--podlove-player--timer-current--color);
}
</style>

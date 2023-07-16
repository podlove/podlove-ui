<template>
  <button
    class="podlove-player--speed-control"
    data-test="speed-control"
    :title="t(state.a11y(nextRate * 100).key, state.a11y(nextRate * 100).attr)"
    @click="setRate"
    @dblclick="setRate()"
  >
    <speed050-icon v-if="icon === 'speed-050'" :data-test="`speed-control--${icon}`" />
    <speed075-icon v-if="icon === 'speed-075'" :data-test="`speed-control--${icon}`" />
    <speed100-icon v-if="icon === 'speed-100'" :data-test="`speed-control--${icon}`" />
    <speed125-icon v-if="icon === 'speed-125'" :data-test="`speed-control--${icon}`" />
    <speed150-icon v-if="icon === 'speed-150'" :data-test="`speed-control--${icon}`" />
    <speed175-icon v-if="icon === 'speed-175'" :data-test="`speed-control--${icon}`" />
    <speed200-icon v-if="icon === 'speed-200'" :data-test="`speed-control--${icon}`" />
    <icon :type="icon" :data-test="`speed-control--${icon}`"></icon>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { mapState, injectStore } from 'redux-vuex';
import {
  Speed050Icon,
  Speed075Icon,
  Speed100Icon,
  Speed125Icon,
  Speed150Icon,
  Speed175Icon,
  Speed200Icon
} from '@podlove/components';
import { setRate as setRateAction } from '@podlove/player-actions/audio';

import select from '../../store/selectors/index.js';

const { t } = useI18n();

const steps = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2.0];

const state = mapState({
  rate: select.audio.rate,
  a11y: select.accessibility.speedControl
});

const dispatch = injectStore().dispatch;

const icon = computed(() => {
  if (state.rate <= 0.5) {
    return 'speed-050';
  }

  if (state.rate <= 0.75) {
    return 'speed-075';
  }

  if (state.rate <= 1) {
    return 'speed-100';
  }

  if (state.rate <= 1.25) {
    return 'speed-125';
  }

  if (state.rate <= 1.5) {
    return 'speed-150';
  }

  if (state.rate <= 1.75) {
    return 'speed-175';
  }

  return 'speed-200';
});

const nextRate = computed(() => {
  const next = steps.indexOf(state.rate) + 1;

  if (next < steps.length) {
    return steps[next];
  }

  return steps[0];
});

const setRate = () => {
  dispatch(setRateAction(nextRate.value));
};
</script>

<style lang="postcss" scoped>
.podlove-player--speed-control {
  --podlove-component--icon--color: var(--podlove-player--speed-control--color);
}
</style>

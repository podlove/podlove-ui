<template>
  <stepper-button
  v-if="state.stepperButtons"
    class="podlove-player--stepper-button--backward"
    data-test="step-backward"
    type="backwards"
    :title="t(state.title.key, state.title.attr)"
    @backwards="dispatch"
  />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { mapState, injectStore } from 'redux-vuex';
import { StepperButton } from '@podlove/components';

import select from '../../store/selectors/index.js';

const { t } = useI18n();

const state = mapState({
  stepperButtons: select.components.stepperButtons,
  title: select.accessibility.stepperBackwards
});

const dispatch = injectStore().dispatch;
</script>

<style lang="postcss" scoped>
.podlove-player--stepper-button--backward {
  --podlove-component--stepper-button--color: var(--podlove-player--stepper-button--backward--color);
}
</style>

<template>
  <stepper-button
    v-if="state.stepperButtons"
    class="podlove-player--stepper-button--forward"
    data-test="step-forward"
    type="forward"
    :title="t(state.title.key, state.title.attr)"
    @forward="dispatch"
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
  title: select.accessibility.stepperForward
});
const dispatch = injectStore().dispatch;
</script>


<style lang="postcss" scoped>
.podlove-player--stepper-button--forward {
  --podlove-component--stepper-button--color: var(--podlove-player--stepper-button--forward--color);
}
</style>

<template>
  <stepper-button
    v-if="state.stepperButtons"
    class="control-button"
    data-test="step-forward"
    type="forward"
    :title="$t(state.title.key, state.title.attr)"
    :color="state.color"
    @forward="dispatch"
  />
</template>

<script lang="ts" setup>
import { mapState, injectStore } from 'redux-vuex';
import { StepperButton } from '@podlove/components';

import select from '../../store/selectors/index.js';

const state = mapState({
  stepperButtons: select.components.stepperButtons,
  color: select.theme.brandDark,
  title: select.accessibility.stepperForward
});
const dispatch = injectStore().dispatch;
</script>

<template>
  <stepper-button
    v-if="state.stepperButtons"
    data-test="step-backward"
    type="backwards"
    :title="$t(state.title.key, state.title.attr)"
    :color="state.color"
    @backwards="dispatch"
  />
</template>

<script lang="ts" setup>
import { mapState, injectStore } from 'redux-vuex';
import { StepperButton } from '@podlove/components';

import select from '../../store/selectors/index.js';

const state = mapState({
  stepperButtons: select.components.stepperButtons,
  color: select.theme.brandDark,
  title: select.accessibility.stepperBackwards
});

const dispatch = injectStore().dispatch;
</script>

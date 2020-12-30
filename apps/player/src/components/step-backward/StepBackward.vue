<template>
  <stepper-button
    v-if="state.stepperButtons"
    data-test="step-backward"
    type="backwards"
    :title="$t(state.title.key, state.title.attr)"
    :color="state.color"
    @click="dispatch"
  />
</template>

<script>
import { mapState, injectStore } from 'redux-vuex'
import StepperButton from '@podlove/components/stepper-button'

import select from 'store/selectors'

export default {
  components: {
    StepperButton
  },
  setup() {
    return {
      state: mapState({
        stepperButtons: select.components.stepperButtons,
        color: select.theme.brandDark,
        title: select.accessibility.stepperBackwards
      }),
      dispatch: injectStore().dispatch
    }
  }
}
</script>

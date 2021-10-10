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

<script>
import { mapState, injectStore } from 'redux-vuex'

import select from 'store/selectors'
import StepperButton from '@podlove/components/stepper-button'

export default {
  components: {
    StepperButton
  },
  setup() {
    return {
      state: mapState({
        stepperButtons: select.components.stepperButtons,
        color: select.theme.brandDark,
        title: select.accessibility.stepperForward
      }),
      dispatch: injectStore().dispatch
    }
  }
}
</script>

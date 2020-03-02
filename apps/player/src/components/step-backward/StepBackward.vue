<template lang="pug">
  stepper-button(v-if="stepperButtons" type="backwards" :disabled="previousStepperDisabled" :color="color" @click="dispatch" data-test="step-backward")
</template>

<script>
import { mapState } from 'redux-vuex'
import store from 'store'

import select from 'store/selectors'
import StepperButton from '@podlove/components/stepper-button'

export default {
  components: {
    StepperButton
  },
  data: mapState({
    stepperButtons: select.components.stepperButtons,
    previousStepperDisabled: select.components.previousStepDisabled,
    color: select.theme.brandDark
  }),
  methods: {
    dispatch: store.dispatch
  }
}
</script>

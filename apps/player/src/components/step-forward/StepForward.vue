<template lang="pug">
  stepper-button.control-button(v-if="stepperButtons" type="forward" :title="$t(title.key, title.attr)" :color="color" @click="dispatch" data-test="step-forward")
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
    color: select.theme.brandDark,
    title: select.accessibility.stepperForward
  }),
  methods: {
    dispatch: store.dispatch
  }
}
</script>

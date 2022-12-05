<script setup>
import { ref } from 'vue'

import { ControlsAddon, EventsAddon, eventCallback } from '@vitebook/vue/addons'

import StepperButton from '@podlove/components/stepper-button/StepperButton.vue'
import Action from '../shared/Action.vue'

const type = ref('forward')
const color = ref('#ff0000')
</script>

<template>
  <div>
    <stepper-button :type="type" :color="color" @forward="eventCallback" @backwards="eventCallback">
    </stepper-button>

    <ControlsAddon>
      <Action label="Type">
        <select v-model="type">
          <option>forward</option>
          <option>backwards</option>
        </select>
      </Action>
      <Action label="Color">
        <input v-model="color" type="color" />
      </Action>
    </ControlsAddon>
    <EventsAddon />
  </div>
</template>

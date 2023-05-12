<script setup lang="ts">
import { ref } from 'vue';

import { ControlsAddon, EventsAddon, eventCallback } from '@vitebook/vue/addons';

import { StepperButton } from '@podlove/components';
import Action from '../shared/Action.vue';

const type = ref('forward');
const color = ref('#ff0000');

const style = ref({
  '--podlove-component-stepper-button-color': color
});
</script>

<template>
  <div>
    <stepper-button :style="style" :type="type" @forward="eventCallback" @backwards="eventCallback">
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

<script setup lang="ts">
import { ref } from 'vue';
import { logEvent } from 'histoire/client';
import { StepperButton } from '@podlove/components';

import { burntSienna } from '../colors.js';

const type = ref('forward');
const color = ref(burntSienna);

const style = ref({
  '--podlove-component--stepper-button--color': color
});
</script>

<template>
  <Story title="Components/Stepper Button" auto-props-disabled>
    <stepper-button
      :style="style"
      :type="type"
      @forward="logEvent('forward', $event)"
      @backwards="logEvent('backwards', $event)"
    ></stepper-button>

    <template #controls>
      <HstSelect v-model="type" title="Type" :options="['forward', 'backwards']" />
      <HstColor v-model="color" title="Color" />
    </template>
  </Story>
</template>

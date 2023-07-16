<script setup lang="ts">
import { ref } from 'vue';
import { logEvent } from 'histoire/client';

import { InputCheckbox } from '@podlove/components';
import { burntSienna, charcoal, persianGreen } from '../colors.js';

const value = ref(false);
const disabled = ref(false);
const label = ref('Input Label');
const color = ref(burntSienna);
const borderColor = ref(persianGreen);
const background = ref(charcoal);

const style = ref({
  '--podlove-component--checkbox--color': color,
  '--podlove-component--checkbox--background': background,
  '--podlove-component--checkbox--border': borderColor
});
</script>

<template>
  <Story title="Components/Input Checkbox" auto-props-disabled>
    <InputCheckbox
      class="text-white"
      :style="style"
      :value="value"
      :disabled="disabled"
      :label="label"
      @onChange="logEvent('onChange', $event)"
    />

    <template #controls>
      <HstCheckbox v-model="value" title="Value" />
      <HstCheckbox v-model="disabled" title="Disabled" />
      <HstText v-model="label" title="Label" />
      <HstColor v-model="color" title="Checkbox Color" />
      <HstColor v-model="borderColor" title="Border Color" />
      <HstColor v-model="background" title="Background Color" />
    </template>
  </Story>
</template>

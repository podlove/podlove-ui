<script setup lang="ts">
import { ref } from 'vue';
import { InputSelect } from '@podlove/components';
import { logEvent } from 'histoire/client';
import { charcoal, persianGreen, saffron } from '../colors.js';

const value = ref('value-2');
const disabled = ref(false);
const borderColor = ref(persianGreen);
const background = ref(charcoal);
const color = ref(saffron);
const options = ref(['value-1', 'value-2', 'value-3', 'value-4']);

const style = ref({
  '--podlove-component-input-select-color': color,
  '--podlove-component-input-select-background': background,
  '--podlove-component-input-select-border': borderColor
});
</script>

<template>
  <Story title="Components/Input Select" auto-props-disabled>
    <InputSelect
      :style="style"
      :value="value"
      :disabled="disabled"
      :options="options"
      @change="logEvent('change', $event)"
    />

    <template #controls>
      <HstSelect
        v-model="value"
        title="Value"
        :options="options"
      />
      <HstCheckbox title="Disabled" v-model="disabled" />
      <HstColor title="Color" v-model="color" />
      <HstColor title="Border Color" v-model="borderColor" />
      <HstColor title="Background Color" v-model="background" />
    </template>
  </Story>
</template>

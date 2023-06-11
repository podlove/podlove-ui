<script setup lang="ts">
import { ref } from 'vue';
import { InputText } from '@podlove/components';
import { charcoal, sandyBrown, persianGreen } from '../colors.js'

const disabled = ref(false);
const value = ref('my value');
const color = ref(sandyBrown);
const borderColor = ref(persianGreen);
const background = ref(charcoal);
const block = ref(false);

const style = ref({
  '--podlove-component-input-text-background': background,
  '--podlove-component-input-text-border': borderColor,
  '--podlove-component-input-text-color': color
});
</script>

<template>
  <Story title="Components/Input Text" auto-props-disabled>
    <div class="w-64">
      <input-text
        :style="style"
        :value="value"
        :disabled="disabled"
        :class="{ 'block w-full': block }"
      >
      </input-text>
    </div>
    <template #controls>
      <HstText v-model="value" title="Value" />
      <HstCheckbox v-model="disabled" title="Disabled" />
      <HstColor v-model="color" title="Color" />
      <HstColor v-model="borderColor" title="Border Color" />
      <HstColor v-model="background" title="Background Color" />
      <HstCheckbox v-model="block" title="Block" />
    </template>
  </Story>
</template>

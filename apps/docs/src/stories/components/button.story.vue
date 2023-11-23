<template>
  <Story title="Components/Button" auto-props-disabled>
    <Button :href="href" :disabled="disabled" :style="style">Button Text</Button>

    <template #controls>
      <HstColor v-model="textColor" title="Text Color" />
      <HstColor v-model="backgroundColor" title="Background Color" />
      <HstColor v-model="borderColor" title="Border Color" />
      <HstText v-model="href" title="Href" />
      <HstCheckbox v-model="disabled" title="Disabled" />
    </template>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@podlove/components';
import { charcoal, persianGreen, sandyBrown } from '../colors.js';

const textColor = ref(charcoal);
const backgroundColor = ref(sandyBrown);
const borderColor = ref(persianGreen);
const href = ref('');
const disabled = ref(false);

const style = ref({
  '--podlove-component--button--text': textColor,
  '--podlove-component--button--background': backgroundColor,
  '--podlove-component--button--border': borderColor
});
</script>

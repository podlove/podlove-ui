<script lang="ts" setup>
import { ref } from 'vue';

import { Divider } from '@podlove/components';
import { persianGreen } from '../colors.js';

const color = ref(persianGreen);
const style = ref({
  '--podlove-component--divider--color': color
});
</script>

<template>
  <Story title="Components/Divider" auto-props-disabled>
    <Divider :style="style" class="w-40" />

    <template #controls>
      <HstColor v-model="color" title="Color" />
    </template>
  </Story>
</template>

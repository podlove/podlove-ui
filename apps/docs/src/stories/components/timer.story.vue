<script setup lang="ts">
import { ref } from 'vue';

import { Timer } from '@podlove/components';

const time = ref(5 * 60 * 1000);
const remaining = ref(false);
</script>

<template>
  <Story title="Components/Timer" auto-props-disabled>
    <Timer class="text-white" :time="time" :remaining="remaining" />

    <template #controls>
      <HstNumber v-model="time" title="Time" />
      <HstCheckbox v-model="remaining" title="Remaining" />
    </template>
  </Story>
</template>

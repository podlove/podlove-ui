<script setup lang="ts">
import { ref } from 'vue';
import { logEvent } from 'histoire/client';

import { InputSlider } from '@podlove/components';
import { persianGreen, saffron, sandyBrown } from '../colors.js';

const min = ref(0);
const max = ref(100);
const step = ref(1);
const value = ref(0);
const borderColor = ref(sandyBrown);
const thumbColor = ref(saffron);
const progressColor = ref(persianGreen);
const pins = ref([
  {
    value: 0,
    label: '0x'
  },
  {
    value: 0.25,
    label: '25x'
  },
  {
    value: 0.5,
    label: '50x'
  },
  {
    value: 0.75,
    label: '75x'
  },
  {
    value: 1,
    label: '100x'
  }
]);
const style = ref({
  '--podlove-component--input-slider--thumb-color': thumbColor,
  '--podlove-component--input-slider--border-color': borderColor,
  '--podlove-component--input-slider--progress-color': progressColor
});
</script>

<template>
  <Story title="Components/Input Slider" auto-props-disabled>
    <div class="w-60 overflow-visible p-5 text-white">
      <input-slider
        :style="style"
        :min="min"
        :max="max"
        :step="step"
        :value="value"
        :pins="pins"
        @change="logEvent('change', $event)"
        @input="logEvent('input', $event)"
        @dblClick="logEvent('dblClick', $event)"
      >
      </input-slider>
    </div>

    <template #controls>
      <HstNumber v-model="min" title="Min" />
      <HstNumber v-model="max" title="Max" />
      <HstNumber v-model="step" title="Step" />
      <HstNumber v-model="value" title="Value" />
      <HstColor v-model="progressColor" title="Progress Color" />
      <HstColor v-model="borderColor" title="Border Color" />
      <HstColor v-model="thumbColor" title="Thumb Color" />
    </template>
  </Story>
</template>

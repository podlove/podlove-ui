<script setup lang="ts">
import { ref } from 'vue';
import { Tooltip } from '@podlove/components';
import { logEvent } from 'histoire/client';
import { charcoal, saffron } from '../colors.js';

const trigger = ref('click');
const placement = ref('bottom');
const content = ref('Tooltip Content');
const color = ref(charcoal);
const background = ref(saffron);

const style = ref({
  '--podlove-component--tooltip--background': background,
  '--podlove-component--tooltip--color': color
});
</script>

<template>
  <Story title="Components/Tooltip" auto-props-disabled>
    <div class="h-[150px] w-[400px] relative flex items-center justify-center content-center">
      <tooltip
        :placement="placement"
        :trigger="trigger"
        :content="content"
        :style="style"
        @click="logEvent('click', $event)"
      >
        <span class="text-white">Tooltip trigger</span>
      </tooltip>
    </div>

    <template #controls>
      <HstText v-model="content" title="Content" />
      <HstSelect v-model="trigger" :options="['hover', 'click']" title="Trigger" />
      <HstSelect v-model="placement" :options="['top', 'right', 'bottom', 'left']" title="Placement" />
      <HstColor v-model="color" title="Color" />
      <HstColor v-model="background" title="Background" />
    </template>
  </Story>
</template>

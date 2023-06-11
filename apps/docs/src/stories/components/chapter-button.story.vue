<script lang="ts" setup>
import { ref } from 'vue';
import { logEvent } from 'histoire/client';
import { ChapterButton } from '@podlove/components';
import { burntSienna } from '../colors.js';

const type = ref('next');
const color = ref(burntSienna);

const style = ref({
  '--podlove-component-chapter-button-color': color
});
</script>

<template>
  <Story title="Components/Chapter Button" auto-props-disabled>
    <ChapterButton
      :type="type"
      :style="style"
      @next="logEvent('next', $event)"
      @previous="logEvent('previous', $event)"
    />

    <template #controls>
      <HstSelect v-model="type" title="Type" :options="['next', 'previous']" />

      <HstColor v-model="color" title="Color" />
    </template>
  </Story>
</template>

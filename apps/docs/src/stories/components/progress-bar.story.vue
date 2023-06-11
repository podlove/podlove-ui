<script setup lang="ts">
import { ref } from 'vue';
import { logEvent } from 'histoire/client';

import { ProgressBar } from '@podlove/components';
import { burntSienna, charcoal } from '../colors.js';

const title = ref('input title');
const time = ref(0);
const duration = ref(1000);
const ghost = ref(450);
const buffer = ref([[0, 500]]);
const quantiles = ref([[50, 200]]);
const chapters = ref([
  {
    start: 0,
    end: 250
  },
  {
    start: 250,
    end: 500
  },
  {
    start: 500,
    end: 750
  },
  {
    start: 750,
    end: 1000
  }
]);

const progressColor = ref(charcoal);
const chaptersSeperatorColor = ref(charcoal);
const chaptersBackgroundColor = ref(charcoal);
const trackBackgroundColor = ref(burntSienna);
const thumbBackgroundColor = ref(burntSienna);
const thumbBorderColor = ref(burntSienna);
const ghostBackgroundColor = ref(burntSienna);
const ghostBorderColor = ref(burntSienna);
const bufferBackgroundColor = ref(burntSienna);
const label = ref('');

const style = ref({
  '--podlove-component-progress-bar-progress-color': progressColor,
  '--podlove-component-progress-bar-chapters-separator-color': chaptersSeperatorColor,
  '--podlove-component-progress-bar-chapters-background-color': chaptersBackgroundColor,
  '--podlove-component-progress-bar-track-background-color': trackBackgroundColor,
  '--podlove-component-progress-bar-thumb-background-color': thumbBackgroundColor,
  '--podlove-component-progress-bar-thumb-border-color': thumbBorderColor,
  '--podlove-component-progress-bar-ghost-background-color': ghostBackgroundColor,
  '--podlove-component-progress-bar-ghost-border-color': ghostBorderColor,
  '--podlove-component-progress-bar-buffer-background-color': bufferBackgroundColor
});
</script>

<template>
  <Story title="Components/Progress Bar" auto-props-disabled>
    <div class="w-64 p-4">
      <progress-bar
        :style="style"
        :title="title"
        :time="time"
        :duration="duration"
        :ghost="ghost"
        :buffer="buffer"
        :quantiles="quantiles"
        :chapters="chapters"
        :label="label"
        @time="logEvent('time', $event)"
        @ghost="logEvent('ghost', $event)"
        @simulate="logEvent('simulate', $event)"
      >
      </progress-bar>
    </div>
    <template #controls>
      <HstText v-model="title" title="Title" />
      <HstText v-model="label" title="Label" />
      <HstNumber v-model="time" title="Time" />
      <HstNumber v-model="duration" title="Duration" />
      <HstNumber v-model="ghost" title="Ghost" />
      <HstColor v-model="progressColor" title="Progress Color" />
      <HstColor v-model="chaptersSeperatorColor" title="Chapters Seperator Color" />
      <HstColor v-model="chaptersBackgroundColor" title="Chapters Background Color" />
      <HstColor v-model="trackBackgroundColor" title="Track Background Color" />
      <HstColor v-model="thumbBackgroundColor" title="Thumb Background Color" />
      <HstColor v-model="thumbBorderColor" title="Thumb Border Color" />
      <HstColor v-model="ghostBackgroundColor" title="Ghost Background Color" />
      <HstColor v-model="ghostBorderColor" title="Ghost Border Color" />
      <HstColor v-model="bufferBackgroundColor" title="Buffer Background Color" />
    </template>
  </Story>
</template>

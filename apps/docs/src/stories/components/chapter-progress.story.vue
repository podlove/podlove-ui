<script setup lang="ts">
import { ref } from 'vue';
import { logEvent } from 'histoire/client';

import { ChapterProgress } from '@podlove/components';
import { persianGreen, sandyBrown } from '../colors.js';

const start = ref(0);
const end = ref(6 * 60 * 1000);
const title = ref('Chapter Title');
const href = ref('http://google.de');
const linkTitle = ref('Link Title');
const active = ref(false);

const chapter = ref({
  start,
  end,
  title,
  href,
  linkTitle,
  active
});

const showLink = ref(false);
const playtime = ref(2.5 * 60 * 1000);
const ghost = ref(0);
const progressColor = ref(persianGreen);
const ghostColor = ref(sandyBrown);
const style = ref({
  '--podlove-component--chapter-progress--background': progressColor,
  '--podlove-component--chapter-progress--ghost--background': ghostColor
});
</script>

<template>
  <Story title="Components/Chapter Progress" auto-props-disabled>
    <ChapterProgress
      :style="style"
      :chapter="chapter"
      :show-link="showLink"
      :playtime="playtime"
      :ghost="ghost"

      @chapter="logEvent('chapter', $event)"
      @play="logEvent('play', $event)"
      @playtime="logEvent('playtime', $event)"
      @ghost="logEvent('ghost', $event)"
      @simulate="logEvent('simulate', $event)"
      @hover="logEvent('hover', $event)"
    />

    <template #controls>
      <HstNumber v-model="playtime" title="Playtime" />
      <HstNumber v-model="ghost" title="Ghost" />
      <HstCheckbox v-model="showLink" title="Show Link" />
      <HstColor v-model="progressColor" title="ProgressColor" />
      <HstColor v-model="ghostColor" title="GhostColor" />
      <HstNumber v-model="start" title="Chapter Start" />
      <HstNumber v-model="end" title="Chapter End" />
      <HstText v-model="title" title="Chapter Title" />
      <HstText v-model="href" title="Chapter Href" />
      <HstCheckbox v-model="active" title="Chapter Active" />
    </template>
  </Story>
</template>

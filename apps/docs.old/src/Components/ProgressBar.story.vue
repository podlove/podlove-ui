<script setup lang="ts">
import { ref } from 'vue';

import { ControlsAddon, EventsAddon, eventCallback } from '@vitebook/vue/addons';

import { ProgressBar } from '@podlove/components';
import Action from '../shared/Action.vue';

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

const progressColor = ref('#D1C477');
const chaptersSeperatorColor = ref('#D1C477');
const chaptersBackgroundColor = ref('#D1C477');
const trackBackgroundColor = ref('#000000');
const thumbBackgroundColor = ref('#000000');
const thumbBorderColor = ref('#000000');
const ghostBackgroundColor = ref('#000000');
const ghostBorderColor = ref('#000000');
const bufferBackgroundColor = ref('#000000');
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
  <div>
    <div class="w-64">
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
        @time="eventCallback"
        @ghost="eventCallback"
        @simulate="eventCallback"
      >
      </progress-bar>
    </div>

    <ControlsAddon>
      <Action label="Title">
        <input v-model="title" type="text" class="w-full p-2" />
      </Action>
      <Action label="Label">
        <input v-model="label" type="text" class="w-full p-2" />
      </Action>
      <Action label="Time">
        <input v-model="time" type="number" class="w-full p-2" />
      </Action>
      <Action label="Duration">
        <input v-model="duration" type="number" class="w-full p-2" />
      </Action>
      <Action label="Ghost">
        <input v-model="ghost" type="number" class="w-full p-2" />
      </Action>
      <Action label="Progress Color">
        <input v-model="progressColor" type="color" />
      </Action>
      <Action label="Chapters Seperator Color">
        <input v-model="chaptersSeperatorColor" type="color" />
      </Action>
      <Action label="Chapters Background Color">
        <input v-model="chaptersBackgroundColor" type="color" />
      </Action>
      <Action label="Track Background Color">
        <input v-model="trackBackgroundColor" type="color" />
      </Action>
      <Action label="Thumb Background Color">
        <input v-model="thumbBackgroundColor" type="color" />
      </Action>
      <Action label="Thumb Border Color">
        <input v-model="thumbBorderColor" type="color" />
      </Action>
      <Action label="Ghost Background Color">
        <input v-model="ghostBackgroundColor" type="color" />
      </Action>
      <Action label="Ghost Border Color">
        <input v-model="ghostBorderColor" type="color" />
      </Action>
      <Action label="Buffer Background Color">
        <input v-model="bufferBackgroundColor" type="color" />
      </Action>
    </ControlsAddon>
    <EventsAddon />
  </div>
</template>

<script setup>
import { ref } from 'vue';

import { ControlsAddon, EventsAddon, eventCallback } from '@vitebook/vue/addons';

import { Tooltip } from '@podlove/components';
import Action from '../shared/Action.vue';

const trigger = ref('hover');
const placement = ref('bottom');
const content = ref('Tooltip Content');
const color = ref('#ffffff');
const background = ref('#000000');
</script>

<template>
  <div>
    <div
      style="
        height: 150px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <tooltip
        :placement="placement"
        :trigger="trigger"
        :content="content"
        :color="color"
        :background="background"
        @click="eventCallback"
      >
        <span>Tooltip trigger</span>
      </tooltip>
    </div>

    <ControlsAddon>
      <Action label="Content">
        <input v-model="content" type="text" class="p-2 w-full" />
      </Action>
      <Action label="Trigger">
        <select v-model="trigger">
          <option>hover</option>
          <option>click</option>
        </select>
      </Action>
      <Action label="Placement">
        <select v-model="placement">
          <option>auto</option>
          <option>top</option>
          <option>right</option>
          <option>bottom</option>
          <option>left</option>
        </select>
      </Action>
      <Action label="Color">
        <input v-model="color" type="color" />
      </Action>
      <Action label="Background">
        <input v-model="background" type="color" />
      </Action>
    </ControlsAddon>
    <EventsAddon />
  </div>
</template>

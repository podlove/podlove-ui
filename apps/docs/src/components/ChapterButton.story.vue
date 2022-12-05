<script setup>
import { ref } from 'vue'

import { ControlsAddon, EventsAddon, eventCallback } from '@vitebook/vue/addons'

import ChapterButton from '@podlove/components/chapter-button/ChapterButton.vue'
import Action from '../shared/Action.vue'

const type = ref('next')
const color = ref('#000')
</script>

<template>
  <div>
    <ChapterButton
      :type="type"
      :color="color"
      @next="eventCallback"
      @previous="eventCallback"
    />

    <ControlsAddon>
      <Action label="Type">
        <select v-model="type" class="w-full p-2">
          <option>next</option>
          <option>previous</option>
        </select>
      </Action>
      <Action label="Color">
        <input v-model="color" type="color" />
      </Action>
    </ControlsAddon>

    <EventsAddon />
  </div>
</template>

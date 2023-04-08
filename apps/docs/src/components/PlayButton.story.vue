<script setup>
import { ref } from 'vue'

import { ControlsAddon, EventsAddon, eventCallback } from '@vitebook/vue/addons'

import PlayButton from '@podlove/components/play-button/PlayButton.vue'
import Action from '../shared/Action.vue'

const type = ref('play')
const background = ref('#000000')
const color = ref('#ff0000')
const label = ref('My Label')
const size = ref(50)

const style = ref({
  '--podlove-component-play-button-background': background,
  '--podlove-component-play-button-text-color': color
})
</script>

<template>
  <div>
    <play-button
      :type="type"
      :color="color"
      :background="background"
      :label="label"
      :size="size"
      @play="eventCallback"
      @pause="eventCallback"
      @restart="eventCallback"
      :style="style"
    >
    </play-button>

    <ControlsAddon>
      <Action label="Type">
        <select v-model="type">
          <option>play</option>
          <option>pause</option>
          <option>loading</option>
          <option>restart</option>
        </select>
      </Action>
      <Action label="Color">
        <input v-model="color" type="color" />
      </Action>
      <Action label="Background Color">
        <input v-model="background" type="color" />
      </Action>
      <Action label="Label">
        <input v-model="label" type="text" class="w-full p-2" />
      </Action>
      <Action label="Size">
        <input v-model="size" type="number" class="w-full p-2" />
      </Action>
    </ControlsAddon>
    <EventsAddon />
  </div>
</template>

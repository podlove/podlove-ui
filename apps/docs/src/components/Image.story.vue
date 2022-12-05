<script setup>
import { ref } from 'vue'

import { ControlsAddon, EventsAddon, eventCallback } from '@vitebook/vue/addons'

import Image from '@podlove/components/image/Image.vue'
import Action from '../shared/Action.vue'

const color = ref('#ffffff')
const alt = ref('Image Alt text')
const url = ref('https://via.placeholder.com/1500')
</script>

<template>
  <div>
    <Image :color="color" :alt="alt" :url="url" @onLoad="eventCallback" @onError="eventCallback" />

    <ControlsAddon>
      <Action label="Color">
        <input v-model="color" type="color" />
      </Action>
      <Action label="Url">
        <input v-model="url" type="text" class="w-full p-2" />
      </Action>
      <Action label="Alt">
        <input v-model="alt" type="text" class="w-full p-2" />
      </Action>
    </ControlsAddon>
    <EventsAddon />
  </div>
</template>

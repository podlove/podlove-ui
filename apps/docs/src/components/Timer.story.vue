<script setup>
import { ref } from 'vue'

import { ControlsAddon } from '@vitebook/vue/addons'

import Timer from '@podlove/components/timer/Timer.vue'
import Action from '../shared/Action.vue'

const time = ref(5 * 60 * 1000)
const color = ref('#000000')
const remaining = ref(false)
</script>

<template>
  <div>
    <Timer :color="color" :time="time" :remaining="remaining" />

    <ControlsAddon>
      <Action label="Time">
        <input v-model="time" type="number" class="w-full p-2" />
      </Action>
      <Action label="Color">
        <input v-model="color" type="color" />
      </Action>
      <Action label="Remaining">
        <input v-model="remaining" type="checkbox" />
      </Action>
    </ControlsAddon>
  </div>
</template>

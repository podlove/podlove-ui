<script setup>
import { ref } from 'vue'

import { ControlsAddon, EventsAddon, eventCallback } from '@vitebook/vue/addons'

import InputSlider from '@podlove/components/input-slider/InputSlider.vue'
import Action from '../shared/Action.vue'

const min = ref(0)
const max = ref(100)
const step = ref(1)
const value = ref(0)
const borderColor = ref('#ffffff')
const background = ref('#000000')
const progressColor = ref('#ff0000')
const pins = ref([
  {
    value: 0,
    label: '0x'
  },
  {
    value: 0.25,
    label: '25x'
  },
  {
    value: 0.5,
    label: '50x'
  },
  {
    value: 0.75,
    label: '75x'
  },
  {
    value: 1,
    label: '100x'
  }
])
</script>

<template>
  <div>
    <div class="w-64">
      <input-slider
        :min="min"
        :max="max"
        :step="step"
        :value="value"
        :border-color="borderColor"
        :progress-color="progressColor"
        :pins="pins"
        @change="eventCallback"
        @input="eventCallback"
        @dblClick="eventCallback"
      >
      </input-slider>
    </div>
    <ControlsAddon>
      <Action label="Min">
        <input v-model="min" type="number" class="p-2" />
      </Action>
      <Action label="Max">
        <input v-model="max" type="number" class="p-2" />
      </Action>
      <Action label="Step">
        <input v-model="step" type="number" class="p-2" />
      </Action>
      <Action label="Value">
        <input v-model="value" type="number" class="p-2" />
      </Action>

      <Action label="Progress Color">
        <input v-model="progressColor" type="color" />
      </Action>
      <Action label="Border Color">
        <input v-model="borderColor" type="color" />
      </Action>
      <Action label="Background Color">
        <input v-model="background" type="color" />
      </Action>
    </ControlsAddon>
    <EventsAddon />
  </div>
</template>

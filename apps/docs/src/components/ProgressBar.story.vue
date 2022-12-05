<script setup>
import { ref } from 'vue'

import { ControlsAddon, EventsAddon, eventCallback } from '@vitebook/vue/addons'

import ProgressBar from '@podlove/components/progress-bar/ProgressBar.vue'
import Action from '../shared/Action.vue'

const title = ref('input title')
const time = ref(0)
const duration = ref(1000)
const ghost = ref(450)
const buffer = ref([[0, 500]])
const quantiles = ref([[50, 200]])
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
])

const progressColor = ref('#D1C477')
const thumbColor = ref('#000000')
const highlightColor = ref('#D1C477')
const label = ref('')
</script>

<template>
  <div>
    <div class="w-64">
      <progress-bar
        :title="title"
        :time="time"
        :duration="duration"
        :ghost="ghost"
        :buffer="buffer"
        :quantiles="quantiles"
        :chapters="chapters"
        :progress-color="progressColor"
        :thumb-color="thumbColor"
        :highlight-color="highlightColor"
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
      <Action label="Color">
        <input v-model="color" type="color" />
      </Action>
      <Action label="Progress Color">
        <input v-model="progressColor" type="color" />
      </Action>
      <Action label="Thumb Color">
        <input v-model="highlightColor" type="color" />
      </Action>
      <Action label="Highlight Color">
        <input v-model="thumbColor" type="color" />
      </Action>
    </ControlsAddon>
    <EventsAddon />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { ControlsAddon, EventsAddon, eventCallback } from '@vitebook/vue/addons'

import ChapterProgress from '@podlove/components/chapter-progress/ChapterProgress.vue'
import Action from '../shared/Action.vue'

const start = ref(0)
const end = ref(6 * 60 * 1000)
const title = ref('Chapter Title')
const href = ref('http://google.de')
const linkTitle = ref('Link Title')
const active = ref(false)

const chapter = ref({
  start,
  end,
  title,
  href,
  linkTitle,
  active
})

const showLink = ref(false)
const playtime = ref(2.5 * 60 * 1000)
const ghost = ref(0)
const progressColor = ref('#000')
</script>

<template>
  <div>
    <ChapterProgress
      :chapter="chapter"
      :show-link="showLink"
      :playtime="playtime"
      :ghost="ghost"
      :progress-color="progressColor"
      @chapter="eventCallback"
      @play="eventCallback"
      @playtime="eventCallback"
      @ghost="eventCallback"
      @simulate="eventCallback"
      @hover="eventCallback"
    />

    <ControlsAddon>
      <Action label="Playtime">
        <input v-model="playtime" type="number" class="w-full p-2" />
      </Action>
      <Action label="Ghost">
        <input v-model="ghost" type="number" class="w-full p-2" />
      </Action>
      <Action label="Show Link">
        <input v-model="showLink" type="checkbox" class="p-2" />
      </Action>
      <Action label="ProgressColor">
        <input v-model="progressColor" type="color" />
      </Action>

      <hr class="my-3 border-0 h-px bg-gray-300" />

      <Action label="Start">
        <input v-model="start" type="number" class="w-full p-2" />
      </Action>
      <Action label="End">
        <input v-model="end" type="number" class="w-full p-2" />
      </Action>
      <Action label="Title">
        <input v-model="title" type="text" class="w-full p-2" />
      </Action>
      <Action label="Href">
        <input v-model="href" type="text" class="w-full p-2" />
      </Action>
      <Action label="Active">
        <input v-model="active" type="checkbox" class="p-2" />
      </Action>
    </ControlsAddon>

    <EventsAddon />
  </div>
</template>

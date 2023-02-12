<script setup lang="ts">
import { ref } from 'vue'

import { ControlsAddon, EventsAddon, eventCallback } from '@vitebook/vue/addons'

import Channel from '@podlove/components/channel'
import Action from '../shared/Action.vue'

const color = ref('#ffffff')
const background = ref('#000000')
const link = ref('http://google.de')
const subject = ref('The Subject')
const filled = ref(false)
const a11y = ref('The a11y text')
const type = ref('embed')

const style = ref({
  '--podlove-component-channel-color': color,
  '--podlove-component-channel-background': background
})
</script>

<template>
  <div>
    <Channel
      :style="style"
      :link="link"
      :subject="subject"
      :filled="filled"
      :a11y="a11y"
      :type="type"
      @click="eventCallback"
    />

    <ControlsAddon>
      <Action label="Type">
        <select v-model="type" class="w-full p-2">
          <option>embed</option>
          <option>facebook</option>
          <option>linkedin</option>
          <option>mail</option>
          <option>reddit</option>
          <option>twitter</option>
          <option>xing</option>
          <option>whatsapp</option>
          <option>pinterest</option>
          <option>link</option>
        </select>
      </Action>
      <Action label="Color">
        <input v-model="color" type="color" />
      </Action>
      <Action label="Background">
        <input v-model="background" type="color" />
      </Action>
      <Action label="Link">
        <input v-model="link" type="text" class="w-full p-2" />
      </Action>
      <Action label="Subject">
        <input v-model="subject" type="text" class="w-full p-2" />
      </Action>
      <Action label="Filled">
        <input v-model="filled" type="checkbox" />
      </Action>
      <Action label="A11y">
        <input v-model="a11y" type="text" class="w-full p-2" />
      </Action>
    </ControlsAddon>

    <EventsAddon />
  </div>
</template>

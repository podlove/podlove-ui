<script setup lang="ts">
import { ref } from 'vue'

import { ControlsAddon, EventsAddon, eventCallback } from '@vitebook/vue/addons'

import { InputCheckbox } from '@podlove/components'
import Action from '../shared/Action.vue'

const value = ref(false)
const disabled = ref(false)
const label = ref('Input Label')
const borderColor = ref('#fff')
const background = ref('#fff')

const style = ref({})
</script>

<template>
  <div>
    <InputCheckbox
      :value="value"
      :disabled="disabled"
      :label="label"
      @onChange="eventCallback"
    />

    <ControlsAddon>
      <Action label="Value">
        <input v-model="value" type="checkbox" class="p-2" />
      </Action>
      <Action label="Disabled">
        <input v-model="disabled" type="checkbox" class="p-2" />
      </Action>
      <Action label="Label">
        <input v-model="label" type="text" class="w-full p-2" />
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

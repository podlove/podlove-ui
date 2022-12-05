<script setup>
import { ref } from 'vue'

import { ControlsAddon } from '@vitebook/vue/addons'

import Icon from '@podlove/components/icons/Icon.vue'
import { types as iconTypes } from '@podlove/components/icons/types'

import Action from '../shared/Action.vue'
const type = ref('play')
const color = ref('#000')
const size = ref(21)
</script>

<template>
  <div>
    <Icon :color="color" :type="type" :size="size" />

    <ControlsAddon>
      <Action label="Color">
        <input v-model="color" type="color" />
      </Action>
      <Action label="Type">
        <select v-model="type" class="p-2 w-full">
          <option v-for="iconType in iconTypes" :key="iconType">
            {{ iconType }}
          </option>
        </select>
      </Action>
      <Action label="Size">
        <input v-model="size" type="number" class="p-2 w-full" />
      </Action>
    </ControlsAddon>
  </div>
</template>

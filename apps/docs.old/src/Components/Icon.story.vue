<script setup lang="ts">
import { ref } from 'vue'

import { ControlsAddon } from '@vitebook/vue/addons'

import { Icon } from '@podlove/components'
import { iconTypes as types } from '@podlove/components'

import Action from '../shared/Action.vue'
const iconTypes = Object.keys(types)

const type = ref('play')
const color = ref('#ffffff')
const background = ref('#000000')
const size = ref(21)
</script>

<template>
  <div>
    <div class="icon-story">
      <Icon :type="type" :size="size" />
    </div>
    <ControlsAddon>
      <Action label="Color">
        <input v-model="color" type="color" />
      </Action>
      <Action label="Background">
        <input v-model="background" type="color" />
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

<style lang="postcss">
.icon-story {
  --podlove-component-icon-color: v-bind('color');
  --podlove-component-icon-background: v-bind('background');
}
</style>

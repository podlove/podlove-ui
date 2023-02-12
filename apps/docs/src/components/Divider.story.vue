<script setup>
import { ref } from 'vue'

import { ControlsAddon } from '@vitebook/vue/addons'

import Divider from '@podlove/components/divider/Divider.vue'
import Action from '../shared/Action.vue'

const color = ref('#ffffff')
const style = ref({
  '--podlove-component-divider-color': color
})
</script>

<template>
  <div>
    <div class="w-40">
      <Divider :style="style" />
    </div>

    <ControlsAddon>
      <Action label="Color">
        <input v-model="color" type="color" />
      </Action>
    </ControlsAddon>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { ControlsAddon } from '@vitebook/vue/addons'

import Divider from '@podlove/components/divider/Divider.vue'
import Action from '../shared/Action.vue'

const color = ref('#ffffff')
</script>

<template>
  <div>
    <div class="w-40">
      <Divider :color="color" />
    </div>

    <ControlsAddon>
      <Action label="Color">
        <input v-model="color" type="color" />
      </Action>
    </ControlsAddon>
  </div>
</template>

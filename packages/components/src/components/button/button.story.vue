<script setup>
import { ref } from 'vue'
import { color, background } from '../../defaults'
import { ControlsAddon } from '@vitebook/vue/addons'
import Button from './Button.vue'
const textColor = ref(background)
const text = ref('Button Text')
</script>

<template>
  <div>
    <Button :text-color="textColor">{{ text }}</Button>

    <ControlsAddon>
      <label>Color <input v-model="textColor" type="color" /></label>
      <label>Button Text <input v-model="text" type="text" /></label>
    </ControlsAddon>
  </div>
</template>

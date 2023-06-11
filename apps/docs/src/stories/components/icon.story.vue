<script setup lang="ts">
import { ref } from 'vue';
import { iconTypes as types } from '@podlove/components'
import { Icon } from '@podlove/components'
import { burntSienna, charcoal } from '../colors.js';

const iconTypes = Object.keys(types)

const type = ref('play')
const color = ref(burntSienna)
const background = ref(charcoal)
const size = ref(21)

const style = ref({
  '--podlove-component-icon-color': color,
  '--podlove-component-icon-background': background,
})
</script>

<template>
  <Story title="Components/Icon" auto-props-disabled>
    <Icon :type="type" :size="size" :style="style" />

    <template #controls>
      <HstColor v-model="color" title="Color" />
      <HstColor v-model="background" title="Background" />
      <HstSelect
        v-model="type"
        title="Type"
        :options="iconTypes"
      />
      <HstNumber v-model="size" title="Size" />
    </template>
  </Story>
</template>

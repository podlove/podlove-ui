<script setup>
import { ref } from 'vue';

import { ControlsAddon } from '@vitebook/vue/addons';

import { InputText } from '@podlove/components';
import Action from '../shared/Action.vue';

const disabled = ref(false);
const value = ref('my value');
const color = ref('#000000');
const borderColor = ref('#ff0000');
const background = ref('#ffffff');
const block = ref(false);

const style = ref({
  '--podlove-component-input-text-background': background,
  '--podlove-component-input-text-border': borderColor,
  '--podlove-component-input-text-color': color
});
</script>

<template>
  <div>
    <div class="w-64">
      <input-text
        :style="style"
        :value="value"
        :disabled="disabled"
        :class="{ 'block w-full': block }"
      >
      </input-text>
    </div>
    <ControlsAddon>
      <Action label="Value">
        <input v-model="value" type="text" class="p-2 w-full" />
      </Action>
      <Action label="Disabled">
        <input v-model="disabled" type="checkbox" class="p-2" />
      </Action>
      <Action label="Color">
        <input v-model="color" type="color" />
      </Action>
      <Action label="Border Color">
        <input v-model="borderColor" type="color" />
      </Action>
      <Action label="Background Color">
        <input v-model="background" type="color" />
      </Action>
      <Action label="Block">
        <input v-model="block" type="checkbox" class="p-2" />
      </Action>
    </ControlsAddon>
  </div>
</template>

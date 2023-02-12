<script setup>
import { ref } from 'vue';

import { ControlsAddon, EventsAddon, eventCallback } from '@vitebook/vue/addons';

import InputSelect from '@podlove/components/input-select/InputSelect.vue';
import Action from '../shared/Action.vue';

const value = ref('value-2');
const disabled = ref(false);
const borderColor = ref('#ff0000');
const background = ref('#ffffff');
const color = ref('#000000');
const options = ref(['value-1', 'value-2', 'value-3', 'value-4']);

const style = ref({
  '--podlove-component-input-select-color': color,
  '--podlove-component-input-select-background': background,
  '--podlove-component-input-select-border': borderColor
});
</script>

<template>
  <div>
    <InputSelect
      :style="style"
      :value="value"
      :disabled="disabled"
      :options="options"
      @change="eventCallback"
    />

    <ControlsAddon>
      <Action label="Value">
        <input v-model="value" type="text" class="p-2" />
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
    </ControlsAddon>
    <EventsAddon />
  </div>
</template>

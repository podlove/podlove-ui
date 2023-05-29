<script setup lang="ts">
import { ref } from 'vue';

import { ControlsAddon, EventsAddon, eventCallback } from '@vitebook/vue/addons';

import { Button } from '@podlove/components';
import Action from '../shared/Action.vue';

const text = ref('Button Text');
const textColor = ref('#000000');
const backgroundColor = ref('#ffffff');
const borderColor = ref('#ffffff');
const href = ref('');
const disabled = ref(false);

const style = ref({
  '--podlove-component-button-text': textColor,
  '--podlove-component-button-background': backgroundColor,
  '--podlove-component-button-border': borderColor
});
</script>

<template>
  <div>
    <Button :style="style" :href="href" :disabled="disabled" @click="eventCallback"
      >{{ text }}
    </Button>

    <ControlsAddon>
      <Action label="Button Text">
        <input v-model="text" type="text" class="w-full p-2" />
      </Action>
      <Action label="Text Color">
        <input v-model="textColor" type="color" />
      </Action>
      <Action label="Background Color">
        <input v-model="backgroundColor" type="color" />
      </Action>
      <Action label="Border Color">
        <input v-model="borderColor" type="color" />
      </Action>
      <Action label="Link">
        <input v-model="href" type="text" class="w-full p-2" />
      </Action>
      <Action label="Disabled">
        <input v-model="disabled" type="checkbox" />
      </Action>
    </ControlsAddon>

    <EventsAddon />
  </div>
</template>

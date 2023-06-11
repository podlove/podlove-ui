<script setup lang="ts">
import { InputGroup, Button as ButtonComponent, InputText, Icon } from '@podlove/components';
</script>

<template>
  <Story title="Components/Input Group" auto-props-disabled>
    <input-group>
      <template #button>
        <button-component><icon type="copy" /></button-component>
      </template>
      <template #input>
        <input-text value="My Input text value"></input-text>
      </template>
    </input-group>
  </Story>
</template>

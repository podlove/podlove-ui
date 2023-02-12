<script setup lang="ts">
import InputGroup from '@podlove/components/input-group/InputGroup'
import ButtonComponent from '@podlove/components/button/Button.vue'
import InputText from '@podlove/components/input-text/InputText.vue'
import Icon from '@podlove/components/icons/Icon.vue'
</script>

<template>
  <div>
    <input-group>
      <template #button>
        <button-component><icon type="copy" /></button-component>
      </template>
      <template #input>
        <input-text value="My Input text value"></input-text>
      </template>
    </input-group>
  </div>
</template>

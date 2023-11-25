<template>
  <div>
    <color-picker title="brand" v-model="$props.modelValue.tokens.brand"></color-picker>
    <color-picker title="brandDark" v-model="$props.modelValue.tokens.brandDark"></color-picker>
    <color-picker title="brandDarkest" v-model="$props.modelValue.tokens.brandDarkest"></color-picker>
    <color-picker title="shadeDark" v-model="$props.modelValue.tokens.shadeDark"></color-picker>
    <color-picker title="contrast" v-model="$props.modelValue.tokens.contrast"></color-picker>
    <color-picker title="alt" v-model="$props.modelValue.tokens.alt"></color-picker>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import type { PodloveTheme } from '@podlove/types';
import ColorPicker from '../../../components/ColorPicker.vue';

const props = defineProps<{
  modelValue: PodloveTheme;
}>();

const emit = defineEmits(['update:modelValue']);

watch(props.modelValue, () => {
  emit('update:modelValue', props.modelValue);
});
</script>

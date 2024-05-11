<template>
  <span class="relative">
    <div v-if="avatar" class="rounded bg-cover w-12 h-12 bg-center" :style="{ 'background-image': `url(${avatar}` }" />
    <user-icon v-else :width="48" :height="48" />
    <popover v-if="name" >
      <div class="text-sm text-gray-800 p-1 text-center whitespace-nowrap">
        <h3 class="font-bold">{{ name }}</h3>
        <span v-if="role">{{ role }}</span>
      </div>
    </popover>
  </span>
</template>

<script setup lang="ts">
import Popover from './Popover.vue';
import { UserIcon } from '@podlove/components';

defineProps<{
  name: string;
  avatar: string;
  id?: string;
  role?: string;
  slug?: string;
}>();
</script>

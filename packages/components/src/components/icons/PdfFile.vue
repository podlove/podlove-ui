<script lang="ts" setup>
import Icon from './components/Icon.vue';

defineProps({
  size: {
    type: Number,
    default: 24
  }
});
</script>

<template>
  <icon
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
  >
    <path
      d="M14.7722 3.55L18.45 7.22782V19.45H5.55V3.55H14.7722Z"
      stroke="currentColor"
      stroke-width="1.1"
    />
    <path
      d="M14.5 3.5V6.75C14.5 7.16421 14.8358 7.5 15.25 7.5H18.5"
      stroke="currentColor"
      stroke-width="1.1"
    />
    <path
      d="M7 16H7.87324V14.6306H8.28848C9.36323 14.6306 9.98 14.0961 9.98 13.2492C9.98 12.3964 9.48537 12.018 8.41061 12.018H7V16ZM8.32512 12.6667C8.82586 12.6667 9.08844 12.8529 9.08844 13.3153C9.08844 13.7778 8.81975 13.988 8.28848 13.988H7.87324V12.6667H8.32512Z"
      fill="currentColor"
    />
    <path
      d="M10.4886 16H11.8015C13.2732 16 13.835 15.1712 13.835 13.8979C13.835 12.6006 13.1816 12 11.9175 12C11.4779 12 10.9161 12.012 10.4886 12.018V16ZM11.8687 12.6787C12.6992 12.6787 12.9373 13.2192 12.9373 13.976C12.9373 14.8288 12.6442 15.3393 11.8748 15.3393H11.3618V12.6787H11.8687Z"
      fill="currentColor"
    />
    <path
      d="M15.3573 16V14.4204H16.7496V13.7477H15.3573V12.6907H16.9389L17 12.018H14.4841V16H15.3573Z"
      fill="currentColor"
    />
  </icon>
</template>

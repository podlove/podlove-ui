<script lang="ts" setup>
defineProps({
  size: {
    type: Number,
    default: 24
  }
});
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.80384 15L6.54189 17.4923C6.49859 17.9042 6.79744 18.2733 7.20938 18.3166L19.6409 19.6232C20.0529 19.6665 20.4219 19.3676 20.4652 18.9557L21.4582 9.50774C21.5015 9.0958 21.2027 8.72675 20.7907 8.68345L18 8.39014V9.39565L20.4376 9.65184L19.4968 18.6025L7.56254 17.3482L7.80935 15H6.80384Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5 5V12L8 8.5C8 8.5 8.5 8 9 8.5C9.5 9 12 12 12 12L14 10.5C14 10.5 14.5 10 15 10.5C15.5 11 17 12 17 12V5H5ZM4.75 4C4.33579 4 4 4.33579 4 4.75V14.25C4 14.6642 4.33579 15 4.75 15H17.25C17.6642 15 18 14.6642 18 14.25V4.75C18 4.33579 17.6642 4 17.25 4H4.75Z"
      fill="currentColor"
    />
    <circle cx="13" cy="7" r="1" fill="currentColor" />
  </svg>
</template>

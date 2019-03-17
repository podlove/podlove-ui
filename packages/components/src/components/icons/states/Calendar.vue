<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 20 20">
    <path :fill="color" d="M 2,3 2,17 18,17 18,3 2,3 Z M 17,16 3,16 3,8 17,8 17,16 Z M 17,7 3,7 3,4 17,4 17,7 Z"></path>
    <rect :fill="color" width="1" height="3" x="6" y="2"></rect>
    <rect :fill="color" width="1" height="3" x="13" y="2"></rect>
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 20
    },
    color: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>

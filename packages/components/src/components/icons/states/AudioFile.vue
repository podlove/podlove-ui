<template>
  <svg :width="size" :height="size" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" :fill="color"/>
    <path d="M16 8.5V16.2333C15.6083 16.0917 15.1917 16 14.75 16C12.675 16 11 17.675 11 19.75C11 21.825 12.675 23.5 14.75 23.5C16.675 23.5 18.25 22.0417 18.4583 20.1667H18.5V11H21.8333V8.5H16Z" :fill="background"/>
  </svg>
</template>

<script>
  export default {
    props: ['color', 'background', 'width', 'height']
  }
</script>
<script>
  export default {
    props: {
      size: {
        type: Number,
        default: 25
      },
      color: {
        type: String,
        default: 'currentColor'
      },
      background: {
        type: String,
        default: 'currentColor'
      }
    }
  }
</script>



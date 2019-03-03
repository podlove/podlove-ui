<template>
  <svg :width="size" :height="size" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414">
    <g :fill="color">
        <path d="M4 10v26h12v10l12-10h18V10H4zm2 2h38v22H27.009L18 41.7V34H6V12z"/>
        <circle cx="15" cy="23" r="2.5"/>
        <circle cx="25" cy="23" r="2.5"/>
        <circle cx="35" cy="23" r="2.5"/>
    </g>
  </svg>
</template>

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
    }
  }
}
</script>
